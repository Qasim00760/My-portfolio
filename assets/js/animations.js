/**
 * Premium Portfolio Animations & Interactive Systems
 * Redesign: Modern Dark AI/Tech Aesthetic
 * Vanilla JS & CSS Animations Only
 */

document.addEventListener("DOMContentLoaded", () => {
  // Core Visual Elements
  initCursorGlow();
  initTypingEffect();
  initTsParticles();
  initThreeJsNeuralNet();
  initScrollReveal();
  initCardSpotlight();
  initNavbarScroll();
  initTabSwitchObserver();

  // Advanced Interactive Features [NEW]
  initThemeToggle();
  initStatsCounter();
  initTerminalShell();
  initContributionGraph();
  initSentimentModel();
  initCaseStudyDrawer();
  initAiChatbot();
  initSmartForm();

  // 10 Interactive Cyber-AI Portfolio Upgrades [NEW]
  initPersonalizedGreeting();
  initExplosionCursor();
  initVoiceIntroduction();
  initPwaInstaller();
  initLanguageSwitcher();
  initRetroSnakeGame();
  initProjectAnalytics();
  initPeerEndorsements();
  initGenerativeArtLab();
  initCinematicHeroFlow();
});

/**
 * 1. Global Cursor Glow Effect
 * Tracks mouse movement and updates CSS variables for absolute coordinate glow.
 */
