const root = document.documentElement;
root.classList.add('js');

// Theme toggle: remembers the viewer's choice; falls back to the OS setting.
document.querySelector('.theme').addEventListener('click', () => {
  const current = root.dataset.theme
    || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const next = current === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: theme lasts this visit only */ }
});

// Reveal sections as they scroll into view.
const sections = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { threshold: 0.12 });
  sections.forEach((s) => io.observe(s));
} else {
  sections.forEach((s) => s.classList.add('in'));
}

document.getElementById('year').textContent = new Date().getFullYear();
