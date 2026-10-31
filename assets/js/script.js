'use strict';

// safe localStorage (can throw in private mode / blocked storage)
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* ignore */ } }
};

const PROJECTS = window.PROJECTS || [];

const CATEGORY_LABELS = {
  "data-analytics": "Data Analytics",
  "machine-learning": "Machine Learning",
  "computer-vision": "Computer Vision",
  "generative-ai": "Generative AI",
  "ai-agents": "AI Agents",
  "ai-automation": "AI Automation"
};



// header: border on scroll + mobile menu
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuBtn = document.querySelector("[data-menu-btn]");

window.addEventListener("scroll", function () {
  header.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });

const setMenu = function (open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", function () {
  setMenu(!nav.classList.contains("open"));
});

nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () { setMenu(false); });
});



// projects: render cards from data/projects.js
const grid = document.querySelector("[data-project-grid]");
const emptyState = document.querySelector("[data-empty-state]");
const tabs = document.querySelectorAll("[data-filter]");

const el = function (tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

const projectCard = function (project) {
  const li = el("li", "project-card");
  li.dataset.category = project.category;

  if (project.image) {
    const figure = el("figure", "project-img");
    const img = el("img");
    img.src = project.image;
    img.alt = project.title;
    img.loading = "lazy";
    figure.appendChild(img);
    li.appendChild(figure);
  }

  const body = el("div", "project-body");
  const category = el("p", "project-category", CATEGORY_LABELS[project.category] || project.category);
  category.dataset.i18n = "tab_" + project.category;
  body.appendChild(category);
  body.appendChild(el("h3", "project-title", project.title));
  body.appendChild(el("p", "project-desc", project.description));

  const tech = el("ul", "project-tech");
  (project.tech || []).forEach(function (t) { tech.appendChild(el("li", "tag", t)); });
  body.appendChild(tech);

  const links = el("div", "project-links");
  [["github", "GitHub", "link_github"], ["live", "Live demo", "link_live"]].forEach(function (item) {
    if (!project[item[0]]) return;
    const a = el("a", "project-link", item[1]);
    a.href = project[item[0]];
    a.target = "_blank";
    a.rel = "noopener";
    a.dataset.i18n = item[2];
    links.appendChild(a);
  });
  if (links.children.length) body.appendChild(links);

  li.appendChild(body);
  return li;
}

PROJECTS.forEach(function (project) { grid.appendChild(projectCard(project)); });

const filterProjects = function (filter) {
  let visible = 0;
  grid.querySelectorAll(".project-card").forEach(function (card) {
    const show = filter === "all" || card.dataset.category === filter;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible > 0;
  grid.hidden = visible === 0;
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (t) {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });
    filterProjects(tab.dataset.filter);
    tab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  });
});

filterProjects("all");