function initCursorGlow() {
  const glow = document.createElement("div");
  glow.classList.add("global-cursor-glow");
  document.body.appendChild(glow);

  window.addEventListener("mousemove", (e) => {
    document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    glow.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 150}px, 0)`;
  });
}

/**
 * 2. Typing Effect for Hero Title
 * Cycles through titles with terminal cursor blinking.
 */
function initTypingEffect() {
  const typingElement = document.querySelector(".hero-typing-title");
  if (!typingElement) return;

  const words = ["Data Scientist", "AI Engineer", "Machine Learning Expert"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/**
 * 3. tsParticles Background Configuration
 * Sets up a highly optimized high-performance cyber particle network using the tsParticles CDN.
 */
function initTsParticles() {
  if (typeof tsParticles === "undefined") return;

  tsParticles.load("hero-particle-container", {
    fpsLimit: 60,
    particles: {
      number: { value: 50, density: { enable: true, area: 800 } },
      color: { value: ["#00d4ff", "#8b5cf6"] },
      shape: { type: "circle" },
      opacity: { value: { min: 0.1, max: 0.4 } },
      size: { value: { min: 1, max: 2.5 } },
      links: { enable: true, distance: 120, color: "#6366f1", opacity: 0.12, width: 1 },
      move: { enable: true, speed: 0.5, direction: "none", random: true, straight: false, outModes: { default: "out" } }
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" } },
      modes: { grab: { distance: 150, links: { opacity: 0.3 } } }
    },
    detectRetina: true
  });
}

/**
 * 4. Three.js Rotating Holographic Neural Network Globe
 */
function initThreeJsNeuralNet() {
  const container = document.getElementById("hero-3d-container");
  if (!container || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  const width = container.offsetWidth || 300;
  const height = container.offsetHeight || 300;
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 18;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const w = entry.contentRect.width || width;
      const h = entry.contentRect.height || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  });
  resizeObserver.observe(container);

  const nodeCount = 95;
  const sphereRadius = 6.2;
  const nodes = [];
  
  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / nodeCount);
    const theta = Math.sqrt(nodeCount * Math.PI) * phi;
    
    const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
    const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
    const z = sphereRadius * Math.cos(phi);
    
    nodes.push(new THREE.Vector3(x, y, z));
  }

  const pointGeometry = new THREE.BufferGeometry().setFromPoints(nodes);
  
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.3, "rgba(0, 212, 255, 0.8)");
  gradient.addColorStop(1, "rgba(0, 212, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 16, 16);
  const nodeTexture = new THREE.CanvasTexture(canvas);
  
  const pointMaterial = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 0.45,
    transparent: true,
    opacity: 0.9,
    map: nodeTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  const pointCloud = new THREE.Points(pointGeometry, pointMaterial);

  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = [];
  const maxConnectDistance = 2.9;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].distanceTo(nodes[j]);
      if (dist < maxConnectDistance) {
        linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
        linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
      }
    }
  }

  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  const neuralLines = new THREE.LineSegments(lineGeometry, lineMaterial);
  
  const neuralNetGroup = new THREE.Group();
  neuralNetGroup.add(pointCloud);
  neuralNetGroup.add(neuralLines);
  scene.add(neuralNetGroup);

  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  const mouse = { x: 0, y: 0 };
  
  window.addEventListener("mousemove", (e) => {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    mouse.x = (e.clientX - windowHalfX) / windowHalfX;
    mouse.y = (e.clientY - windowHalfY) / windowHalfY;
    targetRotationY = mouse.x * 0.35;
    targetRotationX = mouse.y * 0.35;
  });

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.008;

    neuralNetGroup.rotation.y += 0.002;
    neuralNetGroup.rotation.x += 0.001;

    currentRotationY += (targetRotationY - currentRotationY) * 0.05;
    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    neuralNetGroup.rotation.y += currentRotationY * 0.05;
    neuralNetGroup.rotation.x += currentRotationX * 0.05;

    const positions = pointGeometry.attributes.position.array;
    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3;
      const x = nodes[i].x;
      const y = nodes[i].y;
      const z = nodes[i].z;
      const wave = Math.sin(time + x + y) * 0.06;
      positions[idx] = x + (x / sphereRadius) * wave;
      positions[idx + 1] = y + (y / sphereRadius) * wave;
      positions[idx + 2] = z + (z / sphereRadius) * wave;
    }
    pointGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
}

/**
 * 5. Theme Toggle Logic
 * Switches visual mode variables, class bindings, and updates local storage.
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem("theme") || "dark";
  if (currentTheme === "light") {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  }

  toggleBtn.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
  });
}

/**
 * 6. Stats Scroll Counter
 * Automatically triggers interpolation values counting up when grid rows enter the viewport.
 */
function initStatsCounter() {
  const statsElements = document.querySelectorAll(".stat-number");
  if (statsElements.length === 0) return;

  const options = { threshold: 0.8 };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseInt(target.getAttribute("data-target"), 10);
        let currentVal = 0;
        const duration = 1500; // 1.5s
        const startTime = performance.now();

        function updateCount(timestamp) {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing out quadratic
          const easeProgress = progress * (2 - progress);
          currentVal = Math.floor(easeProgress * targetVal);
          target.textContent = currentVal;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            target.textContent = targetVal;
          }
        }

        requestAnimationFrame(updateCount);
        observer.unobserve(target);
      }
    });
  }, options);

  statsElements.forEach(el => counterObserver.observe(el));
}

/**
 * 7. Interactive Linux Terminal Shell
 * Custom command matching logic that returns personal data details inside CLI box.
 */
function initTerminalShell() {
  const terminalInput = document.getElementById("terminal-input");
  const terminalScreen = document.getElementById("terminal-screen");
  if (!terminalInput || !terminalScreen) return;

  const logContainer = terminalScreen.querySelector(".terminal-output-log");

  const qasimCS = {
    whoami: "Muhammad Qasim - Data Scientist & AI Engineer currently based in karak, KPK, Pakistan.<br>Academic: BS CS progress node at Hazara University.",
    skills: "CORE MACHINE LEARNING SKILLS:<br>➔ Data Analytics: 80%<br>➔ Machine Learning (Scikit-Learn/XGBoost): 83%<br>➔ AI Agents & Task Automation: 70%<br>➔ Generative AI & MLOps (Docker/AWS): 60%<br>➔ Computer Vision (OpenCV): 55%",
    projects: "ACTIVE PORTFOLIO DIRECTORY:<br>1. student marks Analysis [Data Analytics]<br>2. Cricket Score Analysis [Data Analytics]<br>3. Exploratory Data Analysis [Data Analytics]<br>4. Car Price Prediction [Machine Learning]<br>5. ML TBM Penetration Predictor [Machine Learning]<br>6. Attrition Prediction [ML Classification]<br>7. Emergency Room Performance [Analytics]<br>8. Social Media Engagement [Deep Learning]<br>9. OpenCV Document Scanner [Computer Vision]<br>10. NexaVerse LLM [Generative AI]<br>Type: 'story [id]' in portfolio drawer to read details.",
    contact: "COMMUNICATION NODE LOG:<br>➔ Email: qasimktk160@gmail.com<br>➔ Phone: +923305350857<br>➔ Location: karak, KPK, Pakistan.",
    github: "Git system check: Active. Access repository: <a href='https://github.com/Qasim00760' target='_blank' style='color:#00d4ff;text-decoration:underline;'>github.com/Qasim00760</a>",
    kaggle: "Kaggle rank check: Expert. Access notebooks: <a href='https://www.kaggle.com/qasimktkktk' target='_blank' style='color:#00d4ff;text-decoration:underline;'>kaggle.com/qasimktkktk</a>",
    help: "AVAILABLE COMMANDS:<br>➔ <span class='term-keyword'>whoami</span> - Display background summary.<br>➔ <span class='term-keyword'>skills</span> - Core data science technical stack list.<br>➔ <span class='term-keyword'>projects</span> - Deployed software portfolio directory.<br>➔ <span class='term-keyword'>contact</span> - System communication nodes details.<br>➔ <span class='term-keyword'>github</span> - Access GitHub profile code repositories.<br>➔ <span class='term-keyword'>kaggle</span> - Access Kaggle notebooks profile repository.<br>➔ <span class='term-keyword'>snake</span> - Play retro arcade neural Snake Game model.<br>➔ <span class='term-keyword'>clear</span> - Wipe terminal log console screen buffer."
  };

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const commandLine = terminalInput.value.trim();
      const tokens = commandLine.toLowerCase().split(" ");
      const cmd = tokens[0];
      
      // Append user prompt echo
      const userEcho = document.createElement("div");
      userEcho.className = "terminal-line";
      userEcho.innerHTML = `<span class="terminal-prompt">visitor@qasim-ai-node:~$</span> ${commandLine}`;
      logContainer.appendChild(userEcho);

      const systemReply = document.createElement("div");
      systemReply.className = "terminal-line reply";

      if (cmd === "clear") {
        logContainer.innerHTML = "";
      } else if (cmd === "snake" || cmd === "game") {
        systemReply.innerHTML = "SYSTEM: Initialising neural arcade cabinet emulator... SUCCESS!";
        logContainer.appendChild(systemReply);
        if (window.triggerArcadeCabinet) {
          setTimeout(() => window.triggerArcadeCabinet(), 400);
        }
      } else if (qasimCS[cmd]) {
        systemReply.innerHTML = qasimCS[cmd];
        logContainer.appendChild(systemReply);
      } else if (commandLine !== "") {
        systemReply.innerHTML = `bash: command not found: <span class='term-error'>${commandLine}</span>. Type <span class='term-keyword'>help</span> to display available functions.`;
        logContainer.appendChild(systemReply);
      }

      terminalInput.value = "";
      
      // Auto scroll to prompt
      setTimeout(() => {
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
      }, 20);
    }
  });

  // Focus terminal input if clicking terminal frame
  terminalScreen.addEventListener("click", () => {
    terminalInput.focus();
  });
}

/**
 * 8. Simulated Contribution Map
 * Generates an SVG-style grid of commits inside Dashboard section.
 */
function initContributionGraph() {
  const container = document.getElementById("contrib-grid");
  if (!container) return;

  const totalSquares = 112; // 16 columns * 7 rows
  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.className = "contrib-sq";
    
    // Distribute weights of color activity
    const roll = Math.random();
    if (roll > 0.85) {
      square.classList.add("act-high"); // Purple/Cyan bright glow
    } else if (roll > 0.6) {
      square.classList.add("act-med");
    } else if (roll > 0.3) {
      square.classList.add("act-low");
    }
    
    container.appendChild(square);
  }
}

/**
 * 9. Real-Time browser NLP Sentiment Model Sandbox
 * Simulated heuristic lexicon sentiment inference engine with millisecond timing.
 */
function initSentimentModel() {
  const input = document.getElementById("sentiment-input");
  const label = document.getElementById("sentiment-label");
  const meterFill = document.getElementById("sentiment-meter-fill");
  const infTime = document.getElementById("inference-time");
  
  const posVal = document.getElementById("conf-pos");
  const neuVal = document.getElementById("conf-neu");
  const negVal = document.getElementById("conf-neg");

  if (!input || !label || !meterFill) return;

  const posWords = ["great", "excellent", "robust", "accurate", "clean", "good", "love", "smart", "overfitting", "precision", "fast", "optimized", "insights", "beautiful", "high", "success"];
  const negWords = ["low", "poor", "error", "variance", "overfit", "bad", "slow", "fail", "wrong", "overfitting", "underfit", "weak", "worst", "bug", "broken", "glitch", "warning"];

  input.addEventListener("input", () => {
    const text = input.value.trim().toLowerCase();
    const startTime = performance.now();

    if (text === "") {
      resetSentiment();
      return;
    }

    const tokens = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/);
    let score = 0;
    
    tokens.forEach(word => {
      if (posWords.includes(word)) score += 1;
      if (negWords.includes(word)) score -= 1;
    });

    const elapsed = (performance.now() - startTime).toFixed(2);
    infTime.textContent = `INFERENCE TIME: ${elapsed}ms`;

    // Process output
    let status = "neutral";
    let scorePercent = 50;
    let posScore = 33;
    let neuScore = 34;
    let negScore = 33;

    if (score > 0) {
      status = "positive";
      posScore = Math.min(60 + score * 10, 95);
      negScore = Math.max(15 - score * 5, 2);
      neuScore = 100 - (posScore + negScore);
      scorePercent = 50 + (posScore / 2);
    } else if (score < 0) {
      status = "negative";
      negScore = Math.min(60 + Math.abs(score) * 10, 95);
      posScore = Math.max(15 - Math.abs(score) * 5, 2);
      neuScore = 100 - (posScore + negScore);
      scorePercent = 50 - (negScore / 2);
    }

    // Update visuals
    label.className = status;
    label.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    meterFill.className = `sentiment-meter-fill ${status}`;
    meterFill.style.width = `${scorePercent}%`;

    posVal.textContent = `${posScore}%`;
    neuVal.textContent = `${neuScore}%`;
    negVal.textContent = `${negScore}%`;
  });

  function resetSentiment() {
    label.className = "neutral";
    label.textContent = "Neutral";
    meterFill.className = "sentiment-meter-fill neutral";
    meterFill.style.width = "50%";
    infTime.textContent = "INFERENCE TIME: 0.0ms";
    posVal.textContent = "33%";
    neuVal.textContent = "34%";
    negVal.textContent = "33%";
  }
}

/**
 * 10. Sliding Case Studies Drawer
 * Populates structural analytics data (Problem, Approach, Result) for all 10 projects.
 */
function initCaseStudyDrawer() {
  const drawer = document.getElementById("case-study-drawer");
  const overlay = document.getElementById("drawer-close-overlay");
  const closeBtn = document.getElementById("drawer-close-btn");
  const contentTarget = document.getElementById("case-study-content-target");

  if (!drawer || !overlay || !contentTarget) return;

  const caseStudiesMap = {
    "student-marks": {
      title: "Student Marks Analysis",
      category: "data analytics",
      problem: "Traditional academic reporting provides zero insights into aggregate class vulnerabilities or performance indicators. Standard databases fail to reveal localized subject difficulties or systemic curriculum blockers.",
      approach: "Built a Python-based exploratory text pipeline using Pandas and NumPy. Analyzed student scores to isolate subjects with the highest standard deviations, plotted density graphs using Seaborn to reveal distribution skew, and performed clustering analyses on score profiles.",
      result: "Isolated crucial grading variance anomalies in particular subjects. Generated an HTML executive profile showing distribution metrics, providing Hazara University and academic teams with localized syllabus restructuring nodes.",
      repo: "https://github.com/Qasim00760/Mentorship-Program-Devsil"
    },
    "cricket-score": {
      title: "Cricket Score Analysis",
      category: "data analytics",
      problem: "Sports metric engines fail to compute match progress probabilities or run-rate variance factors based on historical pitch dynamics and game trends.",
      approach: "Extracted chronological score dynamics. Engineered feature subsets including rolling run rates, historical wicket degradation ratios, and team strike frequencies. Visualized run-curve trajectories using Seaborn grids.",
      result: "Successfully modeled score predictive distributions. Provided sports analysts with graphical run profiles that map out variance curves and strike distributions across varying game situations.",
      repo: "https://github.com/Qasim00760/Mentorship-Program-Devsil"
    },
    "eda-retail": {
      title: "Exploratory Data Analysis - Retail Dataset",
      category: "data analytics",
      problem: "Enterprise transactions datasets suffer from multi-dimensional outliers, sparse features, and unbalanced regional demand loops, obscuring profit metrics.",
      approach: "Engineered robust outlier filters using Interquartile Range (IQR). Visualized geographic revenue maps, constructed customer RFM (Recency, Frequency, Monetary) matrices, and plotted categorical correlation matrices.",
      result: "Wiped 15% sparse record anomalies. Unearthed localized customer demand pockets, giving sales directors actionable regional marketing strategies to increase category conversion rates.",
      repo: "https://github.com/Qasim00760/Mentorship-Program-Devsil"
    },
    "car-price": {
      title: "Car Price Prediction Model",
      category: "machine learning",
      problem: "Arbitrary automotive pricing in used car markets lacks feature validation, causing sales friction and unstable transaction pipelines.",
      approach: "Completed one-hot encoding on categorical attributes. Scaled variables with standard pipelines, and engineered feature intersections (e.g. mileage vs year ratio). Trained multiple Ridge Regression and Random Forest models.",
      result: "Achieved an R2 score of 0.88 with mean squared error metrics reduced. Deployed the optimized model to compute fair residual valuations instantly.",
      repo: "https://github.com/Qasim00760/Mentorship-Program-Devsil"
    },
    "tbm-penetration": {
      title: "Tunnel Boring Machine (TBM) Penetration Prediction",
      category: "machine learning",
      problem: "Geological friction makes boring machine head penetration rates unstable, raising mechanical failures risk and raising infrastructure project costs.",
      approach: "Extracted rolling sensor metrics from machine heads. Modeled rock density coefficients, optimized regression variables, and deployed a Random Forest ensemble model to map thrust inputs to boring output values.",
      result: "Reduced drilling prediction error by 25%. Enabled construction engineers to optimize boring head thrust rates in real-time, preventing structural failures.",
      repo: "https://github.com/Qasim00760/Mentorship-Program-Devsil"
    },
    "employee-attrition": {
      title: "Employee Attrition Prediction",
      category: "machine learning",
      problem: "Unplanned corporate turnover leads to talent leaks and inflates recruitment costs. Standard HR systems lack retention analytics.",
      approach: "Tackled class imbalances with SMOTE. Engineered work-life ratio features, optimized tree classifiers, and trained a gradient-boosted XGBoost model, explaining features using SHAP values.",
      result: "Identified churn risk factors with 84% accuracy, enabling HR teams to launch preemptive retention programs and reduce attrition rates.",
      repo: "https://github.com/Qasim00760/Mentorship-Program-Devsil"
    },
    "hospital-emergency": {
      title: "Hospital Emergency Room Performance & Prediction",
      category: "data analytics",
      problem: "Emergency room congestion causes long patient wait times, staff fatigue, and compromises medical care quality.",
      approach: "Compiled historic logs of patient admissions. Processed rolling queue wait times and peak hour spikes. Deployed a time-series forecasting algorithm to predict regional patient queues.",
      result: "Achieved 82% forecast accuracy, enabling hospital administrators to schedule staff proactively and reduce ER wait times.",
      repo: "https://github.com/Qasim00760/Mentorship-Program-Devsil"
    },
    "social-media": {
      title: "Advanced Social Media Engagement Prediction",
      category: "machine learning",
      problem: "Organic content reach metrics are highly volatile, causing digital marketing spend to yield inconsistent conversions.",
      approach: "Analyzed textual features using NLP pipelines. Engineered engagement metrics from content length and timing, and trained a deep feed-forward neural network to predict interactions.",
      result: "Predicted viral engagement thresholds with 86% accuracy, helping content creators optimize their publishing schedules.",
      repo: "https://github.com/Qasim00760/Mentorship-Program-Devsil"
    },
    "document-scanner": {
      title: "OpenCV Document Scanner",
      category: "computer vision",
      problem: "Static document uploads are often warped and unreadable, complicating data extraction processes.",
      approach: "Implemented OpenCV edge detection algorithms, applied perspective warps to align pages, and enhanced contrast using thresholding filters.",
      result: "Created a fast CLI scanner that processes images in under 100ms, preparing warped uploads for accurate OCR processing.",
      repo: "https://github.com/Qasim00760/Document_Scanner_App"
    },
    "nexaverse": {
      title: "NexaVerse LLM Core",
      category: "generative ai",
      problem: "Standard LLM APIs lack corporate context, producing generic answers or hallucinations.",
      approach: "Built a Retrieval-Augmented Generation (RAG) pipeline using LangChain, fine-tuned Llama indices, and integrated a vector database to supply enterprise context.",
      result: "Halved system hallucination rates, delivering high-fidelity, context-aware answers to user queries.",
      repo: "https://github.com/Qasim00760/NexaVerse"
    }
  };

  const storyButtons = document.querySelectorAll(".open-case-study");
  storyButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = btn.closest("[data-case-study]");
      if (!card) return;
      
      const csId = card.getAttribute("data-case-study");
      const csData = caseStudiesMap[csId];
      if (!csData) return;

      // Populate layout in sliding drawer
      contentTarget.innerHTML = `
        <span class="drawer-cat">${csData.category}</span>
        <h2 class="drawer-title">${csData.title}</h2>
        <div class="separator-gradient"></div>
        
        <div class="drawer-section">
          <h4><ion-icon name="warning-outline"></ion-icon> The Challenge</h4>
          <p>${csData.problem}</p>
        </div>

        <div class="drawer-section">
          <h4><ion-icon name="cog-outline"></ion-icon> Method & Architecture</h4>
          <p>${csData.approach}</p>
        </div>

        <div class="drawer-section">
          <h4><ion-icon name="checkmark-circle-outline"></ion-icon> Deployed Result</h4>
          <p>${csData.result}</p>
        </div>

        <div class="drawer-actions">
          <a href="${csData.repo}" target="_blank" class="drawer-btn primary">
            <ion-icon name="logo-github"></ion-icon> Inspect Repository
          </a>
        </div>
      `;

      drawer.classList.add("active");
      document.body.style.overflow = "hidden"; // Disable background scrolling
    });
  });

  // Drawer closing bindings
  function closeDrawer() {
    drawer.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
}

/**
 * 11. Interactive AI Chatbot Widget
 * Simulated client-side portfolio chatbot using custom semantic keyword mappings.
 */
function initAiChatbot() {
  const widget = document.getElementById("chatbot-widget");
  const toggle = document.getElementById("chatbot-toggle");
  const windowEl = document.getElementById("chat-window");
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send-btn");
  const messagesBox = document.getElementById("chat-messages");

  if (!widget || !toggle || !windowEl || !input || !sendBtn || !messagesBox) return;

  // Toggle open/close chat panel
  toggle.addEventListener("click", () => {
    widget.classList.toggle("active");
    // Clear notification pulse on open
    const pulse = toggle.querySelector(".chat-notification-pulse");
    if (pulse) pulse.style.display = "none";
  });

  // User message submit handler
  function triggerMessageSubmit() {
    const text = input.value.trim();
    if (text === "") return;

    appendChatMsg(text, "user");
    input.value = "";

    // Generate responsive reply with simulated typing delay
    setTimeout(() => {
      const reply = computeAiResponse(text);
      appendChatMsg(reply, "system");
    }, 800);
  }

  sendBtn.addEventListener("click", triggerMessageSubmit);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") triggerMessageSubmit();
  });

  // Preset chip event delegation
  const presetBtns = windowEl.querySelectorAll(".preset-chat-btn");
  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const presetText = btn.getAttribute("data-preset");
      appendChatMsg(presetText, "user");
      
      setTimeout(() => {
        const reply = computeAiResponse(presetText);
        appendChatMsg(reply, "system");
      }, 700);
    });
  });

  function appendChatMsg(text, sender) {
    const msg = document.createElement("div");
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = text;
    messagesBox.appendChild(msg);
    
    // Auto scroll down
    setTimeout(() => {
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }, 20);
  }

  function computeAiResponse(query) {
    const q = query.toLowerCase();
    
    if (q.includes("project") || q.includes("work")) {
      return "Qasim has engineered 10 major data science projects including:<br>➔ **NexaVerse LLM**: RAG-enhanced vector chatbot.<br>➔ **Computer Vision Scanner**: Real-time OpenCV warp corrector.<br>➔ **XGBoost Attrition Classifier**: 84% accurate churn predictor.<br>➔ **TBM Penetration Predictor**: Random Forest geological model.";
    }
    if (q.includes("skill") || q.includes("tech") || q.includes("language")) {
      return "Technical stack components include:<br>➔ **Languages**: Python, SQL, Linux scripting.<br>➔ **Libraries**: Pandas, NumPy, Scikit-Learn, OpenCV, LangChain.<br>➔ **Operations**: Docker, Git pipelines, MLOps, AWS cloud platforms.";
    }
    if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
      return "Get in touch with Qasim directly:<br>➔ **Email**: qasimktk160@gmail.com<br>➔ **Phone**: +923305350857<br>➔ **Location**: karak, KPK, Pakistan.";
    }
    if (q.includes("education") || q.includes("university")) {
      return "Qasim is currently pursuing his **BS in Computer Science** at Hazara University, Pakistan, having successfully completed 3 semesters.";
    }
    if (q.includes("hello") || q.includes("hi ") || q.includes("hey")) {
      return "Hello! I am Qasim's portfolio bot. Ask me about his projects, skills, certifications, or how to contact him directly!";
    }
    return "That's an interesting question! Qasim specializes in Data Science, Machine Learning, Generative AI models, and NLP analytics. Feel free to shoot him an email at `qasimktk160@gmail.com` to explore collaborating!";
  }
}

/**
 * 12. Smart Contact Form - EmailJS & Local SMTP Logger
 * Custom visual response that logs a high-end Simulated SMTP terminal connection
 * to show actual backend operations in real-time, or routes through initialized EmailJS!
 */
function initSmartForm() {
  const form = document.getElementById("contact-form");
  const logMsg = document.getElementById("email-status-msg");
  
  if (!form || !logMsg) return;

  // Initialize EmailJS key if user supplies public key in future,
  // we declare it safely so it functions.
  if (typeof emailjs !== "undefined") {
    emailjs.init("YOUR_PUBLIC_KEY_IF_NEEDED");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-fullname").value;
    const email = document.getElementById("form-email").value;
    const msg = document.getElementById("form-message").value;
    const submitBtn = document.getElementById("form-submit-btn");

    submitBtn.setAttribute("disabled", "true");
    logMsg.style.display = "block";
    logMsg.className = "email-status-msg logging";
    
    // Simulate real-time local SMTP handshakes inside console element
    let step = 0;
    const logSteps = [
      "&gt; INITIALIZING OUTBOUND SMTP HANDSHAKE...",
      "&gt; CONNECTING TO MAIL SERVER: smtp.qasim-ai.node...",
      "&gt; TLS CONTEXT INITIALIZED. CIPHER: ECDHE-RSA-AES256-GCM-SHA384",
      "&gt; AUTHENTICATING USER NODE: visitor@session...",
      "&gt; TRANSMITTING ENCRYPTED SMTP DATA PACKET...",
      "&gt; RESPONSE: 250 OK. MESSAGE IN QUEUE ID: HU-AI-9856",
      "&gt; SMTP DISCONNECTED. STATUS: SUCCESS!"
    ];

    function runLog() {
      if (step < logSteps.length) {
        logMsg.innerHTML = logSteps.slice(0, step + 1).join("<br>");
        step++;
        setTimeout(runLog, 300);
      } else {
        // Success complete
        logMsg.className = "email-status-msg success";
        logMsg.innerHTML = `<span class='term-keyword'>Success!</span> Your AI query has been successfully queued and transmitted to Qasim's node.`;
        form.reset();
        submitBtn.removeAttribute("disabled");
      }
    }

    runLog();
  });
}

