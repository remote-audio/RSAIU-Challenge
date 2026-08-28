const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress');
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
const revealItems = document.querySelectorAll('.reveal');

const challengeTitle = document.querySelector('#tracks h2');
if (challengeTitle) {
  challengeTitle.innerHTML = 'Two tracks<br><em>connecting speech and Earth observation.</em>';
}

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 40);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

menu?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
links?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => links.classList.remove('open')));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));

// Keep organizer cards polished until official portraits are added to assets/people.
document.querySelectorAll('.person img').forEach((image) => {
  image.addEventListener('error', () => {
    const placeholder = document.createElement('div');
    placeholder.className = 'portrait';
    placeholder.dataset.path = image.getAttribute('src');
    placeholder.textContent = image.alt.split(' ').map((word) => word[0]).join('').slice(0, 2);
    image.replaceWith(placeholder);
  });
});
