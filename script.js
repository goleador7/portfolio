/* Goleador portfolio — vanilla JS */
document.getElementById('year').textContent = new Date().getFullYear();
/* ===== Smooth scroll for nav links ===== */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
/* ===== Active nav link on scroll ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(s => navObserver.observe(s));
/* ===== Reveal on scroll ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => {
  // Skip hero reveals (handled with CSS animation)
  if (!el.closest('.hero')) revealObserver.observe(el);
});
/* ===== Mouse parallax on hero ===== */
const heroParallax = document.getElementById('heroParallax');
const heroSection = document.getElementById('home');
if (heroParallax && heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroParallax.style.transform = `translate(${x * 14}px, ${y * 14}px)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroParallax.style.transform = 'translate(0, 0)';
  });
}
/* ===== Particle field ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let w, h;
function resize() {
  w = canvas.width = window.innerWidth * window.devicePixelRatio;
  h = canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
}
window.addEventListener('resize', () => { resize(); initParticles(); });
resize();
function initParticles() {
  const count = window.innerWidth < 768 ? 30 : 60;
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 2 + 0.5) * window.devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.3 * window.devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.3 * window.devicePixelRatio,
      a: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.5 ? '255,255,255' : '124,92,255'
    });
  }
}
initParticles();
function tick() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.hue},${p.a})`;
    ctx.shadowBlur = 8 * window.devicePixelRatio;
    ctx.shadowColor = `rgba(${p.hue},${p.a})`;
    ctx.fill();
  });
  requestAnimationFrame(tick);
}
tick();
/* ===== Project card tilt ===== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