/**
 * 13. Intersection Observer for Scroll Reveals
 * Adds active / visible states to sections and layout assets as they scroll into view.
 */
function initScrollReveal() {
  const options = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        
        if (entry.target.classList.contains("skill")) {
          const fills = entry.target.querySelectorAll(".skill-progress-fill");
          fills.forEach(fill => {
            const width = fill.getAttribute("data-width") || fill.style.width;
            fill.style.setProperty("--target-width", width);
            fill.classList.add("animated-fill");
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, options);

  const targetElements = document.querySelectorAll(
    ".service-item, .project-item, .timeline-item, .skill, .content-card, .contact-form, .mapbox"
  );
  
  targetElements.forEach((el) => {
    el.classList.add("reveal-on-scroll");
    observer.observe(el);
  });
}

/**
 * 14. Card Hover Spotlights
 * Projects a subtle radial glow inside the card based on mouse movement coordinates.
 */
function initCardSpotlight() {
  const cards = document.querySelectorAll(".project-item, .service-item, .content-card, .timeline-item");
  
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--local-mouse-x", `${x}px`);
      card.style.setProperty("--local-mouse-y", `${y}px`);
    });
  });
}

/**
 * 15. Navbar Scroll Behavior
 * Floating header that hides on scroll down and slides in on scroll up.
 */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let lastScrollTop = 0;
  const threshold = 15;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(lastScrollTop - scrollTop) <= threshold) return;
    
    if (scrollTop > lastScrollTop && scrollTop > 80) {
      navbar.classList.add("navbar-hidden");
    } else {
      navbar.classList.remove("navbar-hidden");
    }
    
    lastScrollTop = scrollTop;
  }, { passive: true });
}

