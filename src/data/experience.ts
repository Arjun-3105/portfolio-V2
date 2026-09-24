export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
}

export interface Achievement {
  title: string;
  subtitle: string;
  description: string;
  metric?: string;
  tag: string;
}

export const workExperiences: WorkExperience[] = [
  {
    company: "WhatBytes",
    role: "Full Stack Developer Intern",
    period: "July 2026 – Present",
    location: "Remote",
    type: "Internship",
    description:
      "Engineering asynchronous distributed scraping pipelines, real-time community chat architectures, and sub-40ms feed-ranking engines under high concurrency.",
    achievements: [
      "Architected an asynchronous distributed scraping pipeline across 30+ media platforms using Python, Playwright, Scrapy, and Celery, ingesting 500+ daily records with proxy rotation to cut ban rates by 98%.",
      "Designed real-time community chat and media pipelines using Django Channels and Redis, cutting video and OCR processing latency by 65% via parallel Celery workers (FFmpeg/Tesseract).",
      "Engineered a hybrid feed-ranking engine combining time-decay heuristics with zero-shot classification, keeping query execution under 40ms.",
      "Implemented transactional workflow state machines, leveraging row locks and atomic rollbacks to guarantee data consistency under high concurrent loads.",
    ],
    technologies: [
      "Python",
      "Playwright",
      "Scrapy",
      "Celery",
      "Django Channels",
      "Redis",
      "FFmpeg",
      "Tesseract OCR",
      "PostgreSQL",
    ],
    metrics: [
      { label: "Ban Rate Cut", value: "98%" },
      { label: "Latency Cut", value: "65%" },
      { label: "Feed Query", value: "< 40ms" },
      { label: "Daily Ingestion", value: "500+" },
    ],
  },
  {
    company: "Stealth Startup",
    role: "Software Engineer Intern",
    period: "December 2025 – April 2026",
    location: "Remote",
    type: "Internship",
    description:
      "Engineered an automated document intelligence extraction pipeline turning messy procurement orders and scans into verified inventory records.",
    achievements: [
      "Cut quotation turnaround time by ~70% by building an OCR + LLM pipeline to extract line items from 25+ procurement PDFs and images.",
      "Improved quotation accuracy across 20+ monthly orders by matching extracted items against live inventory.",
      "Reduced debugging time by ~60% by adding structured logging and error tracing across the OCR-to-quotation pipeline.",
    ],
    technologies: [
      "Python",
      "OCR + LLM",
      "Document AI",
      "Structured Logging",
      "Error Tracing",
      "FastAPI",
      "PostgreSQL",
    ],
    metrics: [
      { label: "Turnaround Cut", value: "~70%" },
      { label: "Debugging Time", value: "-60%" },
      { label: "Reconciled Orders", value: "20+" },
    ],
  },
];

export const educationInfo = {
  institution: "Bennett University",
  location: "Greater Noida, India",
  degree: "Bachelor of Technology in Computer Science",
  period: "2023 – 2027",
  cgpa: "9.5 / 10",
  standing: "Top 5%",
  honors: "Dean's List for Academic Excellence",
};

export const achievementsList: Achievement[] = [
  {
    title: "LeetCode Problem Solving",
    subtitle: "Competitive Programming",
    description: "Solved 400+ DSA problems across LeetCode and competitive platforms with consistent algorithmic practice.",
    metric: "400+ Solved",
    tag: "DSA · Rating ~1550",
  },
  {
    title: "University Hackathons",
    subtitle: "Rapid Prototyping & Systems",
    description: "Ranked in the Top 20 across multiple competitive hackathons; awarded Dean's List for sustained academic excellence.",
    metric: "Top 20",
    tag: "Dean's List Award",
  },
  {
    title: "Hyperspectral Research",
    subtitle: "Machine Learning & Remote Sensing",
    description: "Authored research on UAV hyperspectral imaging for wheat yield prediction utilizing the Minnesota DRUM agricultural dataset.",
    metric: "Research",
    tag: "UAV · DRUM Dataset",
  },
];
