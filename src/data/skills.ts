export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Langages",
    icon: "Code2",
    color: "primary",
    skills: [
      { name: "Python", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 90 },
      { name: "SQL", level: 88 },
      { name: "R", level: 70 },
      { name: "Rust", level: 45 },
    ],
  },
  {
    name: "Data Science & ML",
    icon: "Brain",
    color: "accent-purple",
    skills: [
      { name: "Pandas / NumPy", level: 95 },
      { name: "Scikit-learn", level: 92 },
      { name: "PyTorch", level: 85 },
      { name: "TensorFlow", level: 80 },
      { name: "XGBoost / LightGBM", level: 88 },
      { name: "MLOps", level: 75 },
      { name: "SHAP", level: 80 },
      { name: "Feature Engineering", level: 82 },
    ],
  },
  {
    name: "AI & Generative AI",
    icon: "Sparkles",
    color: "accent-orange",
    skills: [
      { name: "OpenAI / GPT API", level: 85 },
      { name: "HuggingFace Transformers", level: 82 },
      { name: "LangChain / LLM Orchestration", level: 78 },
      { name: "RAG (Retrieval Augmented Generation)", level: 80 },
      { name: "Prompt Engineering", level: 85 },
      { name: "Pinecone / Vector DB", level: 75 },
      { name: "GROQ AI", level: 72 },
    ],
  },
  {
    name: "Frontend",
    icon: "Monitor",
    color: "accent-cyan",
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 85 },
      { name: "TailwindCSS", level: 90 },
      { name: "Framer Motion", level: 78 },
      { name: "D3.js / Plotly", level: 78 },
      { name: "shadcn/ui", level: 82 },
    ],
  },
  {
    name: "Backend & DevOps",
    icon: "Server",
    color: "accent-blue",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "FastAPI", level: 85 },
      { name: "PostgreSQL", level: 88 },
      { name: "Docker", level: 82 },
      { name: "DuckDB", level: 78 },
      { name: "CI/CD", level: 80 },
      { name: "AWS / Cloud", level: 75 },
      { name: "Git / GitHub Actions", level: 85 },
    ],
  },
  {
    name: "Data Analysis & Visualisation",
    icon: "BarChart3",
    color: "accent-green",
    skills: [
      { name: "Matplotlib / Seaborn", level: 88 },
      { name: "Plotly / Dash", level: 82 },
      { name: "Power BI", level: 78 },
      { name: "Statistique & Inference Causale", level: 85 },
      { name: "Data Storytelling", level: 82 },
      { name: "EDA (Exploratory Data Analysis)", level: 88 },
    ],
  },
];

export const certifications = [
  { name: "AWS Certified Cloud Practitioner", org: "Amazon Web Services", year: "2024" },
  { name: "TensorFlow Developer Certificate", org: "Google", year: "2024" },
  { name: "Data Science Professional", org: "IBM", year: "2023" },
];
