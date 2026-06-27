const {
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
} = require('../lib/server-utils');

function renderBusinessEmail(payload, protocol) {
  const customer = payload.customer || {};
  const project = payload.project || {};
  const measures = project.measures || {};
  const extras = Array.isArray(project.extras) ? project.extras : [];
  const rows = [];

  const addRow = (label, value) => {
    if (value === undefined || value === null || String(value).trim() === '') return;
    rows.push(`<tr><td style="padding:8px 12px;border:1px solid #e7dcc9;"><strong>${escapeHtml(label)}</strong></td><td style="padding:8px 12px;border:1px solid #e7dcc9;">${escapeHtml(value)}</td></tr>`);
  };

  addRow('Serviço', project.service);
  addRow('Peça', project.piece);
  addRow('Modelo', project.model);
  addRow('Medidas informadas', project.dimensions);
  Object.entries(measures).forEach(([label, value]) => addRow(label, value));
  addRow('Tecido', project.fabric);
  addRow('Espuma', project.foam);
  addRow('Estrutura', project.structure);
  addRow('Pé / base', project.feet);
  addRow('Almofadas', project.pillows);
  addRow('Uso', project.use);
  addRow('Prazo desejado', project.deadline);
  addRow('Almofadas extras', project.extraPillows);
  addRow('Cor de referência', project.colorReference);
  addRow('Extras', extras.join(', '));
  addRow('Observações', project.details || 'Sem observações adicionais');

  return `
  <div style="font-family:Arial,sans-serif;background:#f5efe7;padding:24px;color:#231a11;">
    <div style="max-width:760px;margin:0 auto;background:#fff;border-radius:18px;overflow:hidden;border:1px solid #eadfcd;">
      <div style="background:#17130f;padding:24px 28px;color:#f6efe5;">
        <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#dca43e;">TN Estofados</div>
        <h1 style="margin:10px 0 0;font-size:28px;line-height:1.1;">Novo pedido de orçamento</h1>
        <p style="margin:10px 0 0;color:#d5cabd;">Protocolo ${escapeHtml(protocol)} • Origem ${escapeHtml(payload.source || 'site')}</p>
      </div>
      <div style="padding:28px;">
        <h2 style="margin:0 0 12px;font-size:20px;">Dados do solicitante</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr><td style="padding:8px 12px;border:1px solid #e7dcc9;"><strong>Nome</strong></td><td style="padding:8px 12px;border:1px solid #e7dcc9;">${escapeHtml(customer.name)}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e7dcc9;"><strong>WhatsApp</strong></td><td style="padding:8px 12px;border:1px solid #e7dcc9;">${escapeHtml(customer.phone)}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e7dcc9;"><strong>E-mail</strong></td><td style="padding:8px 12px;border:1px solid #e7dcc9;">${escapeHtml(customer.email || 'Não informado')}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e7dcc9;"><strong>Cidade</strong></td><td style="padding:8px 12px;border:1px solid #e7dcc9;">${escapeHtml(customer.city || 'Não informada')}</td></tr>
        </table>
        <h2 style="margin:0 0 12px;font-size:20px;">Projeto solicitado</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${rows.join('')}</table>
        <div style="padding:14px 16px;border-radius:12px;background:#faf6ef;border:1px solid #eadfcd;font-size:13px;line-height:1.6;">
          <strong>Registro de transparência:</strong><br>
          Política informada: ${escapeHtml(payload.privacy?.policyVersion || 'não informada')}<br>
          Ciência registrada em: ${escapeHtml(payload.privacy?.acknowledgedAt || new Date().toISOString())}<br>
          Esta solicitação é um orçamento e não formaliza compra automaticamente.
        </div>
      </div>
    </div>
  </div>`;
}

