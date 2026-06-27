const privacyForm = document.getElementById('privacyRequestForm');
const privacyStatus = document.getElementById('privacyFormStatus');
const privacySubmitButton = document.getElementById('privacySubmitButton');
const currentYear = document.getElementById('currentYear');
const startedAt = document.getElementById('privacyFormStartedAt');

if (currentYear) currentYear.textContent = new Date().getFullYear();
if (startedAt) startedAt.value = String(Date.now());

function setPrivacyStatus(message, type = '') {
  if (!privacyStatus) return;
  privacyStatus.textContent = message;
  privacyStatus.classList.remove('success', 'error');
  if (type) privacyStatus.classList.add(type);
}

if (privacyForm) {
  privacyForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (privacySubmitButton) privacySubmitButton.disabled = true;
    setPrivacyStatus('Enviando sua solicitação...');

    const form = new FormData(privacyForm);
    const payload = {
      name: String(form.get('name') || '').trim(),
      contact: String(form.get('contact') || '').trim(),
      requestType: String(form.get('requestType') || '').trim(),
      details: String(form.get('details') || '').trim(),
      policyVersion: String(form.get('policyVersion') || ''),
      formStartedAt: Number(form.get('formStartedAt') || 0),
      website: String(form.get('website') || '')
    };

    try {
      const response = await fetch('/api/privacy-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Não foi possível enviar sua solicitação.');
      setPrivacyStatus(`Solicitação enviada. Protocolo: ${data.protocol}. Guarde este número.`, 'success');
      privacyForm.reset();
      if (startedAt) startedAt.value = String(Date.now());
    } catch (error) {
      setPrivacyStatus(error.message || 'Não foi possível enviar sua solicitação.', 'error');
    } finally {
      if (privacySubmitButton) privacySubmitButton.disabled = false;
    }
  });
}
