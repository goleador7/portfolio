// ===== MOBILE NAV TOGGLE =====
(function () {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  if (!navToggle || !navLinks || !navOverlay) return;

  function openMenu() {
    navLinks.classList.add('open');
    navOverlay.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open'); // locks body scroll via CSS
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    navOverlay.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) closeMenu();
    else openMenu();
  });

  navOverlay.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
  });

  // If resized back to desktop while open, reset state so nothing sticks
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navLinks.classList.contains('open')) closeMenu();
  });
})();

// ===== LANGUAGE TOGGLE =====
let currentLang = 'en';

document.querySelectorAll('.lang-toggle .lang-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.lang-toggle .lang-option').forEach(o => o.classList.remove('active'));
    option.classList.add('active');

    const lang = option.dataset.lang;
    setLanguage(lang);
  });
});

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-en]').forEach(el => {
    if (el.dataset[lang] !== undefined) {
      el.textContent = el.dataset[lang];
    }
  });

  renderContactGrid();
  restartRotatingTitle();

  // If the modal is open, re-render it in the new language
  const modalOverlay = document.getElementById("modalOverlay");
  if (modalOverlay && modalOverlay.classList.contains("open") && modalOverlay.dataset.openProject) {
    renderModal(modalOverlay.dataset.openProject);
  }
}

// ===== ROTATING HERO TAGLINE =====
const rotatingLines = {
  en: [
    "Building solutions for real businesses.",
    "Full-stack developer.",
    "AI & Cybersecurity, Master's student."
  ],
  fr: [
    "Je construis des solutions pour de vraies entreprises.",
    "Développeur full-stack.",
    "Étudiant en Master, IA & Cybersécurité."
  ],
  ar: [
    "أبني حلولاً لشركات حقيقية.",
    "مطور Full-Stack.",
    "طالب ماستر، ذكاء اصطناعي وأمن سيبراني."
  ]
};

let rotatingTimer = null;
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeLoop(el, lines, { typeSpeed = 45, deleteSpeed = 28, holdTime = 1600, pauseTime = 400 } = {}) {
  if (!el || !lines || !lines.length) return null;

  if (prefersReducedMotion) {
    // No animation: just cycle full lines on an interval, no typing effect
    let i = 0;
    el.textContent = lines[0];
    return setInterval(() => {
      i = (i + 1) % lines.length;
      el.textContent = lines[i];
    }, holdTime + 1500);
  }

  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let timeoutId = null;

  function tick() {
    const current = lines[lineIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = false;
        timeoutId = setTimeout(() => { deleting = true; tick(); }, holdTime);
        return;
      }
      timeoutId = setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        timeoutId = setTimeout(tick, pauseTime);
        return;
      }
      timeoutId = setTimeout(tick, deleteSpeed);
    }
  }

  timeoutId = setTimeout(tick, pauseTime);

  // Return a cancel handle disguised as a "timer" for symmetry with clearInterval
  return { cancel: () => clearTimeout(timeoutId) };
}

function stopRotatingTitle() {
  if (!rotatingTimer) return;
  if (typeof rotatingTimer === 'number') clearInterval(rotatingTimer);
  else if (rotatingTimer.cancel) rotatingTimer.cancel();
  rotatingTimer = null;
}

function restartRotatingTitle() {
  stopRotatingTitle();
  const el = document.getElementById('rotatingTitleText');
  const lines = rotatingLines[currentLang] || rotatingLines.en;
  rotatingTimer = typeLoop(el, lines);
}

document.addEventListener('DOMContentLoaded', restartRotatingTitle);

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links li a');

function updateActiveLink() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink(); // run once on load