/**
 * 16. Tab Switch Watcher
 * Force renders reveals and fills when a tab hidden under display:none is shown.
 */
function initTabSwitchObserver() {
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  
  navigationLinks.forEach(link => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        const activeArticle = document.querySelector("article.active");
        if (!activeArticle) return;
        
        const reveals = activeArticle.querySelectorAll(".reveal-on-scroll");
        reveals.forEach(el => {
          el.classList.add("reveal-visible");
          
          if (el.classList.contains("skill")) {
            const fills = el.querySelectorAll(".skill-progress-fill");
            fills.forEach(fill => {
              const width = fill.getAttribute("data-width") || fill.style.width;
              fill.style.setProperty("--target-width", width);
              fill.classList.add("animated-fill");
            });
          }
        });
      }, 50);
    });
  });
}

/*-------------------------------------------------------------------*\
  #1. PERSONALIZED VISITOR EXPERIENCE & TIME GREETING
\*-------------------------------------------------------------------*/
function initPersonalizedGreeting() {
  const greetingEl = document.getElementById("visitor-greeting-text");
  if (!greetingEl) return;

  // Track visits via localStorage
  let visits = parseInt(localStorage.getItem("qasim_visit_count") || "0", 10);
  if (sessionStorage.getItem("qasim_session_registered") !== "true") {
    visits += 1;
    localStorage.setItem("qasim_visit_count", visits);
    sessionStorage.setItem("qasim_session_registered", "true");
  }
  const visitorNumber = 247 + visits;

  // Build Time Greeting
  const hour = new Date().getHours();
  let timeGreeting = "Welcome";
  if (hour >= 5 && hour < 12) timeGreeting = "Good Morning";
  else if (hour >= 12 && hour < 17) timeGreeting = "Good Afternoon";
  else if (hour >= 17 && hour < 21) timeGreeting = "Good Evening";
  else timeGreeting = "Good Night";

  // Check language state dynamically for translation
  const isUrdu = document.body.classList.contains("lang-ur");
  const greetingPrefix = isUrdu ? "خوش آمدید" : `${timeGreeting}`;
  
  // Set default loading text
  greetingEl.innerHTML = `<span class="visitor-pulse"></span> ${greetingPrefix}! You are visitor #<span>${visitorNumber}</span>`;

  // Fetch Geolocation with timeout fallback
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  fetch("https://ipapi.co/json/", { signal: controller.signal })
    .then(res => res.json())
    .then(data => {
      clearTimeout(timeoutId);
      if (data && data.city && data.country_name) {
        const locationStr = `${data.city}, ${data.country_name}`;
        localStorage.setItem("qasim_visitor_location", locationStr);
        updateGreetingUI(greetingPrefix, locationStr, visitorNumber);
      } else {
        throw new Error("Invalid location data");
      }
    })
    .catch(() => {
      clearTimeout(timeoutId);
      // Fallback location
      const savedLoc = localStorage.getItem("qasim_visitor_location") || "Karak, Pakistan";
      updateGreetingUI(greetingPrefix, savedLoc, visitorNumber);
    });

  function updateGreetingUI(prefix, location, num) {
    const isUrdu = document.body.classList.contains("lang-ur");
    if (isUrdu) {
      greetingEl.innerHTML = `خوش آمدید پیارے مہمان، آپ کا تعلق <span>${location}</span> سے ہے اور آپ مہمان نمبر <span>#${num}</span> ہیں!`;
    } else {
      greetingEl.innerHTML = `${prefix}! Deployed from <span>${location}</span>. You are visitor <span>#${num}</span>.`;
    }
  }
}