function renderCustomerConfirmation(payload, protocol) {
  const customer = payload.customer || {};
  const project = payload.project || {};
  return `
  <div style="font-family:Arial,sans-serif;background:#f5efe7;padding:24px;color:#231a11;">
    <div style="max-width:680px;margin:0 auto;background:#fff;border-radius:18px;overflow:hidden;border:1px solid #eadfcd;">
      <div style="background:#17130f;padding:24px 28px;color:#f6efe5;">
        <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#dca43e;">TN Estofados</div>
        <h1 style="margin:10px 0 0;font-size:26px;">Recebemos sua solicitação</h1>
      </div>
      <div style="padding:28px;font-size:15px;line-height:1.65;">
        <p>Olá, <strong>${escapeHtml(customer.name)}</strong>.</p>
        <p>Seu pedido de orçamento foi recebido com o protocolo <strong>${escapeHtml(protocol)}</strong>.</p>
        <p><strong>Serviço:</strong> ${escapeHtml(project.service || 'não informado')}<br><strong>Peça/modelo:</strong> ${escapeHtml(project.model || project.piece || 'não informado')}</p>
        <p>O envio do formulário não conclui uma compra. A contratação ocorrerá somente após a apresentação e a aprovação do orçamento com preço, materiais, prazo, entrega e forma de pagamento.</p>
        <p>Para dúvidas ou correções, fale pelo WhatsApp +55 (75) 98233-1515 e informe o protocolo.</p>
      </div>
    </div>
  </div>`;
}

module.exports = async (req, res) => {
  applyApiHeaders(req, res);
  if (req.method === 'OPTIONS') return res.status(isOriginAllowed(req) ? 204 : 403).end();
  if (!isOriginAllowed(req)) return res.status(403).json({ ok: false, message: 'Origem não autorizada.' });
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Método não permitido.' });

  const rate = enforceRateLimit(req, { limit: 5, windowMs: 10 * 60 * 1000, keyPrefix: 'quote' });
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfter || 600));
    return res.status(429).json({ ok: false, message: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' });
  }

  try {
    const payload = await readJsonBody(req);
    validateAntiSpam(payload);

    const customer = {
      name: cleanText(payload.customer?.name, 120),
      phone: cleanText(payload.customer?.phone, 40),
      email: cleanText(payload.customer?.email, 160),
      city: cleanText(payload.customer?.city, 120)
    };
    if (!customer.name || !customer.phone) {
      return res.status(400).json({ ok: false, message: 'Nome e WhatsApp são obrigatórios.' });
    }
    if (customer.email && !isValidEmail(customer.email)) {
      return res.status(400).json({ ok: false, message: 'Informe um e-mail válido ou deixe o campo vazio.' });
    }

    const privacyVersion = cleanText(payload.privacy?.policyVersion, 60);
    const privacyAcknowledged = payload.privacy?.acknowledged === true;
    if (!privacyVersion || !privacyAcknowledged) {
      return res.status(400).json({ ok: false, message: 'É necessário confirmar a ciência da Política de Privacidade.' });
    }

    payload.customer = customer;
    payload.privacy = {
      policyVersion: privacyVersion,
      acknowledged: true,
      acknowledgedAt: cleanText(payload.privacy?.acknowledgedAt, 60) || new Date().toISOString()
    };
    payload.attachments = validateAttachments(payload.attachments);

    const receiver = process.env.QUOTE_RECEIVER_EMAIL;
    const sender = process.env.QUOTE_SENDER_EMAIL;
    if (!receiver || !sender) {
      return res.status(500).json({ ok: false, message: 'O recebimento de formulários ainda não foi configurado na Vercel.' });
    }

    const protocol = createProtocol('ORC');
    const attachments = payload.attachments.map(item => ({ filename: item.filename, content: item.content }));
    const businessEmail = {
      from: sender,
      to: [receiver],
      subject: `${payload.subject || 'Novo orçamento'} — ${protocol}`,
      html: renderBusinessEmail(payload, protocol),
      reply_to: customer.email || undefined,
      attachments
    };
    if (process.env.QUOTE_BCC_EMAIL) businessEmail.bcc = [process.env.QUOTE_BCC_EMAIL];
    await sendResendEmail(businessEmail);

    if (customer.email) {
      try {
        await sendResendEmail({
          from: sender,
          to: [customer.email],
          subject: `Confirmação do orçamento ${protocol} — TN Estofados`,
          html: renderCustomerConfirmation(payload, protocol)
        });
      } catch (_) {
        // A falha da cópia ao cliente não invalida o recebimento interno.
      }
    }

    return res.status(200).json({ ok: true, message: 'Orçamento enviado com sucesso.', protocol });
  } catch (error) {
    const status = Number(error.statusCode || 500);
    return res.status(status).json({ ok: false, message: error.message || 'Erro interno ao processar o formulário.' });
  }
};
