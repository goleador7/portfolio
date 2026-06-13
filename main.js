const sections = [
  { title: 'Home', icon: 'ti-smart-home', bg: 'linear-gradient(145deg,#0d1a2e,#1a3050)', accent: '#7ab3d4' },
  { title: 'About me', icon: 'ti-user-circle', bg: 'linear-gradient(145deg,#0d1e2b,#0f2a38)', accent: '#5dcaa5' },
  { title: 'skills', icon: 'ti-code', bg: 'linear-gradient(145deg,#0e1a1a,#0f2e2e)', accent: '#2a9d8f' },
  { title: 'Projects', icon: 'ti-folder-open', bg: 'linear-gradient(145deg,#1a0d0d,#2e1010)', accent: '#e76f51' },
  { title: 'Contact', icon: 'ti-mail-filled', bg: 'linear-gradient(145deg,#0d1a10,#112a14)', accent: '#52b788' },
];

let current = 0;
const track = document.getElementById('icon-track');
const wrap = document.getElementById('carousel-wrap');

sections.forEach((s, i) => {
  const item = document.createElement('div');
  item.className = 'icon-item' + (i === 0 ? ' active' : '');
  item.innerHTML = `
    <div class="icon-box" style="background:${s.bg};">
      <i class="ti ${s.icon}" style="color:${s.accent};font-size:38px;position:relative;z-index:1;"></i>
    </div>
    <span class="icon-label">${s.title}</span>
  `;
  item.addEventListener('click', () => goTo(i));
  track.appendChild(item);
});

const ITEM_W = 90;
const ITEM_GAP = 20;
const STEP = ITEM_W + ITEM_GAP;

function goTo(idx) {
  current = idx;
  document.querySelectorAll('.icon-item').forEach((el, i) => el.classList.toggle('active', i === idx));

  const wrapW = wrap.offsetWidth;
  const offset = (wrapW / 2) - (idx * STEP) - (ITEM_W / 2) - 24;
  track.style.transform = `translateX(${offset}px)`;

  renderContent(idx);
}

/* ── CONTENT RENDERER ── */
const renderers = [homeHTML, aboutHTML, skillsHTML, projectsHTML, contactHTML];

function renderContent(idx) {
  const el = document.getElementById('content');
  const div = document.createElement('div');
  div.className = 'section-inner';
  div.innerHTML = renderers[idx]?.() ?? '';
  el.innerHTML = '';
  el.appendChild(div);
}

/* ── HOME ── */
function homeHTML() {
  return `
    <div class="section-home">
      <img class="home-char" src="src/luffy.png" alt="">
      <div class="home-text">
        <h1 class="home-title">Goleador</h1>
        <p class="home-para">Born from curiosity and driven by freedom, 
        I build digital worlds like a journey across the Grand Line.
         Every line of code is a step toward a bigger dream — simple, bold, and unstoppable,
          just like a pirate chasing the horizon.</p>
      </div>
    </div>
  `;
}

function aboutHTML() {
  return `
    <div class="about-section">

      <div class="about-content">

        <blockquote class="about-quote">
          <span>Every</span>
          <span>great</span>
          <span>journey</span>
          <span>starts</span>
          <span>with</span>
          <span>a</span>
          <span>single</span>
          <span>step.</span>
        </blockquote>

        <div class="about-line"></div>

        <h2 class="about-title">
          Hi, I'm Imad
        </h2>

        <p class="about-text">
          better known as Goleador, a Master's student specializing
          in Artificial Intelligence and Cybersecurity, holding a Bachelor's
          degree in Computer Science , As a Full Stack Developer and CEO of Riwaq Dev,
          I focus on creating scalable web applications, intuitive user interfaces, and 
          solutions that solve real-world problems.
        </p>

      </div>

      <div class="about-terminal">

        <div class="terminal-header">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="terminal-body">

          <p><span>$</span> whoami</p>
          <p class="output">Imad (Goleador)</p>

          <p><span>$</span> role</p>
          <p class="output">AI & Cybersecurity Student</p>

          <p><span>$</span> degree</p>
          <p class="output">Bachelor in Computer Science</p>

          <p><span>$</span> company</p>
          <p class="output">CEO @ Riwaq Dev</p>

          <p><span>$</span> focus</p>
          <p class="output">Full Stack Development</p>

          <p><span>$</span> status</p>
          <p class="output typing">
            Building. Learning. Growing.
            <span class="cursor">|</span>
          </p>

        </div>

      </div>

    </div>
  `;
}
function skillsHTML() { return `<div class="section-placeholder"><span>Skills</span></div>`; }
function projectsHTML() { return `<div class="section-placeholder"><span>Projects</span></div>`; }
function contactHTML() { return `<div class="section-placeholder"><span>Contact</span></div>`; }

/* ── EVENTS ── */
window.addEventListener('load', () => goTo(0));
window.addEventListener('resize', () => goTo(current));

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' && current < sections.length - 1) goTo(current + 1);
  if (e.key === 'ArrowLeft' && current > 0) goTo(current - 1);
});

wrap.addEventListener('wheel', e => {
  e.preventDefault();
  if (e.deltaY > 0 || e.deltaX > 0) { if (current < sections.length - 1) goTo(current + 1); }
  else { if (current > 0) goTo(current - 1); }
}, { passive: false });

/* ── CLOCK ── */
function tick() {
  const t = new Date().toLocaleTimeString('fr-DZ', { hour: '2-digit', minute: '2-digit' });
  document.getElementById('topbar-clock').textContent = t;
}
tick();
setInterval(tick, 1000);