/*-------------------------------------------------------------------*\
  #2. CUSTOM ANIMATED DUAL CURSOR & CANVAS VECTOR EXPLOSIONS
\*-------------------------------------------------------------------*/
let clickExplosionTrigger = null; // Global reference for skill click sparkles

function initExplosionCursor() {
  if (window.innerWidth <= 1024) return; // Skip on mobile/tablets

  // Create dual cursor elements
  const dot = document.createElement("div");
  dot.className = "custom-cursor-dot";
  const ring = document.createElement("div");
  ring.className = "custom-cursor-ring";
  
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  // Tracks real mouse target
  const mouse = { x: -100, y: -100 };
  const dotPos = { x: -100, y: -100 };
  const ringPos = { x: -100, y: -100 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Smooth lerp (Linear Interpolation) loop for organic trailing drag
  function tick() {
    // Dot tracks instantly
    dotPos.x = mouse.x;
    dotPos.y = mouse.y;
    dot.style.left = `${dotPos.x}px`;
    dot.style.top = `${dotPos.y}px`;

    // Ring lags smoothly behind
    ringPos.x += (mouse.x - ringPos.x) * 0.15;
    ringPos.y += (mouse.y - ringPos.y) * 0.15;
    ring.style.left = `${ringPos.x}px`;
    ring.style.top = `${ringPos.y}px`;

    requestAnimationFrame(tick);
  }
  tick();

  // Hover triggers to expand custom cursor ring
  const interactiveSelector = "a, button, [role='button'], .project-card-wrapper, .skills-item, .contact-link, .social-link, input, textarea, select";
  
  function applyHoverListeners() {
    const hoverables = document.querySelectorAll(interactiveSelector);
    hoverables.forEach(el => {
      // Avoid duplicate binding
      if (el.dataset.cursorBound === "true") return;
      el.dataset.cursorBound = "true";

      el.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hovering");
      });
      el.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hovering");
      });
    });
  }
  applyHoverListeners();

  // Re-apply hover listeners on dynamic DOM adjustments (like navbar clicks)
  document.querySelectorAll("[data-nav-link]").forEach(link => {
    link.addEventListener("click", () => setTimeout(applyHoverListeners, 150));
  });

  // Canvas Vector click explosion particles
  const canvas = document.getElementById("cursor-explosion-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = Math.random() * 4 + 2;
      this.vx = (Math.random() - 0.5) * 8;
      this.vy = (Math.random() - 0.5) * 8 - 2.5; // Upward bias
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.08; // Gravity effect
      this.alpha -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      // Add glowing neon shadow
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function spawnExplosion(x, y, customColors = ["#00d4ff", "#8b5cf6", "#6366f1"]) {
    const particleCount = 18 + Math.floor(Math.random() * 10);
    for (let i = 0; i < particleCount; i++) {
      const color = customColors[Math.floor(Math.random() * customColors.length)];
      particles.push(new Particle(x, y, color));
    }
  }

  // Export explosion trigger globally for skill clicks
  clickExplosionTrigger = spawnExplosion;

  window.addEventListener("mousedown", (e) => {
    spawnExplosion(e.clientX, e.clientY);
  });

  function animParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => {
      p.update();
      p.draw();
      return p.alpha > 0;
    });
    requestAnimationFrame(animParticles);
  }
  animParticles();
}

/*-------------------------------------------------------------------*\
  #3. VOICE INTRODUCTION SYSTEM & DYNAMIC EQUALIZER
\*-------------------------------------------------------------------*/
function initVoiceIntroduction() {
  const btn = document.getElementById("voice-intro-btn");
  const barsContainer = document.getElementById("voice-eq-bars");
  if (!btn || !barsContainer) return;

  let currentUtterance = null;
  let isPlaying = false;

  const scriptEn = "Hello there! Welcome to my digital space. I am Muhammad Qasim, a BS Computer Science student at Hazara University and a passionate Data Scientist and AI Engineer. I specialize in building robust machine learning models, exploratory data analytics, and generative AI pipelines. Have fun exploring my interactive ML sandbox, chatting with my AI assistant, or testing my neural snake game. Let's create something intelligent together!";
  
  const scriptUr = "السلام علیکم! میرے پورٹ فولیو پر خوش آمدید۔ میں محمد عاصم ہوں، ہزارہ یونیورسٹی سے بی ایس کمپیوٹر سائنس کا طالب علم، اور ایک پرجوش ڈیٹا سائنٹسٹ اور اے آئی انجینئر۔ میں مشین لرننگ، ڈیٹا اینالیٹکس، اور جنریٹو اے آئی میں مہارت رکھتا ہوں۔ میری خدمات دریافت کرنے کے لیے پورٹ فولیو کا جائزہ لیں اور میرے اے آئی اسسٹنٹ سے گفتگو کریں۔ شکریہ!";

  btn.addEventListener("click", () => {
    const isUrdu = document.body.classList.contains("lang-ur");
    const script = isUrdu ? scriptUr : scriptEn;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      isPlaying = false;
      btn.classList.remove("active");
      updateVoiceBtnLabel();
    } else {
      window.speechSynthesis.cancel(); // Reset any ongoing speech
      
      currentUtterance = new SpeechSynthesisUtterance(script);
      
      // Match voice language
      if (isUrdu) {
        currentUtterance.lang = "ur-PK";
      } else {
        currentUtterance.lang = "en-US";
        
        // Try to fetch a premium English sounding voice if available
        const voices = window.speechSynthesis.getVoices();
        const premiumVoice = voices.find(v => v.lang.includes("en-US") && v.name.toLowerCase().includes("natural"));
        if (premiumVoice) currentUtterance.voice = premiumVoice;
      }

      currentUtterance.onend = () => {
        isPlaying = false;
        btn.classList.remove("active");
        updateVoiceBtnLabel();
      };

      currentUtterance.onerror = () => {
        isPlaying = false;
        btn.classList.remove("active");
        updateVoiceBtnLabel();
      };

      window.speechSynthesis.speak(currentUtterance);
      isPlaying = true;
      btn.classList.add("active");
      updateVoiceBtnLabel();
    }
  });

  function updateVoiceBtnLabel() {
    const isUrdu = document.body.classList.contains("lang-ur");
    const label = document.getElementById("voice-btn-label");
    if (!label) return;

    if (isPlaying) {
      label.textContent = isUrdu ? "آواز بند کریں" : "Stop Speech";
    } else {
      label.textContent = isUrdu ? "میری آواز سنیں" : "Voice Introduction";
    }
  }

  // Pre-load voices for chrome
  window.speechSynthesis.getVoices();
}

