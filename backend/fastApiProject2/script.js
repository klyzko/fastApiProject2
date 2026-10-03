const burger = document.querySelector('#burger');
const nav = document.querySelector('#nav');
const toast = document.querySelector('#toast');

burger?.addEventListener('click', () => nav.classList.toggle('is-open'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-open')));

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModals() {
  document.querySelectorAll('.modal.is-open').forEach(m => {
    m.classList.remove('is-open');
    m.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-modal-open]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    openModal(el.dataset.modalOpen);
  });
});
document.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', closeModals));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModals(); });

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

document.querySelectorAll('[data-car]').forEach(button => {
  button.addEventListener('click', () => {
    openModal('callback');
    const carInput = document.querySelector('#callback input[name="car"]');
    if (carInput) carInput.value = button.dataset.car;
  });
});
