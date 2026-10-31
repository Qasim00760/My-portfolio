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
    tech: ["Python", "Pandas", "Matplotlib"],
    image: "assets/images/STUDENT MARKS ANALAYSIS.png",
    github: "https://github.com/Qasim00760/Mentorship-Program-Devsil",
    live: ""
  },
  {
    title: "Cricket Score Analysis",
    category: "data-analytics",
    description: "Explores match data through run rates, wicket trends and strike patterns, with run-curve charts for each game situation.",
    tech: ["Python", "NumPy", "Seaborn"],
    image: "assets/images/CRICKET  SCORE ANALYSIS.png",
    github: "https://github.com/Qasim00760/Mentorship-Program-Devsil",
    live: ""
  },
  {
    title: "Exploratory Data Analysis (Retail)",
    category: "data-analytics",
    description: "Cleans a retail transactions dataset, removes outliers and maps regional revenue and customer segments.",
    tech: ["Python", "EDA", "Retail"],
    image: "assets/images/exploratory data.png",
    github: "https://github.com/Qasim00760/Mentorship-Program-Devsil",
    live: ""
  },
  {
    title: "Hospital Emergency Room Performance & Prediction",
    category: "data-analytics",
    description: "Studies emergency room admissions and wait times, and forecasts patient load to help plan staffing.",
    tech: ["Scikit-Learn", "Pandas", "Healthcare AI"],
    image: "assets/images/Hospital Emergency_Room_Performance & Prediction_Project.png",
    github: "https://github.com/Qasim00760/Mentorship-Program-Devsil",
    live: ""
  },

  // ---- Machine Learning ----
  {
    title: "Car Price Prediction",
    category: "machine-learning",
    description: "Regression models that estimate a fair price for used cars from features like mileage, year and specifications.",
    tech: ["Scikit-Learn", "Regression", "Python"],
    image: "assets/images/car price prediction.png",
    github: "https://github.com/Qasim00760/Mentorship-Program-Devsil",
    live: ""
  },
  {
    title: "Machine Learning for TBM Penetration Prediction",
    category: "machine-learning",
    description: "A Random Forest model that predicts tunnel boring machine penetration rates from machine sensor and rock data.",
    tech: ["Random Forest", "Predictive", "Python"],
    image: "assets/images/Machine Learning For TBM Penetration Prediction.png",
    github: "https://github.com/Qasim00760/Mentorship-Program-Devsil",
    live: ""
  },
  {
    title: "Employee Attrition Prediction",
    category: "machine-learning",
    description: "An XGBoost classifier that flags employees at risk of leaving and explains the factors behind each prediction.",
    tech: ["XGBoost", "Classification", "Analytics"],
    image: "assets/images/Neematte Media Corp.png",
    github: "https://github.com/Qasim00760/Mentorship-Program-Devsil",
    live: ""
  },
  {
    title: "Advanced Social Media Engagement Prediction",
    category: "machine-learning",
    description: "Uses NLP features and a neural network to predict how much engagement a social media post will get.",
    tech: ["Deep Learning", "NLP", "Python"],
    image: "assets/images/Advance_social_media.png",
    github: "https://github.com/Qasim00760/Mentorship-Program-Devsil",
    live: ""
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