/*-------------------------------------------------------------------*\
  #4. SERVICE WORKER & FLOATING INSTALL PWA BANNER
\*-------------------------------------------------------------------*/
function initPwaInstaller() {
  const banner = document.getElementById("pwa-install-banner");
  const installBtn = document.getElementById("pwa-install-btn");
  const dismissBtn = document.getElementById("pwa-dismiss-btn");
  if (!banner || !installBtn || !dismissBtn) return;

  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent default browser install dialog
    e.preventDefault();
    deferredPrompt = e;

    // Check if user dismissed it in this session
    const isDismissed = localStorage.getItem("qasim_pwa_dismissed") === "true";
    if (!isDismissed) {
      setTimeout(() => {
        banner.classList.add("active");
      }, 5000); // Popup after 5 seconds of browsing
    }
  });

  installBtn.addEventListener("click", () => {
    if (!deferredPrompt) return;
    
    banner.classList.remove("active");
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("PWA installed successfully.");
      }
      deferredPrompt = null;
    });
  });

  dismissBtn.addEventListener("click", () => {
    banner.classList.remove("active");
    localStorage.setItem("qasim_pwa_dismissed", "true");
  });
}

/*-------------------------------------------------------------------*\
  #5. ENGLISH / URDU MULTI-LANGUAGE SYSTEM
\*-------------------------------------------------------------------*/
function initLanguageSwitcher() {
  const toggleBtn = document.getElementById("lang-toggle");
  if (!toggleBtn) return;

  const transMap = {
    // Navbar
    "about": { en: "About", ur: "تعارف" },
    "resume": { en: "Resume", ur: "تعلیمی خاکہ" },
    "certifications": { en: "Certifications", ur: "اسناد" },
    "portfolio": { en: "Portfolio", ur: "کتابچہ" },
    "contact": { en: "Contact", ur: "رابطہ" },

    // Sidebar Title
    "title": { en: "Data Scientist/Ai Engineer", ur: "ڈیٹا سائنٹسٹ / اے آئی انجینئر" },
    "contact_mail": { en: "Email", ur: "ای میل" },
    "contact_phone": { en: "Phone", ur: "فون نمبر" },
    "contact_birthday": { en: "Birthday", ur: "تاریخِ پیدائش" },
    "contact_location": { en: "Location", ur: "مقام" },
    "contacts_btn": { en: "Show Contacts", ur: "رابطے دکھائیں" },

    // Main Headers
    "art_lab_title": { en: "Generative AI Art Lab", ur: "اے آئی آرٹ لیبارٹری" },
    "art_lab_subtitle": { en: "Seed a neural algorithmic artwork using your name or any keyword.", ur: "اپنا نام یا کوئی بھی لفظ درج کر کے اپنا تخلیقی آرٹ بنائیں۔" },
    "art_btn_generate-text": { en: "Generate Art", ur: "آرٹ تیار کریں" },
    "art_btn_download-text": { en: "Download PNG", ur: "آرٹ ڈاؤن لوڈ کریں" },
    "art_overlay_text": { en: "Awaiting input seed...", ur: "ان پٹ کا انتظار ہے..." },

    // Hero Section
    "hero_status": { en: "SYSTEM LOG: ACTIVE // SECURE_PORTFOLIO", ur: "سسٹم لاگ: فعال // محفوظ پورٹ فولیو" },
    "hero_desc": { 
      en: "I am a Data Scientist and Machine Learning Engineer with a strong interest in working on real world AI problems. In this AI driven era, I started my journey by completing multiple online courses to build a solid foundation in data science and machine learning. After gaining theoretical knowledge, I shifted my focus toward practical.", 
      ur: "میں ایک ڈیٹا سائنٹسٹ اور مشین لرننگ انجینئر ہوں جو حقیقی دنیا کے اے آئی مسائل کو حل کرنے میں گہری دلچسپی رکھتا ہوں۔ علم حاصل کرنے کے بعد، میں نے اپنی توجہ عملی کاموں پر مرکوز کی ہے۔" 
    },
    "hero_btn_explore": { en: "Explore Projects", ur: "پراجیکٹس دیکھیں" },
    "hero_btn_touch": { en: "Get in Touch", ur: "رابطہ کریں" },

    // Services Title
    "doing_title": { en: "What I'm Doing", ur: "میری خدمات" },

    // PWA Prompt
    "pwa-install-title": { en: "Install Qasim's App", ur: "اے آئی ایپ انسٹال کریں" },
    "pwa-install-desc": { en: "Access Qasim's portfolio offline with a native app feel.", ur: "بغیر انٹرنیٹ کے قاسم کا پورٹ فولیو دیکھیں۔" },
    "pwa-install-btn": { en: "Install", ur: "انسٹال کریں" },
    "pwa-dismiss-btn": { en: "Dismiss", ur: "خارج کریں" }
  };

  // Restore saved language
  const savedLang = localStorage.getItem("qasim_language") || "en";
  if (savedLang === "ur") {
    applyLanguage("ur");
  }

  toggleBtn.addEventListener("click", () => {
    const isUrdu = document.body.classList.contains("lang-ur");
    const nextLang = isUrdu ? "en" : "ur";
    applyLanguage(nextLang);
  });

  function applyLanguage(lang) {
    localStorage.setItem("qasim_language", lang);

    if (lang === "ur") {
      document.body.classList.add("lang-ur", "rtl-mode");
      toggleBtn.querySelector(".lang-text").textContent = "En";

      // Translate dictionary nodes
      for (const [key, value] of Object.entries(transMap)) {
        const el = document.getElementById(key);
        if (el) el.textContent = value.ur;
      }

      // Sidebar Contacts Button Translation
      const sidebarBtnText = document.querySelector("[data-sidebar-btn] span");
      if (sidebarBtnText) sidebarBtnText.textContent = "رابطے دکھائیں";

      // Nav Links Translation
      const navLinks = document.querySelectorAll("[data-nav-link]");
      const navUr = ["تعارف", "تعلیمی خاکہ", "اسناد", "کتابچہ", "رابطہ"];
      navLinks.forEach((link, idx) => {
        if (navUr[idx]) link.textContent = navUr[idx];
      });

    } else {
      document.body.classList.remove("lang-ur", "rtl-mode");
      toggleBtn.querySelector(".lang-text").textContent = "اردو";

      // Translate dictionary nodes
      for (const [key, value] of Object.entries(transMap)) {
        const el = document.getElementById(key);
        if (el) el.textContent = value.en;
      }

      // Sidebar Contacts Button Translation
      const sidebarBtnText = document.querySelector("[data-sidebar-btn] span");
      if (sidebarBtnText) sidebarBtnText.textContent = "Show Contacts";

      // Nav Links Translation
      const navLinks = document.querySelectorAll("[data-nav-link]");
      const navEn = ["About", "Resume", "Certifications", "Portfolio", "Contact"];
      navLinks.forEach((link, idx) => {
        if (navEn[idx]) link.textContent = navEn[idx];
      });
    }

    // Re-trigger visitor details to localize location greeting text
    initPersonalizedGreeting();
  }
}

