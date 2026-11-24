/*
 * Portfolio projects - the Work section is built from this list.
 *
 * To add a project, copy one entry below, paste it into the array and edit it:
 *   title       - project name
 *   category    - one of: "data-analytics", "machine-learning", "computer-vision",
 *                 "generative-ai", "ai-agents", "ai-automation"
 *                 (this decides which tab the project shows up under)
 *   description - one sentence about what it does
 *   tech        - list of tools/tags, e.g. ["Python", "LangChain"]
 *   image       - path to a screenshot in assets/images/
 *   github      - repository URL, or "" if none
 *   live        - live demo URL, or "" if none
 *
 * Tabs with no projects show a "Projects coming soon" message automatically.
 */
window.PROJECTS = [
  // ---- Data Analytics ----
  {
    title: "Student Marks Analysis",
    category: "data-analytics",
    description: "Analyzes student scores to find the subjects with the widest grade spread and visualizes how marks are distributed.",
    tech: ["Python", "Pandas", "Matplotlib", "Streamlit"],
    image: "assets/images/student-marks-analysis.jpg?v=2",
    github: "https://github.com/Qasim00760/student-marks-analysis",
    live: "https://mq-student-marks-analysis.streamlit.app/"
  },
  {
    title: "Cricket Score Analysis",
    category: "data-analytics",
    description: "Explores match data through run rates, wicket trends and strike patterns, with run-curve charts for each game situation.",
    tech: ["Python", "Pandas", "Seaborn", "Streamlit"],
    image: "assets/images/cricket-score-analysis.jpg?v=2",
    github: "https://github.com/Qasim00760/cricket-score-analysis",
    live: "https://mq-cricket-score-analysis.streamlit.app/"
  },
  {
    title: "Walmart Retail Sales EDA",
    category: "data-analytics",
    description: "Explores 421k weekly sales records from 45 Walmart stores to measure holiday peaks, store size effects and which factors actually drive sales.",
    tech: ["Python", "Pandas", "Seaborn", "SciPy", "Streamlit"],
    image: "assets/images/walmart-retail-sales-eda.jpg?v=2",
    github: "https://github.com/Qasim00760/walmart-retail-sales-eda",
    live: "https://mq-walmart-retail-sales-eda.streamlit.app/"
  },
  {
    title: "ER Wait Time Analysis & Prediction",
    category: "data-analytics",
    description: "Analyzes 5,000 emergency room visits to find what drives patient waits, and predicts a new patient's wait at arrival with a leakage-free Gradient Boosting model (R2 0.94).",
    tech: ["Scikit-Learn", "Pandas", "Seaborn", "Streamlit"],
    image: "assets/images/Hospital Emergency_Room_Performance & Prediction_Project.png",
    github: "https://github.com/Qasim00760/er-wait-time-prediction",
    live: "https://mq-er-wait-time-prediction.streamlit.app/"
  },

  // ---- Machine Learning ----
  {
    title: "UK Used Car Price Prediction",
    category: "machine-learning",
    description: "Gradient Boosting model trained on 96k UK used car listings that prices a car from its make, model, age, mileage and specs to within 6.6% on average (R2 0.97).",
    tech: ["Scikit-Learn", "Gradient Boosting", "Pandas", "Streamlit"],
    image: "assets/images/car price prediction.png",
    github: "https://github.com/Qasim00760/car-price-prediction",
    live: "https://mq-car-price-prediction.streamlit.app/"
  },
  {
    title: "TBM Penetration Prediction",
    category: "machine-learning",
    description: "Predicts a tunnel boring machine's next-stroke penetration from thrust, torque, RPM, rock quality and recent strokes, validated on unseen tunnel sections, and flags slow strokes ahead of time.",
    tech: ["Random Forest", "Scikit-Learn", "Pandas", "Streamlit"],
    image: "assets/images/Machine Learning For TBM Penetration Prediction.png",
    github: "https://github.com/Qasim00760/tbm-penetration-prediction",
    live: "https://mq-tbm-penetration-prediction.streamlit.app/"
  },
  {
    title: "Employee Attrition Prediction",
    category: "machine-learning",
    description: "Scores each employee's risk of leaving and explains the score. Logistic Regression beat Random Forest and XGBoost in cross-validation (ROC-AUC 0.83) and catches 74% of leavers.",
    tech: ["Scikit-Learn", "XGBoost", "Classification", "Streamlit"],
    image: "assets/images/employee-attrition-prediction.png",
    github: "https://github.com/Qasim00760/employee-attrition-prediction",
    live: "https://mq-employee-attrition-prediction.streamlit.app/"
  },
  {
    title: "Social Media Shares Prediction",
    category: "machine-learning",
    description: "Scores a news article's chance of going popular on social media before it is published, trained on 39k real Mashable articles and tested on newer ones (ROC-AUC 0.74).",
    tech: ["Gradient Boosting", "Scikit-Learn", "Pandas", "Streamlit"],
    image: "assets/images/Advance_social_media.png",
    github: "https://github.com/Qasim00760/social-media-shares-prediction",
    live: "https://mq-social-media-shares-prediction.streamlit.app/"
  },

  // ---- Computer Vision ----
  {
    title: "Document Scanner",
    category: "computer-vision",
    description: "Detects page edges in a photo, straightens the perspective and cleans up contrast to produce a flat scan.",
    tech: ["OpenCV", "Computer Vision", "Python"],
    image: "assets/images/Document_scanner.png",
    github: "https://github.com/Qasim00760/Document_Scanner_App",
    live: ""
  },
  {
    title: "Parking Space Occupancy Detector",
    category: "computer-vision",
    description: "Detects vehicles with YOLOv8 and marks each parking space as free, partially occupied or occupied in a Streamlit app.",
    tech: ["YOLOv8", "OpenCV", "Streamlit", "Python"],
    image: "assets/images/parking system.png",
    github: "https://github.com/Qasim00760/Parking-Space-Occupancy-Detector",
    live: "https://parking-space-occupancy-detector-4xb2wcyiexrjjahqsaxz46.streamlit.app/"
  },
  {
    title: "FYP AI Detection",
    category: "computer-vision",
    description: "An AI detection web app built with machine learning, with a live demo on Hugging Face Spaces.",
    tech: ["AI Detection", "Machine Learning", "Web App"],
    image: "assets/images/FYP-AI-Detection.png",
    github: "https://github.com/Qasim00760/FYP-AI-Detection-",
    live: "https://huggingface.co/spaces/qasimktk/ibscs-app"
  },
  {
    title: "Road Pothole Detection",
    category: "computer-vision",
    description: "A YOLO model that finds potholes in road images, served through a Streamlit web app.",
    tech: ["YOLO", "Computer Vision", "Streamlit"],
    image: "assets/images/Road_pethole_detection.png",
    github: "https://github.com/Qasim00760/road_pothole_detection",
    live: "https://roadpotholedetection-clragj4gnyy8v4jo2ojc68.streamlit.app/"
  },

  // ---- Generative AI ----
  {
    title: "NexaVerse",
    category: "generative-ai",
    description: "An LLM-powered assistant that uses AI agents to answer questions with context from your own data.",
    tech: ["Generative AI", "LLMs", "AI Agents"],
    image: "assets/images/NexaVerse.png",
    github: "https://github.com/Qasim00760/NexaVerse",
    live: ""
  }

  // ---- AI Agents / AI Automation ----
  // Add entries with category "ai-agents" or "ai-automation" here.
];
