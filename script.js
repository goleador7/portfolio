/* ════════════════════════════════════════
   OCEAN PORTFOLIO — script.js
   ════════════════════════════════════════ */

'use strict';

/* ─── LOADER ─── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      // Trigger hero reveal animations
      document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 200 + i * 150);
      });
    }
  }, 1600);
});


/* ─── CUSTOM CURSOR ─── */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

// Laggy trail
function animateTrail() {
  tx += (mx - tx) * 0.14;
  ty += (my - ty) * 0.14;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor scale on interactive elements
document.querySelectorAll('a, button, .chip, .about-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.8)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
});


/* ─── NAVBAR ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});


/* ─── BUBBLE CANVAS ─── */
(function initBubbles() {
  const canvas = document.getElementById('bubbles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const BUBBLE_COUNT = 55;
  const bubbles = [];

  class Bubble {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * canvas.width;
      this.y  = init ? Math.random() * canvas.height : canvas.height + 20;
      this.r  = Math.random() * 5 + 1.5;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = -(Math.random() * 0.6 + 0.25);
      this.alpha = Math.random() * 0.35 + 0.08;
      this.drift = Math.random() * Math.PI * 2;
      this.driftSpeed = Math.random() * 0.012 + 0.005;
    }
    update() {
      this.drift += this.driftSpeed;
      this.x += this.vx + Math.sin(this.drift) * 0.3;
      this.y += this.vy;
      if (this.y < -20) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(
        this.x - this.r * 0.3, this.y - this.r * 0.3, 0,
        this.x, this.y, this.r
      );
      grad.addColorStop(0, `rgba(0, 245, 255, ${this.alpha * 1.4})`);
      grad.addColorStop(0.5, `rgba(0, 212, 204, ${this.alpha})`);
      grad.addColorStop(1, `rgba(0, 150, 200, ${this.alpha * 0.3})`);
      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(0, 212, 204, 0.5)';
      ctx.shadowBlur = this.r * 2;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < BUBBLE_COUNT; i++) bubbles.push(new Bubble());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(b => { b.update(); b.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();


/* ─── HERO PARALLAX ─── */
(function initParallax() {
  const heroContent = document.getElementById('heroContent');
  const hat         = document.getElementById('floatingHat');
  if (!heroContent) return;

  let active = false;
  const hero = document.getElementById('hero');

  document.addEventListener('mousemove', e => {
    if (!active) return;
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    heroContent.style.transform = `translate(${dx * -12}px, ${dy * -8}px)`;
    if (hat) {
      hat.style.transform = `translateY(-50%) translate(${dx * 18}px, ${dy * 12}px)`;
    }
  });

  const observer = new IntersectionObserver(entries => {
    active = entries[0].isIntersecting;
    if (!active) {
      heroContent.style.transform = '';
      if (hat) hat.style.transform = '';
    }
  }, { threshold: 0.3 });
  observer.observe(hero);
})();


/* ─── SCROLL REVEAL (Intersection Observer) ─── */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal-up');
  // Skip hero ones — handled by loader callback
  const nonHeroEls = [...revealEls].filter(el => !el.closest('#hero'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  nonHeroEls.forEach(el => io.observe(el));
})();


/* ─── SKILL BARS ─── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.dataset.width;
        entry.target.style.width = target + '%';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => io.observe(b));
})();


/* ─── CONTACT FORM ─── */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    // Basic validation
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderBottomColor = '#e74c3c';
        setTimeout(() => field.style.borderBottomColor = '', 2000);
      }
    });
    if (!valid) return;

    const btn = form.querySelector('.btn-submit');
    const txt = btn.querySelector('.btn-text');
    txt.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate send
    setTimeout(() => {
      form.reset();
      txt.textContent = 'Cast the Message';
      btn.disabled = false;
      success.classList.add('visible');
      setTimeout(() => success.classList.remove('visible'), 4000);
    }, 1500);
  });
})();


/* ─── ACTIVE NAV LINK ON SCROLL ─── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();


/* ─── TILT EFFECT ON PROJECT CARDS ─── */
(function initCardTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-10px) scale(1.01) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ─── OCEAN WAVE ANIMATED TITLE GLOW ─── */
(function animateTitleGlow() {
  const titles = document.querySelectorAll('.section-title');
  titles.forEach((t, i) => {
    t.style.animationDelay = `${i * 0.3}s`;
  });
})();
