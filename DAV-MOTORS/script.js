const burger = document.querySelector('#burger');
const nav = document.querySelector('#nav');

function setMenuOpen(open) {
  nav?.classList.toggle('is-open', open);
  burger?.setAttribute('aria-expanded', String(open));
  burger?.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
}

burger?.addEventListener('click', () => {
  setMenuOpen(burger.getAttribute('aria-expanded') !== 'true');
});
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenuOpen(false);
});