// ===== PROJECT DATA (multilingual) =====
const projectData = {
  riwa9dev: {
    title: { en: "Riwa9 Dev", fr: "Riwa9 Dev", ar: "Riwa9 Dev" },
    tags: ["Laravel", "PHP", "MySQL", "Vanilla JavaScript"],
    description: {
      en: "The official website for Riwa9 Dev, the development agency I founded. A Laravel REST API backend powers a public site showcasing our projects and team, plus a custom admin panel to manage everything.",
      fr: "Le site officiel de Riwa9 Dev, l'agence de développement que j'ai fondée. Un backend Laravel avec API REST alimente un site public présentant nos projets et notre équipe, ainsi qu'un panneau d'administration sur mesure pour tout gérer.",
      ar: "الموقع الرسمي لـ Riwa9 Dev، وكالة التطوير التي أسستها. واجهة خلفية Laravel توفر REST API تشغّل موقعاً عاماً يعرض مشاريعنا وفريقنا، بالإضافة إلى لوحة تحكم مخصصة لإدارة كل شيء."
    },
    features: {
      en: [
        "Public site showcasing projects and team, pulled live from the database",
        "Custom admin panel — add, edit, and delete projects and team members",
        "Token-based authentication (Laravel Sanctum), admin-only protected routes",
        "Full English / French / Arabic support with RTL layout",
        "Clean REST API architecture — backend and frontend fully decoupled"
      ],
      fr: [
        "Site public présentant projets et équipe, alimenté en direct depuis la base de données",
        "Panneau d'administration sur mesure — ajouter, modifier et supprimer projets et membres de l'équipe",
        "Authentification par token (Laravel Sanctum), routes protégées réservées aux administrateurs",
        "Support complet anglais / français / arabe avec mise en page RTL",
        "Architecture REST API propre — backend et frontend totalement découplés"
      ],
      ar: [
        "موقع عام يعرض المشاريع والفريق، يُحدَّث مباشرة من قاعدة البيانات",
        "لوحة تحكم مخصصة — إضافة وتعديل وحذف المشاريع وأعضاء الفريق",
        "مصادقة عبر التوكن (Laravel Sanctum)، مسارات محمية للمشرفين فقط",
        "دعم كامل للإنجليزية والفرنسية والعربية مع تخطيط من اليمين لليسار",
        "معمارية REST API نظيفة — فصل تام بين الواجهة الخلفية والأمامية"
      ]
    },
    why: {
      en: "Built as the operating website for my own agency — not just a portfolio piece, but real infrastructure I use to showcase client work and manage my growing team.",
      fr: "Conçu comme le site opérationnel de ma propre agence — pas seulement une pièce de portfolio, mais une véritable infrastructure que j'utilise pour présenter le travail client et gérer mon équipe grandissante.",
      ar: "تم بناؤه كموقع تشغيلي لوكالتي الخاصة — ليس مجرد عمل ضمن معرض الأعمال، بل بنية تحتية حقيقية أستخدمها لعرض أعمال العملاء وإدارة فريقي المتنامي."
    },
    live: "https://riwa9-dev.vercel.app/",
    backend: null
  },
  riwa9: {
    title: { en: "RIWA9 Store", fr: "RIWA9 Store", ar: "متجر RIWA9" },
    tags: ["Laravel", "PHP", "MySQL", "Vanilla JavaScript"],
    description: {
      en: "A full e-commerce platform: a Laravel REST API backend handling products, orders, reviews, and admin operations, paired with a fast, dependency-free vanilla JavaScript storefront.",
      fr: "Une plateforme e-commerce complète : un backend Laravel exposant une API REST pour gérer produits, commandes, avis et opérations d'administration, couplé à une boutique frontend en JavaScript pur, rapide et sans dépendances.",
      ar: "منصة تجارة إلكترونية متكاملة: واجهة خلفية Laravel توفر REST API لإدارة المنتجات والطلبات والتقييمات وعمليات الإدارة، مع واجهة أمامية بلغة JavaScript خالصة، سريعة وخالية من التبعيات."
    },
    features: {
      en: [
        "Three-level category system (category → subcategory → product)",
        "Admin panel with secure authentication",
        "Product reviews & ratings",
        "Wishlist functionality",
        "Cart & full order flow",
        "Fully responsive design",
        "Clean REST API architecture — backend and frontend fully decoupled"
      ],
      fr: [
        "Système de catégories à trois niveaux (catégorie → sous-catégorie → produit)",
        "Panneau d'administration avec authentification sécurisée",
        "Avis et notes sur les produits",
        "Fonctionnalité liste de souhaits",
        "Panier et flux de commande complet",
        "Design entièrement responsive",
        "Architecture REST API propre — backend et frontend totalement découplés"
      ],
      ar: [
        "نظام تصنيف من ثلاثة مستويات (فئة ← فئة فرعية ← منتج)",
        "لوحة تحكم بمصادقة آمنة",
        "تقييمات وآراء حول المنتجات",
        "خاصية قائمة الرغبات",
        "سلة تسوق ونظام طلبات متكامل",
        "تصميم متجاوب بالكامل",
        "معمارية REST API نظيفة — فصل تام بين الواجهة الخلفية والأمامية"
      ]
    },
    why: {
      en: "Built to prove a decoupled architecture works in practice — a backend that only speaks REST, and a frontend with zero frameworks or build steps, just clean fundamentals talking to a real production API.",
      fr: "Conçu pour prouver qu'une architecture découplée fonctionne en pratique — un backend qui ne parle qu'en REST, et un frontend sans framework ni étape de build, juste des fondamentaux propres qui dialoguent avec une vraie API en production.",
      ar: "تم بناؤه لإثبات أن المعمارية المنفصلة تعمل عملياً — واجهة خلفية تتواصل عبر REST فقط، وواجهة أمامية بدون أي إطار عمل أو خطوات بناء، فقط أساسيات نظيفة تتحدث مع API حقيقي في بيئة الإنتاج."
    },
    live: "https://riwa9-store.vercel.app/",
    backend: "https://riwa9.onrender.com"
  },
  ats: {
    title: { en: "Mini ATS System — Resume Screening with NLP", fr: "Mini ATS — Tri de CV par NLP", ar: "نظام Mini ATS — فرز السير الذاتية بالـ NLP" },
    tags: ["Python", "Streamlit", "NLTK", "Scikit-learn"],
    description: {
      en: "An Applicant Tracking System (ATS) that automatically screens and ranks resumes against job descriptions using Natural Language Processing.",
      fr: "Un système de suivi des candidatures (ATS) qui analyse et classe automatiquement les CV par rapport aux descriptions de poste grâce au traitement du langage naturel.",
      ar: "نظام لتتبع المتقدمين (ATS) يقوم تلقائياً بفرز وترتيب السير الذاتية مقارنة بمتطلبات الوظيفة باستخدام معالجة اللغة الطبيعية."
    },
    features: {
      en: [
        "Resume parsing and text extraction",
        "NLP-based matching between resumes and job descriptions",
        "Candidate ranking and scoring",
        "Interactive web interface via Streamlit"
      ],
      fr: [
        "Analyse de CV et extraction de texte",
        "Correspondance basée sur le NLP entre CV et offres d'emploi",
        "Classement et notation des candidats",
        "Interface web interactive via Streamlit"
      ],
      ar: [
        "تحليل السير الذاتية واستخراج النصوص",
        "مطابقة قائمة على معالجة اللغة الطبيعية بين السير الذاتية ومتطلبات الوظيفة",
        "ترتيب وتقييم المرشحين",
        "واجهة ويب تفاعلية عبر Streamlit"
      ]
    },
    why: {
      en: "Built to showcase my Python/ML skills separately from my Laravel-heavy work, applying NLP techniques from my Master's coursework to a real HR use case.",
      fr: "Conçu pour mettre en valeur mes compétences en Python/ML, indépendamment de mon travail Laravel, en appliquant des techniques de NLP issues de mon Master à un cas d'usage RH réel.",
      ar: "تم بناؤه لإبراز مهاراتي في Python وتعلم الآلة بمعزل عن أعمالي المرتكزة على Laravel، من خلال تطبيق تقنيات NLP التي درستها في الماستر على حالة استخدام حقيقية في الموارد البشرية."
    },
    live: "https://mini-ats-system.streamlit.app/",
    backend: null
  }
};

