// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const saved = localStorage.getItem('theme');
if (saved) {
  root.setAttribute('data-theme', saved);
} else {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== Typing effect =====
const roles = [
  'Web Developer',
  'Frontend Engineer',
  'UI/UX Enthusiast',
  'Problem Solver',
];
const typedEl = document.getElementById('typed');
let roleIdx = 0, charIdx = 0, deleting = false;

function type() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      return setTimeout(type, 1800);
    }
    setTimeout(type, 80);
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      return setTimeout(type, 300);
    }
    setTimeout(type, 40);
  }
}
type();

// ===== Scroll reveal =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();
