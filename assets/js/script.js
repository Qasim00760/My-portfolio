'use strict';

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



// light / dark theme (the starting theme is set by the inline script in <head>)
const themeBtn = document.querySelector("[data-theme-toggle]");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

const savedTheme = function () {
  try { return localStorage.getItem("theme"); } catch (e) { return null; }
}

const setTheme = function (theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeMeta.setAttribute("content", theme === "dark" ? "#0B0D12" : "#F4F5F7");
  themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

themeBtn.addEventListener("click", function () {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
});

// follow system changes until the visitor picks a theme themselves
if (darkQuery && darkQuery.addEventListener) {
  darkQuery.addEventListener("change", function (e) {
    if (!savedTheme()) setTheme(e.matches ? "dark" : "light");
  });
}



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
  body.appendChild(category);
  body.appendChild(el("h3", "project-title", project.title));
  body.appendChild(el("p", "project-desc", project.description));

  const tech = el("ul", "project-tech");
  (project.tech || []).forEach(function (t) { tech.appendChild(el("li", "tag", t)); });
  body.appendChild(tech);

  const links = el("div", "project-links");
  [["github", "GitHub"], ["live", "Live demo"]].forEach(function (item) {
    if (!project[item[0]]) return;
    const a = el("a", "project-link", item[1]);
    a.href = project[item[0]];
    a.target = "_blank";
    a.rel = "noopener";
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
    return "Tech stack: Python, SQL, Pandas, NumPy, Matplotlib, Seaborn, Scikit-Learn, XGBoost, OpenCV, YOLO, LLMs, Ollama, n8n, Airtable, React, Tailwind, FastAPI, Node.js, Streamlit, Hugging Face, Git &amp; GitHub, Jupyter and VS Code.";
  }
  if (/service|hire|offer|freelance/.test(q)) {
    return "Qasim offers Data Analytics, Machine Learning, Computer Vision, Generative AI, AI Agents Development, AI Automation, Deployment (Streamlit Cloud and Hugging Face Spaces) and Consultancy. He is available for freelance and full-time roles.";
  }
  if (/contact|email|phone|whatsapp|reach/.test(q)) {
    return 'Email: <a href="mailto:qasimktk160@gmail.com">qasimktk160@gmail.com</a><br>Phone / WhatsApp: <a href="https://wa.me/923305350857" target="_blank" rel="noopener">+92 330 5350857</a><br>Location: Karak, KPK, Pakistan';
  }
  if (/educat|universit|degree|study|school/.test(q)) {
    return "Qasim is studying BS Computer Science at Hazara University. Before that: FSC (2022-2024) and Matric (2020-2022) at Chokara Science School and College, Chokara, Karak.";
  }
  if (/experience|intern|devsil|job|mentor/.test(q)) {
    return "Data Science &amp; Full Stack AI Development Mentorship Program at Devsil Software Co. (Dec 2025-June 2026, 7 months): worked on data analysis and machine learning projects (data preprocessing, predictive models, business insights), then built complete AI products end to end, including AI agents, workflow automation, LLM-powered tools and full stack web apps.";
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