// language toggle (English / Urdu)
const URDU = {
  nav_work: "کام",
  nav_services: "خدمات",
  nav_about: "تعارف",
  nav_contact: "رابطہ",
  hire_me: "مجھے ہائر کریں",
  hero_badge: "فری لانس اور کل وقتی ملازمت کے لیے دستیاب",
  hero_title: "میں ڈیٹا کو ایسی اے آئی پراڈکٹس میں بدلتا ہوں جو کام کرتی ہیں۔",
  hero_sub: "محمد قاسم — فل اسٹیک اے آئی ڈویلپر، کرک، پاکستان۔ ڈیٹا اینالیٹکس اور مشین لرننگ سے لے کر کمپیوٹر وژن، جنریٹو اے آئی، اے آئی ایجنٹس اور آٹومیشن تک، میں آئیڈیاز کو خام ڈیٹا سے لائیو ڈیپلائمنٹ تک لے جاتا ہوں۔",
  hero_cta_work: "میرا کام دیکھیں",
  hero_cta_cv: "سی وی ڈاؤن لوڈ کریں",
  stack_label: "ٹیکنالوجیز",
  work_label: "منتخب کام",
  work_title: "پراجیکٹس",
  "tab_all": "سب",
  "tab_data-analytics": "ڈیٹا اینالیٹکس",
  "tab_machine-learning": "مشین لرننگ",
  "tab_computer-vision": "کمپیوٹر وژن",
  "tab_generative-ai": "جنریٹو اے آئی",
  "tab_ai-agents": "اے آئی ایجنٹس",
  "tab_ai-automation": "اے آئی آٹومیشن",
  link_github: "گِٹ ہب",
  link_live: "لائیو ڈیمو",
  empty_title: "پراجیکٹس جلد آ رہے ہیں",
  empty_text: "میں اس شعبے میں پراجیکٹس پر کام کر رہا ہوں۔ جلد دوبارہ دیکھیں۔",
  services_label: "میں کیا کرتا ہوں",
  services_title: "خدمات",
  svc1_title: "ڈیٹا اینالیٹکس",
  svc1_text: "ڈیٹا کا تجزیہ کر کے پیٹرنز تلاش کرنا اور کاروباری سوالات کے جواب دینا۔",
  svc2_title: "مشین لرننگ",
  svc2_text: "درست ماڈلز کی تربیت، اور یہ یقینی بنانا کہ وہ اوورفٹنگ کا شکار نہ ہوں۔",
  svc3_title: "کمپیوٹر وژن",
  svc3_text: "ایپلیکیشنز کو دیکھنے کی صلاحیت دینا: ڈیٹیکشن، اسکیننگ اور امیج اینالیسس۔",
  svc4_title: "جنریٹو اے آئی",
  svc4_text: "ایل ایل ایمز کی فائن ٹیوننگ اور کاروباری ضروریات کے لیے اے آئی ایپس بنانا۔",
  svc5_title: "اے آئی ایجنٹس ڈویلپمنٹ",
  svc5_text: "ایسے اے آئی ایجنٹس بنانا جو بار بار ہونے والے کاموں میں وقت بچائیں۔",
  svc6_title: "اے آئی آٹومیشن",
  svc6_text: "وقت طلب اور بار بار ہونے والے کاموں کو اے آئی سے خودکار بنانا۔",
  svc7_title: "ایم ایل آپس (AWS)",
  svc7_text: "آپ کے اے آئی ماڈلز کو AWS کلاؤڈ پر ڈیپلائے کرنا۔",
  svc8_title: "مشاورت",
  svc8_text: "کلائنٹس کو ان کے اپنے ڈیٹا سے کاروباری مسائل حل کرنے میں مشورہ دینا۔",
  about_label: "تعارف",
  about_title: "ایک ڈویلپر جو بنا کر سیکھتا ہے۔",
  about_text1: "میں کرک، پاکستان سے تعلق رکھنے والا فل اسٹیک اے آئی ڈویلپر ہوں۔ میں نے ڈیٹا سائنس اور مشین لرننگ کے آن لائن کورسز سے آغاز کیا، پھر جلد ہی عملی کام کی طرف بڑھا: Devsil Software Co. میں انٹرن شپ اور ایک فل اسٹیک اے آئی ڈویلپمنٹ مینٹورشپ پروگرام، جہاں میں نے حقیقی پراجیکٹس شروع سے آخر تک بنائے۔",
  about_text2: "آج میں ڈیٹا اینالیٹکس، مشین لرننگ، کمپیوٹر وژن، جنریٹو اے آئی، اے آئی ایجنٹس اور آٹومیشن پر کام کرتا ہوں۔ میں فرنٹ اینڈ، بیک اینڈ اور اے آئی لیئر بناتا ہوں، اور انہیں ڈیپلائے کرتا ہوں تاکہ حقیقی صارفین انہیں استعمال کر سکیں۔",
  exp_heading: "تجربہ",
  edu_heading: "تعلیم",
  cert_heading: "سرٹیفیکیشن",
  cert_view: "سرٹیفکیٹ دیکھیں",
  contact_label: "رابطہ",
  contact_title: "کوئی پراجیکٹ ذہن میں ہے؟ آئیں مل کر بنائیں۔",
  contact_whatsapp: "واٹس ایپ",
  chat_name: "پورٹ فولیو اسسٹنٹ",
  chat_hello: "السلام علیکم! قاسم کے پراجیکٹس، مہارتوں، تعلیم یا رابطے کے بارے میں پوچھیں۔",
  chip_projects: "پراجیکٹس",
  chip_skills: "مہارتیں",
  chip_contact: "رابطہ",
  chat_send: "بھیجیں"
};

const langBtn = document.getElementById("lang-toggle");

// remember the English text of every translatable element
const rememberEnglish = function (root) {
  root.querySelectorAll("[data-i18n]").forEach(function (node) {
    if (node.dataset.en === undefined) node.dataset.en = node.textContent;
  });
}

const applyLanguage = function (lang) {
  rememberEnglish(document);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(function (node) {
    const ur = URDU[node.dataset.i18n];
    node.textContent = lang === "ur" && ur ? ur : node.dataset.en;
  });
  langBtn.textContent = lang === "ur" ? "English" : "اردو";
  storage.set("qasim_language", lang);
}

langBtn.addEventListener("click", function () {
  applyLanguage(document.documentElement.lang === "ur" ? "en" : "ur");
});

if (storage.get("qasim_language") === "ur") applyLanguage("ur");



