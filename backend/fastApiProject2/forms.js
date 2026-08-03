// forms.js
async function handleForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const phone = (data.phone || '').replace(/[^\d+]/g, '');

  if (phone.replace(/\D/g, '').length < 11) {
    showToast('Проверьте номер телефона.');
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const oldText = button?.textContent;
  if (button) {
    button.disabled = true;
    button.textContent = 'Отправляем...';
  }

  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: data.name || '',
        phone: data.phone || '',
        car: data.car || '',
        source: form.dataset.form || 'website'
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || 'Не удалось отправить заявку');
    }

    form.reset();
    closeModals();
    showToast('Заявка отправлена. Мы свяжемся с вами по телефону +7 924 006-63-44.');
  } catch (error) {
    console.error(error);
    showToast('Не удалось отправить заявку. Попробуйте позвонить: +7 924 006-63-44.');
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = oldText;
    }
  }
}

document.querySelectorAll('[data-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    handleForm(form);
  });
});