const uiText = {
  features: { en: "Features", fr: "Fonctionnalités", ar: "المميزات" },
  why: { en: "Why this project", fr: "Pourquoi ce projet", ar: "لماذا هذا المشروع" },
  liveSite: { en: "Open Live Site", fr: "Voir le site en ligne", ar: "فتح الموقع المباشر" },
  api: { en: "API", fr: "API", ar: "API" },
  copied: { en: "Copied!", fr: "Copié !", ar: "تم النسخ!" }
};

// ===== CONTACT LINKS (multilingual labels; values stay as-is) =====
const goleadorLinks = [
  { icon: 'ti-brand-facebook',  label: { en: 'Facebook', fr: 'Facebook', ar: 'فيسبوك' },   value: 'IMad Bencherif', href: 'https://www.facebook.com/imad.eddine.1291421' },
  { icon: 'ti-brand-instagram', label: { en: 'Instagram', fr: 'Instagram', ar: 'إنستغرام' }, value: '@imado__777',     href: 'https://www.instagram.com/imado__777/' },
  { icon: 'ti-brand-discord',   label: { en: 'Discord', fr: 'Discord', ar: 'ديسكورد' },       value: 'ima.ddd',        href: null },
  { icon: 'ti-brand-whatsapp',  label: { en: 'WhatsApp', fr: 'WhatsApp', ar: 'واتساب' },      value: '+213 776 072 493', href: 'https://wa.me/213776072493' },
  { icon: 'ti-mail',            label: { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' }, value: 'imadlahcen4@gmail.com', href: 'mailto:imadlahcen4@gmail.com' },
  { icon: 'ti-brand-github',    label: { en: 'GitHub', fr: 'GitHub', ar: 'غيت هب' },          value: 'goleador7',      href: 'https://github.com/goleador7' },
];

function renderContactGrid() {
  const grid = document.getElementById("contactGrid");
  if (!grid) return;

  grid.innerHTML = goleadorLinks.map(link => {
    const label = link.label[currentLang] || link.label.en;
    const inner = `
      <i class="ti ${link.icon} contact-icon"></i>
      <div class="contact-info">
        <span class="contact-label">${label}</span>
        <span class="contact-value">${link.value}</span>
      </div>
      ${link.href ? '<i class="ti ti-arrow-up-right contact-arrow"></i>' : '<i class="ti ti-copy contact-arrow"></i>'}
    `;

    if (link.href) {
      const isExternal = link.href.startsWith("http");
      return `<a class="contact-card" href="${link.href}" ${isExternal ? 'target="_blank" rel="noopener"' : ''}>${inner}</a>`;
    }
    // No href (Discord): click to copy the handle
    return `<button class="contact-card contact-card--copy" data-copy="${link.value}" type="button">${inner}</button>`;
  }).join("");

  grid.querySelectorAll(".contact-card--copy").forEach(btn => {
    btn.addEventListener("click", () => {
      navigator.clipboard?.writeText(btn.dataset.copy);
      const valueEl = btn.querySelector(".contact-value");
      const original = valueEl.textContent;
      valueEl.textContent = uiText.copied[currentLang] || uiText.copied.en;
      setTimeout(() => { valueEl.textContent = original; }, 1500);
    });
  });
}

document.addEventListener("DOMContentLoaded", renderContactGrid);

// ===== PROJECT MODAL =====
function renderModal(key) {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalContent = document.getElementById("modalContent");
  const data = projectData[key];
  if (!data) return;

  modalOverlay.dataset.openProject = key;

  const t = (field) => data[field][currentLang] || data[field].en;
  const u = (field) => uiText[field][currentLang] || uiText[field].en;

  let linksHTML = `<div class="modal-links">`;
  if (data.live) linksHTML += `<a href="${data.live}" target="_blank" rel="noopener">${u('liveSite')}</a>`;
  if (data.backend) linksHTML += `<a href="${data.backend}" target="_blank" rel="noopener">${u('api')}</a>`;
  linksHTML += `</div>`;

  modalContent.innerHTML = `
    <div class="browser-frame">
      <div class="browser-topbar">
        <span class="browser-dot" style="background:#ff5f57;"></span>
        <span class="browser-dot" style="background:#febc2e;"></span>
        <span class="browser-dot" style="background:#28c840;"></span>
      </div>
      <iframe src="${data.live}" loading="lazy"></iframe>
    </div>
    <div class="modal-tags">${data.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
    <h2>${t('title')}</h2>
    <p>${t('description')}</p>
    <h4>${u('features')}</h4>
    <ul>${t('features').map(f => `<li>${f}</li>`).join("")}</ul>
    <h4>${u('why')}</h4>
    <p>${t('why')}</p>
    ${linksHTML}
  `;

  modalOverlay.classList.add("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalContent = document.getElementById("modalContent");
  const modalClose = document.getElementById("modalClose");

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      renderModal(card.dataset.project);
    });
  });

  function closeModal() {
    modalOverlay.classList.remove("open");
    modalOverlay.dataset.openProject = "";
    modalContent.innerHTML = ""; // stop iframe loading when closed
  }

  modalClose.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) closeModal();
  });
});