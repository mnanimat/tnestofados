const {
  applyApiHeaders,
  cleanText,
  createProtocol,
  enforceRateLimit,
  escapeHtml,
  isOriginAllowed,
  readJsonBody,
  sendResendEmail,
  validateAntiSpam
} = require('../lib/server-utils');

function renderPrivacyEmail(payload, protocol) {
  return `
  <div style="font-family:Arial,sans-serif;background:#f5efe7;padding:24px;color:#231a11;">
    <div style="max-width:700px;margin:0 auto;background:#fff;border-radius:18px;overflow:hidden;border:1px solid #eadfcd;">
      <div style="background:#17130f;padding:24px 28px;color:#f6efe5;">
        <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#dca43e;">TN Estofados</div>
        <h1 style="margin:10px 0 0;font-size:26px;">Solicitação de privacidade</h1>
        <p style="margin:10px 0 0;color:#d5cabd;">Protocolo ${escapeHtml(protocol)}</p>
      </div>
      <div style="padding:28px;font-size:15px;line-height:1.65;">
        <p><strong>Nome:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Contato para resposta:</strong> ${escapeHtml(payload.contact)}</p>
        <p><strong>Tipo de solicitação:</strong> ${escapeHtml(payload.requestType)}</p>
        <p><strong>Versão da política:</strong> ${escapeHtml(payload.policyVersion)}</p>
        <p><strong>Detalhes:</strong></p>
        <div style="padding:14px 16px;border-radius:12px;background:#faf6ef;border:1px solid #eadfcd;white-space:pre-wrap;">${escapeHtml(payload.details)}</div>
        <p style="margin-top:20px;color:#665b50;font-size:13px;">A identidade do solicitante deve ser confirmada de forma proporcional antes de fornecer, corrigir ou eliminar dados pessoais.</p>
      </div>
    </div>
  </div>`;
}

module.exports = async (req, res) => {
  applyApiHeaders(req, res);
  if (req.method === 'OPTIONS') return res.status(isOriginAllowed(req) ? 204 : 403).end();
  if (!isOriginAllowed(req)) return res.status(403).json({ ok: false, message: 'Origem não autorizada.' });
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Método não permitido.' });

  const rate = enforceRateLimit(req, { limit: 4, windowMs: 15 * 60 * 1000, keyPrefix: 'privacy' });
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfter || 900));
    return res.status(429).json({ ok: false, message: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' });
  }

  try {
    const body = await readJsonBody(req, 80 * 1024);
    validateAntiSpam(body);

    const payload = {
      name: cleanText(body.name, 120),
      contact: cleanText(body.contact, 160),
      requestType: cleanText(body.requestType, 180),
      details: cleanText(body.details, 3000),
      policyVersion: cleanText(body.policyVersion, 60)
    };

    if (!payload.name || !payload.contact || !payload.requestType || !payload.details) {
      return res.status(400).json({ ok: false, message: 'Preencha todos os campos obrigatórios.' });
    }

    const receiver = process.env.PRIVACY_RECEIVER_EMAIL || process.env.QUOTE_RECEIVER_EMAIL;
    const sender = process.env.QUOTE_SENDER_EMAIL;
    if (!receiver || !sender) {
      return res.status(500).json({ ok: false, message: 'O canal de privacidade ainda não foi configurado na Vercel.' });
    }

    const protocol = createProtocol('LGPD');
    await sendResendEmail({
      from: sender,
      to: [receiver],
      subject: `Solicitação LGPD ${protocol} — ${payload.name}`,
      html: renderPrivacyEmail(payload, protocol)
    });

    return res.status(200).json({ ok: true, protocol });
  } catch (error) {
    const status = Number(error.statusCode || 500);
    return res.status(status).json({ ok: false, message: error.message || 'Erro interno ao processar a solicitação.' });
  }
};