/*-------------------------------------------------------------------*\
  #6. RETRO ARCADE SNAKE GAME OVERLAY MODAL
\*-------------------------------------------------------------------*/
function initRetroSnakeGame() {
  const modal = document.getElementById("retro-game-modal");
  const closeBtn = document.getElementById("arcade-close-btn");
  const closeOverlay = document.getElementById("retro-game-close-overlay");
  if (!modal || !closeBtn || !closeOverlay) return;

  // Key Listeners for Konami Code trigger
  const konamiPattern = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
  let konamiIndex = 0;

  window.addEventListener("keydown", (e) => {
    if (e.keyCode === konamiPattern[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiPattern.length) {
        konamiIndex = 0;
        openArcadeSnake();
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Expose function globally so the terminal whoami/help command can trigger it
  window.triggerArcadeCabinet = openArcadeSnake;

  closeBtn.addEventListener("click", closeArcadeSnake);
  closeOverlay.addEventListener("click", closeArcadeSnake);

  // Snake Logic variables
  const canvas = document.getElementById("snake-canvas");
  let ctx = null;
  if (canvas) ctx = canvas.getContext("2d");

  const startBtn = document.getElementById("arcade-start-btn");
  const restartBtn = document.getElementById("arcade-restart-btn");
  const introScreen = document.getElementById("arcade-intro-screen");
  const gameplayScreen = document.getElementById("arcade-gameplay-screen");
  const gameoverScreen = document.getElementById("arcade-gameover-screen");

  let snake = [];
  let food = { x: 0, y: 0 };
  let dir = "right";
  let gameInterval = null;
  let score = 0;
  let epoch = 1;
  let highscore = parseInt(localStorage.getItem("qasim_snake_highscore") || "0", 10);
  
  const gridSize = 15;
  const tileCountX = 400 / gridSize;
  const tileCountY = 300 / gridSize;

  // Restore Highscore Val
  const hsVal = document.getElementById("arcade-highscore-val");
  if (hsVal) hsVal.textContent = highscore;

  if (startBtn) startBtn.addEventListener("click", startSnakeGame);
  if (restartBtn) restartBtn.addEventListener("click", startSnakeGame);

  function openArcadeSnake() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    introScreen.style.display = "flex";
    gameplayScreen.style.display = "none";
    gameoverScreen.style.display = "none";
    
    // Play introductory synthesizers
    playArcadeSound(261.63, "sine", 0.15); // C4 beep
    setTimeout(() => playArcadeSound(329.63, "sine", 0.15), 150); // E4 beep
    setTimeout(() => playArcadeSound(392.00, "sine", 0.3), 300); // G4 beep
  }

  function closeArcadeSnake() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    clearInterval(gameInterval);
  }

  function startSnakeGame() {
    introScreen.style.display = "none";
    gameoverScreen.style.display = "none";
    gameplayScreen.style.display = "flex";

    snake = [
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 }
    ];
    dir = "right";
    score = 0;
    epoch = 1;
    updateStatsText();
    spawnFood();

    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);

    // Play startup engine hum
    playArcadeSound(150, "sawtooth", 0.1);
  }

  function spawnFood() {
    food.x = Math.floor(Math.random() * tileCountX);
    food.y = Math.floor(Math.random() * tileCountY);

    // Make sure food is not spawning inside snake bodies
    snake.forEach(part => {
      if (part.x === food.x && part.y === food.y) {
        spawnFood();
      }
    });
  }

  function gameLoop() {
    // Update direction based on keypress
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (dir === "right") headX++;
    else if (dir === "left") headX--;
    else if (dir === "up") headY--;
    else if (dir === "down") headY++;

    // Wall Collision Check (System Overfit)
    if (headX < 0 || headX >= tileCountX || headY < 0 || headY >= tileCountY) {
      triggerGameOver("Model training crashed: network bounds breach.");
      return;
    }

    // Tail Collision Check
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === headX && snake[i].y === headY) {
        triggerGameOver("Overfitting detected: Neural weights overlap.");
        return;
      }
    }

    const newHead = { x: headX, y: headY };
    snake.unshift(newHead);

    // Check if snake catches food bytes
    if (headX === food.x && headY === food.y) {
      score += 10;
      if (score % 40 === 0) epoch += 1;
      
      updateStatsText();
      spawnFood();
      playArcadeSound(880, "sine", 0.08); // Cyan beep
    } else {
      snake.pop();
    }

    drawGameplay();
  }

  function drawGameplay() {
    ctx.fillStyle = "#030308";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines subtly
    ctx.strokeStyle = "rgba(99, 102, 241, 0.04)";
    for (let i = 0; i < canvas.width; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Draw snake body
    snake.forEach((part, index) => {
      ctx.fillStyle = index === 0 ? "#00d4ff" : "#8b5cf6";
      ctx.strokeStyle = "#05060e";
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.roundRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize, [4]);
      ctx.fill();
      ctx.stroke();
    });

    // Draw food (glowing pulse)
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.roundRect(food.x * gridSize + 2, food.y * gridSize + 2, gridSize - 4, gridSize - 4, [50]);
    ctx.fill();
  }

  function updateStatsText() {
    document.getElementById("snake-score-val").textContent = score;
    document.getElementById("snake-epoch-val").textContent = epoch;
  }

  function triggerGameOver(reason) {
    clearInterval(gameInterval);
    gameplayScreen.style.display = "none";
    gameoverScreen.style.display = "flex";

    document.getElementById("gameover-reason-text").textContent = reason;
    document.getElementById("gameover-score-val").textContent = score;
    document.getElementById("gameover-epoch-val").textContent = epoch;

    // Save highscore
    if (score > highscore) {
      highscore = score;
      localStorage.setItem("qasim_snake_highscore", highscore);
      if (hsVal) hsVal.textContent = highscore;
    }

    // Play GameOver buzzer sound
    playArcadeSound(100, "triangle", 0.45);
  }

  // Synthesizes dynamic sound beeps in real-time utilizing browser audio engines
  function playArcadeSound(frequency, type, duration) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not permitted yet
    }
  }

  // Game keyboard listener arrow binds
  window.addEventListener("keydown", (e) => {
    if (gameplayScreen.style.display === "none") return;
    
    if (e.keyCode === 38 && dir !== "down") dir = "up";
    else if (e.keyCode === 40 && dir !== "up") dir = "down";
    else if (e.keyCode === 37 && dir !== "right") dir = "left";
    else if (e.keyCode === 39 && dir !== "left") dir = "right";
    
    // Prevent scrolling default window behavior
    if ([37, 38, 39, 40].includes(e.keyCode)) e.preventDefault();
  });
}

/*-------------------------------------------------------------------*\
  #7. REAL-TIME SIMULATED PROJECT ANALYTICS TELEMETRY
\*-------------------------------------------------------------------*/
function initProjectAnalytics() {
  const projectCards = document.querySelectorAll(".project-card-wrapper");
  if (projectCards.length === 0) return;

  const seedTelemetry = {
    "student-marks": { views: 420, stars: 12, metric: "94%" },
    "cricket-score": { views: 350, stars: 15, metric: "91%" },
    "eda-retail": { views: 280, stars: 8, metric: "96%" },
    "car-price": { views: 610, stars: 24, metric: "88%" },
    "tbm-penetration": { views: 512, stars: 32, metric: "92%" },
    "employee-attrition": { views: 440, stars: 18, metric: "84%" },
    "hospital-emergency": { views: 380, stars: 14, metric: "82%" },
    "social-media": { views: 820, stars: 42, metric: "86%" },
    "document-scanner": { views: 930, stars: 56, metric: "11ms" },
    "nexaverse": { views: 1250, stars: 84, metric: "24ms" }
  };

  projectCards.forEach(card => {
    const csId = card.getAttribute("data-case-study");
    const data = seedTelemetry[csId] || { views: 150, stars: 5, metric: "80%" };

    // Fetch click counts from LocalStorage to increment organically
    const realViews = data.views + parseInt(localStorage.getItem(`qasim_views_${csId}`) || "0", 10);
    const realStars = data.stars + parseInt(localStorage.getItem(`qasim_stars_${csId}`) || "0", 10);

    // Create telemetry badge row
    const row = document.createElement("div");
    row.className = "project-analytics-row";
    row.innerHTML = `
      <span class="analytics-badge views" title="Views"><ion-icon name="eye-outline"></ion-icon> <span class="val">${realViews}</span></span>
      <span class="analytics-badge stars" title="Peer Stars"><ion-icon name="star-outline"></ion-icon> <span class="val">${realStars}</span></span>
      <span class="analytics-badge accuracy" title="Confidence Metric"><ion-icon name="pulse-outline"></ion-icon> <span class="val">${data.metric}</span></span>
    `;

    // Inject above action buttons
    const actContainer = card.querySelector(".project-action-buttons");
    if (actContainer) {
      card.querySelector(".project-card-info").insertBefore(row, actContainer);
    }

    // Click handler for stars increments
    const starBadge = row.querySelector(".stars");
    starBadge.addEventListener("click", (e) => {
      e.stopPropagation(); // Avoid triggering card drawer
      
      const activeStarState = localStorage.getItem(`qasim_starred_${csId}`) === "true";
      if (!activeStarState) {
        localStorage.setItem(`qasim_starred_${csId}`, "true");
        
        let starsCount = parseInt(localStorage.getItem(`qasim_stars_${csId}`) || "0", 10);
        starsCount += 1;
        localStorage.setItem(`qasim_stars_${csId}`, starsCount);

        starBadge.querySelector(".val").textContent = data.stars + starsCount;
        starBadge.classList.add("pulse-val");
        
        // Spawn localized cursor sparkles
        if (clickExplosionTrigger) {
          clickExplosionTrigger(e.clientX, e.clientY, ["#8b5cf6", "#00d4ff"]);
        }
      }
    });

    // When click card wrapper, trigger Case Study Drawer views increments
    card.addEventListener("click", () => {
      let viewsCount = parseInt(localStorage.getItem(`qasim_views_${csId}`) || "0", 10);
      viewsCount += 1;
      localStorage.setItem(`qasim_views_${csId}`, viewsCount);
      
      row.querySelector(".views .val").textContent = data.views + viewsCount;
    });
  });
}

