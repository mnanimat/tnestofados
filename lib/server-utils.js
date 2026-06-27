const crypto = require('crypto');

const rateStore = globalThis.__TN_RATE_STORE__ || new Map();
globalThis.__TN_RATE_STORE__ = rateStore;

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function cleanText(value, maxLength = 1000) {
  return String(value ?? '').replace(/\u0000/g, '').trim().slice(0, maxLength);
}

function getClientIp(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return forwarded || req.socket?.remoteAddress || 'unknown';
}

function isOriginAllowed(req) {
  const origin = String(req.headers.origin || '').trim();
  if (!origin) return true;
  const host = String(req.headers.host || '').trim();
  const proto = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim();
  const sameOrigin = host && origin === `${proto}://${host}`;
  const configured = String(process.env.ALLOWED_ORIGIN || '')
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
  return sameOrigin || configured.includes(origin);
}

function applyApiHeaders(req, res) {
  const origin = String(req.headers.origin || '').trim();
  if (origin && isOriginAllowed(req)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
}

function enforceRateLimit(req, { limit = 5, windowMs = 10 * 60 * 1000, keyPrefix = 'form' } = {}) {
  const now = Date.now();
  const key = `${keyPrefix}:${getClientIp(req)}`;
  const current = rateStore.get(key);
  if (!current || current.resetAt <= now) {
    rateStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  current.count += 1;
  rateStore.set(key, current);
  return {
    allowed: current.count <= limit,
    remaining: Math.max(0, limit - current.count),
    retryAfter: Math.ceil((current.resetAt - now) / 1000)
  };
}

async function readJsonBody(req, maxBytes = 6 * 1024 * 1024) {
  const declaredLength = Number(req.headers['content-length'] || 0);
  if (declaredLength > maxBytes) throw Object.assign(new Error('O envio ultrapassa o limite permitido.'), { statusCode: 413 });

  if (req.body && typeof req.body === 'object') {
    const serialized = JSON.stringify(req.body);
    if (Buffer.byteLength(serialized, 'utf8') > maxBytes) throw Object.assign(new Error('O envio ultrapassa o limite permitido.'), { statusCode: 413 });
    return req.body;
  }

  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    total += buffer.length;
    if (total > maxBytes) throw Object.assign(new Error('O envio ultrapassa o limite permitido.'), { statusCode: 413 });
    chunks.push(buffer);
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  return raw ? JSON.parse(raw) : {};
}

function validateAntiSpam(payload) {
  const honeypot = cleanText(payload?.antiSpam?.website ?? payload?.website, 200);
  if (honeypot) throw Object.assign(new Error('Envio rejeitado.'), { statusCode: 400 });
  const startedAt = Number(payload?.antiSpam?.formStartedAt ?? payload?.formStartedAt ?? 0);
  if (startedAt && Date.now() - startedAt < 1800) {
    throw Object.assign(new Error('Aguarde alguns segundos e tente novamente.'), { statusCode: 400 });
  }
}

function validateAttachments(items) {
  if (!Array.isArray(items)) return [];
  if (items.length > 2) throw Object.assign(new Error('Envie no máximo duas imagens.'), { statusCode: 400 });

  const allowedTypes = new Set(['image/png', 'image/jpeg', 'image/webp']);
  const maxFileBytes = 2 * 1024 * 1024;
  let totalBytes = 0;

  return items.map(item => {
    const filename = cleanText(item?.filename, 160).replace(/[\\/]/g, '_');
    const type = cleanText(item?.type, 80).toLowerCase();
    const content = cleanText(item?.content, 4 * 1024 * 1024);
    if (!filename || !content || !allowedTypes.has(type)) {
      throw Object.assign(new Error('Arquivo inválido. Use PNG, JPG ou WEBP.'), { statusCode: 400 });
    }
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(content)) {
      throw Object.assign(new Error('Conteúdo de arquivo inválido.'), { statusCode: 400 });
    }
    const decodedBytes = Buffer.byteLength(content, 'base64');
    if (decodedBytes > maxFileBytes) {
      throw Object.assign(new Error(`O arquivo ${filename} ultrapassa 2 MB.`), { statusCode: 400 });
    }
    totalBytes += decodedBytes;
    if (totalBytes > 4 * 1024 * 1024) {
      throw Object.assign(new Error('O total das imagens ultrapassa 4 MB.'), { statusCode: 400 });
    }
    return { filename, type, content };
  });
}

function isValidEmail(value) {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
}

function createProtocol(prefix = 'TN') {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}-${date}-${random}`;
}

async function sendResendEmail(emailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw Object.assign(new Error('O serviço de e-mail ainda não foi configurado.'), { statusCode: 500 });
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailPayload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw Object.assign(new Error(data?.message || data?.error || 'Falha no envio do e-mail.'), { statusCode: 502 });
  }
  return data;
}

module.exports = {
  applyApiHeaders,
  cleanText,
  createProtocol,
  enforceRateLimit,
  escapeHtml,
  isOriginAllowed,
  isValidEmail,
  readJsonBody,
  sendResendEmail,
  validateAntiSpam,
  validateAttachments
};
