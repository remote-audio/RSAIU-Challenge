const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
menu?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
links?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => links.classList.remove('open')));