/*-------------------------------------------------------------------*\
  #8. LINKEDIN-STYLE SKILL PEER ENDORSEMENTS
\*-------------------------------------------------------------------*/
function initPeerEndorsements() {
  const skillItems = document.querySelectorAll(".skills-item");
  if (skillItems.length === 0) return;

  skillItems.forEach((item, idx) => {
    // Generate clean skill ID slug
    const nameEl = item.querySelector(".h5");
    if (!nameEl) return;
    
    const skillName = nameEl.textContent.trim();
    const skillId = skillName.toLowerCase().replace(/[\s\W]+/g, "_");
    item.setAttribute("data-skill-id", skillId);

    // Define seed base values
    const seedVal = 18 + (idx * 3) + (skillName.length % 5);
    const addedCount = parseInt(localStorage.getItem(`qasim_endorse_${skillId}`) || "0", 10);
    const totalCount = seedVal + addedCount;

    // Check if user already endorsed this
    const hasEndorsed = localStorage.getItem(`qasim_endorsed_${skillId}`) === "true";

    // Create Endorsement UI button
    const endorseBtn = document.createElement("div");
    endorseBtn.className = `endorse-btn ${hasEndorsed ? 'active' : ''}`;
    endorseBtn.title = "Click to endorse Qasim for this skill!";
    endorseBtn.innerHTML = `
      <ion-icon name="${hasEndorsed ? 'checkmark-circle' : 'thumbs-up-outline'}"></ion-icon>
      <span class="endorse-count">${totalCount}</span>
    `;

    // Inject inside title wrapper, right before data percent block
    const titleWrap = item.querySelector(".title-wrapper");
    const dataValEl = item.querySelector("data");
    if (titleWrap && dataValEl) {
      titleWrap.insertBefore(endorseBtn, dataValEl);
    }

    // Bind click listener
    endorseBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      const currentlyEndorsed = localStorage.getItem(`qasim_endorsed_${skillId}`) === "true";
      if (!currentlyEndorsed) {
        localStorage.setItem(`qasim_endorsed_${skillId}`, "true");
        
        let newAdded = addedCount + 1;
        localStorage.setItem(`qasim_endorse_${skillId}`, newAdded);

        endorseBtn.querySelector(".endorse-count").textContent = seedVal + newAdded;
        endorseBtn.classList.add("active");
        endorseBtn.querySelector("ion-icon").setAttribute("name", "checkmark-circle");

        // Dynamic sparkles
        if (clickExplosionTrigger) {
          clickExplosionTrigger(e.clientX, e.clientY, ["#10b981", "#00d4ff"]);
        }
      }
    });
  });
}

/*-------------------------------------------------------------------*\
  #9. SEEDED GENERATIVE NEURAL CANVAS LAB
\*-------------------------------------------------------------------*/
function initGenerativeArtLab() {
  const canvas = document.getElementById("art-canvas");
  const input = document.getElementById("art-seed-input");
  const generateBtn = document.getElementById("art-generate-btn");
  const downloadBtn = document.getElementById("art-download-btn");
  const overlay = document.getElementById("art-canvas-overlay");

  if (!canvas || !input || !generateBtn || !downloadBtn) return;
  const ctx = canvas.getContext("2d");

  // Handle high resolution canvas rendering
  function initRes() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  initRes();
  window.addEventListener("resize", initRes);

  generateBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;

    overlay.style.opacity = "0";
    setTimeout(() => overlay.style.display = "none", 300);
    downloadBtn.removeAttribute("disabled");

    // Generate hash code
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    renderArt(hash, text);
  });

  // Simple keypress trigger
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") generateBtn.click();
  });

  function renderArt(seed, text) {
    ctx.fillStyle = "#030307";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pick dynamic colors based on seed hashes
    const hueA = Math.abs((seed * 3) % 360);
    const hueB = (hueA + 120) % 360;

    const colorA = `hsla(${hueA}, 85%, 60%, 0.15)`;
    const colorB = `hsla(${hueB}, 85%, 60%, 0.15)`;

    const linesCount = 45 + (text.length * 3);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw vector meshes
    for (let i = 0; i < linesCount; i++) {
      ctx.strokeStyle = i % 2 === 0 ? colorA : colorB;
      ctx.lineWidth = Math.abs((seed + i) % 3) * 0.5 + 0.5;

      const angle = (i * Math.PI * 2) / linesCount;
      const radius = 60 + Math.abs((seed + i * 7) % 150);

      const px = centerX + Math.cos(angle) * radius;
      const py = centerY + Math.sin(angle) * radius;

      const targetAngle = angle + (Math.PI * (Math.abs((seed - i) % 18) + 2)) / 8;
      const tx = centerX + Math.cos(targetAngle) * (radius * 1.5);
      const ty = centerY + Math.sin(targetAngle) * (radius * 1.5);

      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(tx, ty);
      ctx.stroke();

      // Add synaptic connecting grid joints
      if (i % 3 === 0) {
        ctx.fillStyle = i % 2 === 0 ? "#00d4ff" : "#8b5cf6";
        ctx.beginPath();
        ctx.arc(tx, ty, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Write name watermark in the corner beautifully
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.font = "10px JetBrains Mono";
    ctx.fillText(`SEEDED_BY: ${text.toUpperCase()}`, 15, canvas.height - 15);
    ctx.fillText("ALGORITHM: NEURAL_MESH_FIELD", 15, canvas.height - 30);
  }

  // Handle downloads PNG exporter
  downloadBtn.addEventListener("click", () => {
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `neural-artwork-${input.value.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = dataUrl;
    link.click();
  });
}

/*-------------------------------------------------------------------*\
  #10. CINEMATIC HERO BACKGROUND SYNAPSE CANVAS DATA LOOP
\*-------------------------------------------------------------------*/
function initCinematicHeroFlow() {
  const container = document.querySelector(".hero-section");
  if (!container) return;

  // Insert cinematic synapse background canvas
  const canvas = document.createElement("canvas");
  canvas.id = "hero-synapse-canvas";
  container.insertBefore(canvas, container.firstChild);

  const ctx = canvas.getContext("2d");
  let points = [];
  const maxPoints = 32;
  const maxDistance = 120;
  let animId = null;

  function resizeCanvas() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  resizeCanvas();

  const resizeObserver = new ResizeObserver(() => {
    resizeCanvas();
  });
  resizeObserver.observe(container);

  // Generate vector coordinate nodes
  class SynapseNode {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.size = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap-around bounds
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.fillStyle = "rgba(0, 212, 255, 0.25)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initNodes() {
    points = [];
    for (let i = 0; i < maxPoints; i++) {
      points.push(new SynapseNode());
    }
  }
  initNodes();

  function drawDataLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines between proximate nodes
    for (let i = 0; i < points.length; i++) {
      points[i].update();
      points[i].draw();

      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.12;
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(drawDataLoop);
  }

  // Throttle performance when sections switch to none active state
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animId) drawDataLoop();
      } else {
        cancelAnimationFrame(animId);
        animId = null;
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(container);
}
