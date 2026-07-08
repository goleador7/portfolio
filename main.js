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
function skillsHTML() {
  const skills = [
    {
      icon: "ti-brand-html5",
      name: "HTML",
      desc: "Semantic markup & accessibility"
    },
    {
      icon: "ti-database",
      name: "MySQL",
      desc: "Database design & optimization"
    },
    {
      icon: "ti-brand-python",
      name: "Python",
      desc: "AI, NLP & automation"
    },
    {
      icon: "ti-brand-javascript",
      name: "JavaScript",
      desc: "Interactive web experiences"
    },
    {
      icon: "ti-brand-laravel",
      name: "Laravel",
      desc: "Modern backend architecture"
    },
    {
      icon: "ti-brand-css3",
      name: "CSS",
      desc: "Animations & responsive UI"
    }
  ];

  return `
    <div class="skills-section">

      <div class="skills-header">
        <h2>Skills & Expertise</h2>
        <p>Technologies I use to bring ideas to life.</p>
      </div>

      <div class="skills-grid">
        ${skills.map(skill => `
          <div class="skill-card">

            <div class="skill-icon">
              <i class="ti ${skill.icon}"></i>
            </div>

            <h3>${skill.name}</h3>

            <p>${skill.desc}</p>

          </div>
        `).join('')}
      </div>

    </div>
  `;
}
/* ══════════════════════════════════════════════
   PROJECTS — FILE EXPLORER
═══════════════════════════════════════════════ */

/* ── DATA ── */
const projectFolders = [
  { id: 'riwa9-store',     name: 'riwa9-store',     dateModified: '6/30/2026 11:12 PM', type: 'File folder', hasContent: true },
  { id: 'mini-ats-system', name: 'mini-ats-system', dateModified: '7/8/2026 9:14 PM',   type: 'File folder', hasContent: true },
];

const projectData = {
  'riwa9-store': {
    title: 'RIWA9 STORE',
    description: `A complete ecommerce platform built for the Algerian market selling PC components and gaming accessories. Built with a decoupled architecture using a Vanilla JavaScript frontend communicating with a Laravel REST API. Focused on scalability, performance and modern ecommerce features.`,
    tech: ['Laravel', 'REST API', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'Sanctum Auth', 'Railway', 'Vercel', 'Cloudinary'],
    featureGroups: [
      { label: 'Auth & Users', items: ['Register/Login', 'Forgot Password', 'User Profile', 'Role Management'] },
      { label: 'Shopping', items: ['Shopping Cart', 'Guest Cart Merge', 'Wishlist', 'Reviews', 'Checkout'] },
      { label: 'Catalog', items: ['Categories', 'Subcategories', 'Brands', 'Search', 'Filtering', 'Sorting'] },
      { label: 'Delivery', items: ['Dynamic Delivery Pricing', 'Wilaya Selector', 'Commune Selector', 'Orders'] },
      { label: 'Admin', items: ['Admin Dashboard', 'Product CRUD', 'Order Management', 'Delivery Management', 'Coupons', 'Analytics Dashboard'] },
      { label: 'Engineering', items: ['Responsive Design', 'REST Architecture'] },
    ],
    architecture: `Decoupled architecture: a Vanilla JS single-page frontend (deployed on Vercel) communicates with a Laravel REST API backend (deployed on Railway, MySQL). Authentication is stateless via Sanctum tokens, media is served through Cloudinary, and uploaded assets persist via a Railway Volume.`,
    stats: [
      { value: '13+', label: 'Pages' },
      { value: '40+', label: 'API Endpoints' },
      { value: 'Laravel', label: 'Backend' },
      { value: 'Vanilla JS', label: 'Frontend' },
    ],
    website: 'https://riwa9-store.vercel.app/',
    github: null,
  },

  'mini-ats-system': {
    title: 'MINI ATS SYSTEM',
    description: `A resume-screening tool that scores how well a CV matches a job description before you apply. Upload a resume (PDF/DOCX) and a job posting, and it returns an overall match score, a skills-match breakdown, and concrete suggestions to close the gap — all analyzed locally with classic NLP, no external AI API involved.`,
    tech: ['Python', 'Streamlit', 'NLTK', 'Scikit-learn', 'Pandas', 'NumPy', 'pdfplumber', 'python-docx'],
    featureGroups: [
      { label: 'Input', items: ['PDF Upload', 'DOCX Upload', 'Paste Job Description', 'Upload Job Description File'] },
      { label: 'Analysis', items: ['Overall Text Match Score', 'Skills Match %', 'POS-based Skill Extraction', 'Unigram + Bigram Similarity'] },
      { label: 'Results', items: ['Matched Skills', 'Missing Skills', 'Match Status Badge', 'Improvement Recommendations'] },
      { label: 'Engineering', items: ['Domain-agnostic Skill Detection', 'Skill-section Parsing', 'Responsive Dashboard UI'] },
    ],
    architecture: `A Streamlit frontend handles file upload and results rendering, backed by two Python modules: a text extractor (pdfplumber / python-docx) that normalizes PDFs and Word docs into plain text, and an analyzer that tags parts of speech with NLTK to pull out skill-like terms without a hardcoded skills list, then scores similarity between the resume and job text using Scikit-learn's CountVectorizer and cosine similarity across unigrams and bigrams.`,
    stats: [
      { value: 'NLP', label: 'Core Engine' },
      { value: 'PDF/DOCX', label: 'Supported Files' },
      { value: 'Streamlit', label: 'Frontend' },
      { value: 'Local', label: 'No External AI' },
    ],
    website: 'https://mini-ats-system.streamlit.app/',
    github: null,
  }
};