// portfolio assistant (keyword-based, runs in the browser)
const chatToggle = document.querySelector("[data-chat-toggle]");
const chatPanel = document.getElementById("chat-panel");
const chatClose = document.querySelector("[data-chat-close]");
const chatMessages = document.querySelector("[data-chat-messages]");
const chatForm = document.querySelector("[data-chat-form]");
const chatInput = document.querySelector("[data-chat-input]");

const setChat = function (open) {
  chatPanel.hidden = !open;
  chatToggle.setAttribute("aria-expanded", String(open));
  if (open) chatInput.focus();
}

chatToggle.addEventListener("click", function () { setChat(chatPanel.hidden); });
chatClose.addEventListener("click", function () { setChat(false); });

const addMessage = function (content, sender) {
  const msg = el("div", "chat-msg " + sender);
  if (sender === "user") msg.textContent = content;
  else msg.innerHTML = content; // bot replies are built from trusted site data only
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

const projectSummary = function () {
  const groups = {};
  PROJECTS.forEach(function (p) { (groups[p.category] = groups[p.category] || []).push(p.title); });
  const lines = Object.keys(groups).map(function (cat) {
    return "<strong>" + (CATEGORY_LABELS[cat] || cat) + ":</strong> " + groups[cat].join(", ");
  });
  return "Qasim has " + PROJECTS.length + " projects on this site:<br>" + lines.join("<br>") +
    '<br><a href="#work">See them in the Work section</a>.';
}

const reply = function (query) {
  const q = query.toLowerCase();
  const match = PROJECTS.find(function (p) { return q.includes(p.title.toLowerCase()); });

  if (match) {
    let text = "<strong>" + match.title + "</strong>: " + match.description + "<br>Tech: " + match.tech.join(", ");
    if (match.github) text += '<br><a href="' + match.github + '" target="_blank" rel="noopener">GitHub</a>';
    if (match.live) text += ' · <a href="' + match.live + '" target="_blank" rel="noopener">Live demo</a>';
    return text;
  }
  if (/project|work|portfolio|built/.test(q)) return projectSummary();
  if (/skill|tech|stack|tool|language/.test(q)) {
    return "Tech stack: Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-Learn, XGBoost, OpenCV, YOLO, Streamlit, SQL, GitHub, Docker, AWS, Linux, WordPress, Jupyter and VS Code.";
  }
  if (/service|hire|offer|freelance/.test(q)) {
    return "Qasim offers Data Analytics, Machine Learning, Computer Vision, Generative AI, AI Agents Development, AI Automation, MLOps (AWS) and Consultancy. He is available for freelance and full-time roles.";
  }
  if (/contact|email|phone|whatsapp|reach/.test(q)) {
    return 'Email: <a href="mailto:qasimktk160@gmail.com">qasimktk160@gmail.com</a><br>Phone / WhatsApp: <a href="https://wa.me/923305350857" target="_blank" rel="noopener">+92 330 5350857</a><br>Location: Karak, KPK, Pakistan';
  }
  if (/educat|universit|degree|study|school/.test(q)) {
    return "Qasim is studying BS Computer Science at Hazara University. Before that: FSC (2022–2024) and Matric (2020–2022) at Chokara Science School and College, Chokara, Karak.";
  }
  if (/experience|intern|devsil|job|mentor/.test(q)) {
    return "Full Stack AI Development Mentorship Program at Devsil Software Co. (Dec 2025–June 2026): built complete AI projects end to end, including AI agents, workflow automation, LLM-powered tools and full stack web apps.<br>Data Science Intern at Devsil Software Co. (Feb–May 2024): data preprocessing, predictive models, business insights and data pipelines.";
  }
  if (/certif|course|chilla/.test(q)) {
    return "Python Ka Chilla (40 days) from Codanics, completed July 7, 2024.";
  }
  if (/^(hi|hello|hey|salam|assalam)/.test(q)) {
    return "Hello! Ask me about Qasim's projects, skills, services, education or how to contact him.";
  }
  return 'I can answer questions about Qasim\'s projects, skills, services, education and contact details. For anything else, email him at <a href="mailto:qasimktk160@gmail.com">qasimktk160@gmail.com</a>.';
}

const ask = function (text) {
  addMessage(text, "user");
  setTimeout(function () { addMessage(reply(text), "bot"); }, 350);
}

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = "";
  ask(text);
});

const PRESET_QUESTIONS = {
  projects: "What projects has Qasim built?",
  skills: "What is his tech stack?",
  contact: "How can I contact him?"
};

document.querySelectorAll("[data-preset]").forEach(function (chip) {
  chip.addEventListener("click", function () { ask(PRESET_QUESTIONS[chip.dataset.preset]); });
});



// footer year
document.querySelector("[data-year]").textContent = new Date().getFullYear();