/* ── STATE ── */
const explorerState = { view: 'grid', activeId: null };

/* ── RENDER: FOLDER LIST (Windows-Explorer style) ── */
function renderFolderGrid() {
  return `
    <div class="explorer-crumbs">
      <span class="crumb-current"><i class="ti ti-folder-open"></i> Projects</span>
    </div>

    <div class="explorer-list">
      <div class="explorer-list-header">
        <span class="col-name">Name</span>
        <span class="col-date">Date modified</span>
        <span class="col-type">Type</span>
      </div>

      <div class="explorer-list-body">
        ${projectFolders.map(f => `
          <div class="folder-row" data-folder="${f.id}" tabindex="0">
            <span class="col-name">
              <svg viewBox="0 0 48 48" class="folder-svg-sm" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12.5C4 10.567 5.567 9 7.5 9H18L21.5 13H40.5C42.433 13 44 14.567 44 16.5V35.5C44 37.433 42.433 39 40.5 39H7.5C5.567 39 4 37.433 4 35.5V12.5Z" fill="#f6c453" opacity="0.55"/>
                <path d="M4 16.5C4 15.119 5.119 14 6.5 14H41.5C42.881 14 44 15.119 44 16.5V35.5C44 37.433 42.433 39 40.5 39H7.5C5.567 39 4 37.433 4 35.5V16.5Z" fill="#f6c453"/>
              </svg>
              ${f.name}
            </span>
            <span class="col-date">${f.dateModified}</span>
            <span class="col-type">${f.type}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ── RENDER: EMPTY / COMING SOON ── */
function renderComingSoon(folder) {
  return `
    <div class="explorer-crumbs">
      <button class="explorer-back" data-back="1"><i class="ti ti-arrow-left"></i> Back</button>
      <span class="crumb-sep">/</span>
      <span class="crumb-current">${folder.name}</span>
    </div>
    <div class="explorer-empty">
      <i class="ti ti-folder-x"></i>
      <p>This folder is empty for now.</p>
      <span>More projects are on the way.</span>
    </div>
  `;
}

/* ── RENDER: PROJECT DETAIL (RIWA9 STORE) ── */
function renderProjectDetail(id) {
  const folder = projectFolders.find(f => f.id === id);
  const data = projectData[id];
  if (!data) return renderComingSoon(folder);

  return `
    <div class="explorer-crumbs">
      <button class="explorer-back" data-back="1"><i class="ti ti-arrow-left"></i> Back</button>
      <span class="crumb-sep">/</span>
      <span class="crumb-current">${data.title}</span>
    </div>

    <div class="project-detail">

      <div class="project-panel project-panel-left">

        <h2 class="project-title">${data.title}</h2>
        <p class="project-desc">${data.description}</p>

        <div class="project-block">
          <h4>Tech Stack</h4>
          <div class="tag-row">
            ${data.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
          </div>
        </div>

        <div class="project-block">
          <h4>Main Features</h4>
          <div class="feature-groups">
            ${data.featureGroups.map(g => `
              <div class="feature-group">
                <span class="feature-group-label">${g.label}</span>
                <div class="tag-row">
                  ${g.items.map(i => `<span class="feature-pill">${i}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="project-block">
          <h4>Architecture</h4>
          <p class="project-architecture">${data.architecture}</p>
        </div>

        <div class="project-block">
          <h4>Statistics</h4>
          <div class="stats-row">
            ${data.stats.map(s => `
              <div class="stat-card">
                <span class="stat-value">${s.value}</span>
                <span class="stat-label">${s.label}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="project-buttons">
          <a class="project-btn project-btn-primary" href="${data.website}" target="_blank" rel="noopener">
            <i class="ti ti-external-link"></i> Visit Website
          </a>
          ${data.github ? `
            <a class="project-btn project-btn-ghost" href="${data.github}" target="_blank" rel="noopener">
              <i class="ti ti-brand-github"></i> GitHub
            </a>
          ` : ''}
        </div>

      </div>

      <div class="project-panel project-panel-right">

        <a class="live-preview-card" href="${data.website}" target="_blank" rel="noopener" aria-label="Open ${data.title} website">
          <div class="live-preview-frame">
            <iframe
              src="${data.website}"
              loading="lazy"
              referrerpolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin"
              title="${data.title} live preview"
            ></iframe>
          </div>
          <div class="live-preview-overlay">
            <i class="ti ti-arrow-up-right"></i>
            <span>Open live site</span>
          </div>
        </a>

        <div class="preview-meta">
          <span class="preview-meta-label">Built with</span>
          <div class="tag-row">
            ${data.tech.map(t => `<span class="tech-pill tech-pill-sm">${t}</span>`).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}

/* ── MASTER RENDER ── */
function projectsHTML() {
  let inner;
  if (explorerState.view === 'grid') {
    inner = renderFolderGrid();
  } else {
    const folder = projectFolders.find(f => f.id === explorerState.activeId);
    inner = folder && folder.hasContent
      ? renderProjectDetail(folder.id)
      : renderComingSoon(folder);
  }
  return `<div class="explorer" data-view="${explorerState.view}">${inner}</div>`;
}

/* ── EXPLORER NAVIGATION ── */
function explorerOpen(id) {
  explorerState.view = 'detail';
  explorerState.activeId = id;
  renderContent(3);
}

function explorerBack() {
  explorerState.view = 'grid';
  explorerState.activeId = null;
  renderContent(3);
}

/* Event delegation on the stable #content container so the explorer
   keeps working across re-renders without touching the core nav logic. */
document.getElementById('content').addEventListener('click', (e) => {
  const folderEl = e.target.closest('.folder-row');
  if (folderEl) { explorerOpen(folderEl.dataset.folder); return; }

  const backEl = e.target.closest('[data-back]');
  if (backEl) { explorerBack(); return; }
});

document.getElementById('content').addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const folderEl = e.target.closest('.folder-row');
  if (folderEl) explorerOpen(folderEl.dataset.folder);
});
function contactHTML() {
  const goleadorLinks = [
    { icon: 'ti-brand-facebook',  label: 'Facebook',  value: 'facebook.com/imad.eddine.1291421', href: 'https://www.facebook.com/imad.eddine.1291421' },
    { icon: 'ti-brand-instagram', label: 'Instagram', value: '@imado__777',                        href: 'https://www.instagram.com/imado__777/' },
    { icon: 'ti-brand-discord',   label: 'Discord',    value: 'ima.ddd',                             href: null },
    { icon: 'ti-brand-whatsapp',  label: 'WhatsApp',   value: '+213 776 072 493',                    href: 'https://wa.me/213776072493' },
    { icon: 'ti-mail',            label: 'Email',      value: 'imadlahcen4@gmail.com',                href: 'mailto:imadlahcen4@gmail.com' },
  ];

  const riwa9Links = [
    { icon: 'ti-brand-facebook',  label: 'Facebook',  value: 'Riwa9 Dev',            href: 'https://www.facebook.com/profile.php?id=61589823940543' },
    { icon: 'ti-brand-instagram', label: 'Instagram', value: '@riwa9.dev',           href: 'https://www.instagram.com/riwa9.dev/' },
    { icon: 'ti-brand-whatsapp',  label: 'WhatsApp',   value: '+213 557 362 935',    href: 'https://wa.me/213557362935' },
    { icon: 'ti-mail',            label: 'Email',      value: 'riwa9dev@gmail.com',   href: 'mailto:riwa9dev@gmail.com' },
  ];

  const renderLinks = (links) => links.map(l => {
    const inner = `
      <i class="ti ${l.icon}"></i>
      <span class="contact-link-text">
        <span class="contact-link-label">${l.label}</span>
        <span class="contact-link-value">${l.value}</span>
      </span>
    `;
    return l.href
      ? `<a class="contact-link" href="${l.href}" target="_blank" rel="noopener">${inner}</a>`
      : `<span class="contact-link contact-link-static">${inner}</span>`;
  }).join('');

  return `
    <div class="contact-section">

      <div class="contact-heading">
        <h2>Let's Work Together</h2>
      </div>

      <div class="contact-columns">

        <div class="contact-side contact-side-personal">
          <span class="contact-side-tag">Personal</span>
          <h3>Goleador</h3>
          <div class="contact-links">
            ${renderLinks(goleadorLinks)}
          </div>
        </div>

        <div class="contact-divider">
          <div class="contact-gif-wrap">
            <img src="src/2sides.gif" alt="" class="contact-gif">
          </div>
        </div>

        <div class="contact-side contact-side-agency">
          <span class="contact-side-tag">Agency</span>
          <h3>Riwa9 Dev</h3>
          <p class="contact-side-tagline">Riwa9 Dev is growing, and we're always looking for skilled people to join the team. If you want to work with us, reach out below.</p>
          <div class="contact-links">
            ${renderLinks(riwa9Links)}
          </div>
        </div>

      </div>

    </div>
  `;
}

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