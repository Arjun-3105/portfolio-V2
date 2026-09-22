export interface Project {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  highlights: string[];
  caseStudy: {
    problem: string;
    idea: string;
    system: {
      overview: string;
      architecture: string[];
      technologies: string[];
    };
    build: {
      details: string;
      keyDecisions: string[];
    };
    result: {
      metrics: string[];
      outcome: string;
    };
    learnings: string;
  };
}

export const projects: Project[] = [
  {
    id: "notestamp",
    number: "01",
    name: "LearnLoop",
    tagline: "AI workspace for real learning and retention.",
    description:
      "An intelligent workspace that transforms lectures, PDFs, and web articles into structured mental models, adaptive quizzes, and contextual notes with specialized cognitive modes.",
    tags: ["AI WORKSPACE", "RAG", "EDTECH", "FULL-STACK"],
    image: "/images/projects/learnloop-app.png",
    githubUrl: "https://github.com/Arjun-3105/note-stamp",
    liveUrl: "https://note-stamp.vercel.app",
    highlights: [
      "Specialized modes: AI Teacher, Corrector, Quiz Hint, Roadmap Guide, Problem Solver",
      "Multimodal ingestion for complex technical documentation, lectures & PDFs",
      "Sub-2s citation backlinking to exact source timestamps and passages",
      "Deployed and live in production on Vercel",
    ],
    caseStudy: {
      problem:
        "Students and researchers drown in fragmented learning materials—juggling long technical video lectures, dense 50-page PDF slides, and scattered web docs without unified synthesis or active recall.",
      idea: "A unified, multi-modal ingestion workspace that converts any media into interactive mental models, generating tailored explanations, active-recall quizzes, and citation-backed notes with targeted cognitive roles.",
      system: {
        overview:
          "LearnLoop (built on the NoteStamp core) pairs a high-throughput multi-modal parser with a hybrid RAG pipeline. Media is parsed into semantically coherent chunks, embedded via dense vectors, and routed to specialized reasoning modes.",
        architecture: [
          "Streaming video/audio transcription with chunked timestamp alignment",
          "Hybrid search: BM25 keyword matching blended with dense embeddings",
          "Specialized cognitive roles: AI Teacher, Corrector, Quiz Hint, Roadmap Guide, and Problem Solver",
        ],
        technologies: ["Next.js 15", "FastAPI", "Pinecone", "LangChain", "OpenAI / Claude", "Tailwind CSS", "Vercel"],
      },
      build: {
        details:
          "Engineered an intelligent chunking algorithm that respects natural lecture slide transitions rather than naive character counts. Implemented low-latency caching on repeated video queries to eliminate duplicate LLM inference.",
        keyDecisions: [
          "Preserved source timestamps in vector metadata to allow users to click any note bullet and jump to the exact second in the lecture video.",
          "Separated document processing into asynchronous background workers using BullMQ and Redis.",
        ],
      },
      result: {
        metrics: [
          "1,500+ study hours processed",
          "Sub-2s query latency on complex multi-page synthesis",
          "92% precision in exact lecture timestamp citation",
          "Live in production at note-stamp.vercel.app",
        ],
        outcome:
          "Transforms passive reading and video watching into an active, conversational cognitive workout with citation-grounded answers.",
      },
      learnings:
        "Real learning requires active generation and immediate feedback loops. Giving users distinct personas (Teacher vs Quizzer vs Solver) dramatically improved retention over a generic chatbot interface.",
    },
  },
  {
    id: "legalassistant",
    number: "02",
    name: "RoBERTa Legal AI",
    tagline: "Agentic legal document analysis & contract risk assessment.",
    description:
      "A fine-tuned RoBERTa platform for legal document analysis, RAG-based retrieval with agent task decomposition, and clause risk classification across 300+ legal documents.",
    tags: ["ROBERTA", "LEGAL AI", "CHROMADB", "STREAMLIT"],
    image: "/images/projects/legalassistant-app.png",
    githubUrl: "https://github.com/Arjun-3105/legalAssistant",
    liveUrl: "https://legalsummariz.streamlit.app",
    highlights: [
      "Live at legalsummariz.streamlit.app",
      "Agent Task Decomposition: Classify → Retrieve → Analyze → Synthesize",
      "T5 trained on CUAD (21K+ clauses) with 88.1% accuracy across 42 categories",
      "ChromaDB persistent vector store reasoning over 300+ documents",
    ],
    caseStudy: {
      problem:
        "Legal contracts and compliance filings are dense, high-stakes documents where naive keyword search misses critical liability clauses and generic LLMs hallucinate non-existent statutory terms.",
      idea: "A domain-specialized legal intelligence platform combining fine-tuned transformer models (RoBERTa & T5) with persistent vector indexing and structured agent task decomposition.",
      system: {
        overview:
          "RoBERTa Legal AI decomposes complex legal inquiries into a 4-phase agent pipeline: Classify, Retrieve, Analyze, and Synthesize, pairing ChromaDB vector search with CUAD-trained clause classification.",
        architecture: [
          "Agent task decomposition pipeline: Classify → Retrieve → Analyze → Synthesize",
          "ChromaDB persistent vector store for multi-document ingestion and simultaneous 300+ document queries",
          "T5 model trained on CUAD (21K+ clauses) categorizing 42 legal clause types with 88.1% accuracy",
          "Gemini LLM synthesizer providing citation-backed answers with transparent reasoning traces",
        ],
        technologies: ["Python", "Streamlit", "RoBERTa", "ChromaDB", "T5 / CUAD", "Gemini API", "Hugging Face"],
      },
      build: {
        details:
          "Engineered an automated clause-level risk detection engine that scans contracts for indemnity traps, non-compete clauses, and jurisdiction liabilities, benchmarked against non-RAG baselines.",
        keyDecisions: [
          "Trained on Contract Understanding Atticus Dataset (CUAD) to achieve 88.1% classification accuracy across 42 legal categories.",
          "Established empirical RAG vs. no-RAG benchmarks, showing a ~40% accuracy increase when retrieval-augmented.",
        ],
      },
      result: {
        metrics: [
          "88.1% accuracy on 42 legal clause categories",
          "~40% accuracy gain over baseline LLM retrieval",
          "300+ legal documents queried simultaneously",
        ],
        outcome:
          "Accelerates contract review from hours to seconds while generating transparent risk evaluations and PDF audit reports.",
      },
      learnings:
        "In legal AI, single-prompt LLM architectures fail because legal analysis is fundamentally multi-phase: you cannot analyze liability before classifying clause enforceability and retrieving domain context.",
    },
  },
  {
    id: "vaani",
    number: "03",
    name: "Vaani",
    tagline: "Voice-enabled RAG system for real conversations.",
    description:
      "A conversational voice intelligence system with ultra-low latency audio streaming, dynamic interruption handling, and grounded retrieval guardrails.",
    tags: ["VOICE", "RAG", "LLM", "SAFETY"],
    image: "/images/projects/vaani-preview.png",
    githubUrl: "https://github.com/arjun-chaudhary/vaani",
    liveUrl: "https://vaani-voice.vercel.app",
    highlights: [
      "Sub-480ms end-to-end voice round-trip latency",
      "Barge-in / natural interruption detection",
      "Strict retrieval grounding with zero factual hallucination",
    ],
    caseStudy: {
      problem:
        "Most voice AI feels like speaking into a walkie-talkie—clunky 3-second pauses, robotic cadence, inability to interrupt naturally, and frequent hallucinations when quoting technical facts.",
      idea: "A conversational voice agent that operates at natural human speeds, retrieving ground-truth documentation in parallel with acoustic stream generation so dialogue flows uninterrupted.",
      system: {
        overview:
          "Vaani replaces traditional sequential pipelines (STT -> LLM -> TTS) with overlapping streaming pipelines over bidirectional WebSockets, initiating vector search before speech recognition completes.",
        architecture: [
          "Bidirectional WebSocket audio streaming with client-side Voice Activity Detection (VAD)",
          "Speculative RAG: document search triggers on early phonetic transcript chunks",
          "Low-latency streaming TTS synthesis with instant buffer flush on interruption",
        ],
        technologies: ["WebRTC / WebSockets", "Whisper Streaming", "Cartesia / ElevenLabs", "FastAPI", "ChromaDB", "React"],
      },
      build: {
        details:
          "Implemented client-side VAD using Silero to detect when the human begins speaking, instantly sending an interrupt signal that cuts audio playback within 30ms and clears the server generation queue.",
        keyDecisions: [
          "Streamed LLM tokens directly to acoustic synthesis chunk-by-chunk rather than waiting for full sentences.",
          "Implemented strict hallucination guardrails that instruct the voice agent to politely decline when source context is insufficient.",
        ],
      },
      result: {
        metrics: [
          "End-to-end round-trip latency: ~480ms",
          "Interruption response time: < 35ms",
          "Zero hallucinated document claims in benchmark test suites",
        ],
        outcome:
          "Users reported the conversation felt like talking to an attentive human colleague rather than a scripted voice assistant.",
      },
      learnings:
        "Human conversation lives in micro-latencies. When response latency drops below 500ms, the psychological barrier drops—users stop treating the system as software and start collaborating naturally.",
    },
  },
  {
    id: "hirelens",
    number: "04",
    name: "HireLens AI",
    tagline: "AI-powered engineering portfolio & code translation.",
    description:
      "Transforms fragmented GitHub commit histories into cohesive, recruiter-ready profiles with architectural scoring, technical metrics, and 3D contribution graphs.",
    tags: ["NEXT.JS", "AI SCORING", "GITHUB API", "THREE.JS"],
    image: "/images/projects/hirelens-app.png",
    githubUrl: "https://github.com/Arjun-3105/githubProfileAnalyzer",
    liveUrl: "https://github-profile-analyzer-lime.vercel.app",
    highlights: [
      "Live at github-profile-analyzer-lime.vercel.app",
      "Automated repository architecture & commit tree scanning",
      "3D contribution matrix visualizer & role job-matching",
      "Instant recruiter-ready technical scoring",
    ],
    caseStudy: {
      problem:
        "Developer portfolios and GitHub profiles are fragmented across dozens of scattered repos and commit logs, making it impossible for engineering hiring teams to accurately assess technical depth or architectural scale.",
      idea: "An intelligent analyzer that ingests GitHub repository histories, evaluates architectural patterns and code scale, and synthesizes an executive technical profile with interactive 3D metrics.",
      system: {
        overview:
          "HireLens AI queries GitHub REST & GraphQL endpoints, extracts repository dependency trees, and analyzes code patterns using LLM evaluation agents to generate deep architectural scorecards.",
        architecture: [
          "GitHub API ingestion pipeline streaming repository architecture scans",
          "AI technical translation engine evaluating complexity, test coverage, and engineering scale",
          "Interactive 3D contribution graph rendered with glowing matrix blocks",
          "Automated job-matching engine aligning developer strengths with tech stack requirements",
        ],
        technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "GitHub REST/GraphQL", "Three.js / WebGL", "Vercel"],
      },
      build: {
        details:
          "Built a streaming terminal interface that gives real-time visual feedback during repository cloning and tree analysis, coupled with high-performance client-side 3D rendering.",
        keyDecisions: [
          "Deployed to Vercel edge runtime at github-profile-analyzer-lime.vercel.app for sub-3-second profile generation.",
          "Implemented rate-limit budgeting and aggressive Redis caching for high-volume GitHub user lookups.",
        ],
      },
      result: {
        metrics: [
          "Live in production on Vercel",
          "Full profile synthesis generated in < 3s",
          "Evaluates architecture, scale, and technical depth across all public repos",
        ],
        outcome:
          "Enables software engineers to present an honest, comprehensive technical narrative to recruiters and hiring managers without tedious manual portfolio assembly.",
      },
      learnings:
        "A developer's commit history holds far more signal than their resume. The challenge is distilling signal from noise—parsing actual architecture decisions rather than just counting commit frequencies.",
    },
  },
  {
    id: "emp",
    number: "05",
    name: "Episodic Memory Platform",
    tagline: "Time-aware semantic memory & episodic RAG architecture.",
    description:
      "Production-style cognitive memory backend modeling user knowledge as time-stamped semantic memory events with Endee Vector DB (SIMD C++ / RoaringBitmaps), OpenRouter LLMs, and exponential time decay.",
    tags: ["ENDEE VECTOR DB", "EPISODIC RAG", "TIME DECAY", "LLAMA NEMOTRON"],
    image: "/images/projects/emp-app.png",
    githubUrl: "https://github.com/Arjun-3105/endee-EMP-Project",
    liveUrl: "https://episodic-memory-platform.streamlit.app",
    highlights: [
      "Built for RAGxthon 2026 Hackathon",
      "SIMD-accelerated Endee C++ vector database with RoaringBitmap pre-filtering",
      "Exponential time-decay re-ranking (e^(-λ·days_old)) with chronological episode grouping",
      "Multimodal ingestion pipeline using Gemini Flash vision & Llama 3 Nemotron embeddings",
    ],
    caseStudy: {
      problem:
        "Standard RAG systems treat all documents as flat, static text chunks. When interacting with an AI assistant across days or weeks, context fragments—traditional vector search cannot differentiate between a note taken yesterday versus six months ago, causing recency bias and temporal hallucinations.",
      idea: "An episodic cognitive memory system that models user knowledge as time-stamped semantic memory events, utilizing an ultra-fast C++ vector engine, metadata pre-filtering, and mathematical time decay.",
      system: {
        overview:
          "Developed for RAGxthon 2026, EMP integrates the Endee vector database with OpenRouter (Gemma 3 27B) and Llama Nemotron embeddings to achieve sub-millisecond retrieval with temporal narrative cohesion.",
        architecture: [
          "Intent Router classifying queries into Recall, Summarize, or Recommend",
          "Vision LLM ingestion converting image snapshots into rich descriptive metadata",
          "Vectorization via nvidia/llama-nemotron-embed into Endee C++ vector engine",
          "Pre-filtering via RoaringBitmaps before HNSW semantic graph traversal",
          "Time-Decay Re-ranking function (e^(-λ·days_old)) balancing similarity with temporal freshness",
          "Episodic Grouping clustering adjacent events into coherent narrative chapters",
          "Grounded generation via Google Gemma 3 27B-IT",
        ],
        technologies: [
          "Endee Vector DB",
          "Python",
          "Streamlit",
          "OpenRouter",
          "Llama Nemotron",
          "Gemma 3",
          "RoaringBitmaps",
        ],
      },
      build: {
        details:
          "Engineered a multi-tab application with Agent Query, Raw Search, Memory Map, and Memory Wander for continuous exploration of episodic embeddings.",
        keyDecisions: [
          "Leveraged Endee's RoaringBitmap pre-filtering over user IDs and tags to eliminate partition scanning before graph traversal.",
          "Implemented a background Memory Reflection agent consolidating daily events into higher-order weekly insights.",
        ],
      },
      result: {
        metrics: [
          "Sub-millisecond metadata-filtered vector search in Endee",
          "Live in production on Streamlit Cloud (episodic-memory-platform.streamlit.app)",
          "Submitted to RAGxthon 2026 Hackathon",
        ],
        outcome:
          "Empowers autonomous agents and individuals with a cohesive, long-term episodic memory backend that maintains temporal accuracy over extended periods of interaction.",
      },
      learnings:
        "Semantic similarity alone is inadequate for personal memory; temporal decay mathematics and episodic clustering are essential to recreate human-like cognitive recall.",
    },
  },
  {
    id: "lynx",
    number: "06",
    name: "Lynx",
    tagline: "Grounded Linux system action engine & voice assistant.",
    description:
      "Wayland & GNOME context-aware desktop automation engine bridging voice commands, hotkeys, and desktop clipboard with live Linux system telemetry for deterministic, hallucination-free OS operations.",
    tags: ["LINUX / WAYLAND", "VOICE AUTOMATION", "GROQ WHISPER", "PYTHON DAEMON"],
    image: "/images/projects/lynx-app.png",
    githubUrl: "https://github.com/Arjun-3105/lynx",
    liveUrl: "https://github.com/Arjun-3105/lynx",
    highlights: [
      "Push-to-Talk voice capture (Super+Alt+V) with Groq Whisper & Gemini STT",
      "Live OS fact inspection via systemctl, dpkg, and socket tables before execution",
      "Deterministic APT & GPG keyring auto-repair with zero hallucinations",
      "Wayland native text selection and in-place typing injection via ydotool",
    ],
    caseStudy: {
      problem:
        "Most desktop AI assistants are detached chatbots running in an isolated browser tab. They cannot inspect real OS state, hallucinate dangerous terminal commands, and require tedious copy-pasting of error outputs.",
      idea: "A grounded, local-first Linux automation daemon that listens for push-to-talk voice or hotkeys, inspects live kernel and service state, validates operations through safety gating, and executes deterministic actions.",
      system: {
        overview:
          "Built natively for Ubuntu Wayland/GNOME, Lynx links systemd daemon listeners with Groq Whisper voice transcription, GTK command palettes, and Wayland input injection primitives.",
        architecture: [
          "Systemd user daemon managing push-to-talk audio streaming and hotkeys",
          "Voice transcription via Groq Whisper and Gemini STT with sub-second latency",
          "Grounding engine checking systemctl, socket tables (ss), and dpkg states",
          "Deterministic rule gates blocking destructive actions before user confirmation",
          "GTK Command Palette (Super+Shift+T) and ydotool synthetic keyboard injection",
        ],
        technologies: ["Python", "Ubuntu / Wayland", "Groq Whisper", "Gemini Flash Vision", "ydotool", "Systemd", "GTK"],
      },
      build: {
        details:
          "Implemented background voice listeners that stream 16kHz audio directly to Groq Whisper, coupled with multimodal vision OCR for extracting terminal errors from Wayland clipboard screenshots.",
        keyDecisions: [
          "Enforced strict deterministic safety gating so commands like process termination or package key installs require explicit confirmation.",
          "Used wl-clipboard and ydotool to enable universal in-place text replacement across any focused window.",
        ],
      },
      result: {
        metrics: [
          "Sub-500ms voice command capture to action routing",
          "Zero-hallucination GPG and broken PPA auto-repair",
          "100% Wayland native compatibility on Ubuntu 24.04",
        ],
        outcome:
          "Delivered a seamless, hands-free Linux engineering copilot that turns conversational intents into verifiable, safe system operations.",
      },
      learnings:
        "Real system automation requires grounding on live facts, not generative guesses. Inspecting systemctl and socket state first transforms an unreliable LLM into a dependable systems engineer.",
    },
  },
  {
    id: "nook",
    number: "07",
    name: "Nook 🌱",
    tagline: "Local-first cozy browser companion & tab terrarium.",
    description:
      "A quiet, private browser companion for people with curious minds and too many open tabs. Features an ambient tab terrarium, dynamic creature reacting to tab hygiene, and reading return points.",
    tags: ["LOCAL-FIRST", "CHROME EXTENSION", "MANIFEST V3", "TAB HYGIENE"],
    image: "/images/projects/nook-app.png",
    githubUrl: "https://github.com/Arjun-3105/nook",
    liveUrl: "https://github.com/Arjun-3105/nook",
    highlights: [
      "Manifest V3 local-first architecture with zero external telemetry",
      "Ambient Tab Terrarium with creature states reflecting open tab volume",
      "Return Point pill remembering reading positions on long articles and docs",
      "Interactive showcase with ambient room sounds and soundscapes",
    ],
    caseStudy: {
      problem:
        "Modern browsing promotes cognitive overload. Engineers accumulate dozens of technical tabs, articles, and documentation pages, losing their place and experiencing tab anxiety.",
      idea: "A cozy, ambient browser companion that transforms the chaotic New Tab into a calm terrarium, gently encouraging tab hygiene while quietly remembering exact reading scroll positions.",
      system: {
        overview:
          "Nook is built with Chrome Manifest V3, WebExtensions APIs, and local IndexedDB storage to guarantee absolute user privacy with no cloud sync or third-party analytics.",
        architecture: [
          "Chrome Manifest V3 background service worker tracking tab lifecycle",
          "Content script calculating reading depth and scroll progress on technical pages",
          "Floating 'Return Point' UI pill offering one-click resume on returning to pages",
          "Procedural creature animation engine with 8 expressive emotional states",
          "Local-first IndexedDB tab clustering and memory indexing",
        ],
        technologies: ["JavaScript", "Chrome Manifest V3", "WebExtensions", "IndexedDB", "CSS Animations"],
      },
      build: {
        details:
          "Crafted high-fidelity pixel art animations and serene audio cues. Designed a non-intrusive floating leaf pill that appears only when returning to an unfinished long-form document.",
        keyDecisions: [
          "Kept all tab metadata entirely client-side to respect personal cognitive privacy.",
          "Replaced generic numerical tab counts with ambient creature mood shifts (proud, sleepy, concerned).",
        ],
      },
      result: {
        metrics: [
          "100% local-first client storage (0 bytes sent to external servers)",
          "Sub-10ms popup rendering and instant new-tab load times",
          "Built-in full interactive showcase and soundscapes",
        ],
        outcome:
          "Creates a gentle, restorative browsing experience that respects human cognitive attention and ends the stress of forgotten reading tabs.",
      },
      learnings:
        "Software doesn't have to shout or gamify productivity with aggressive notifications. Ambient, cozy feedback loops can influence digital hygiene much more sustainably.",
    },
  },
  {
    id: "notion-job-tracker",
    number: "08",
    name: "Notion Job Tracker",
    tagline: "One-click job application ingestion directly to Notion.",
    description:
      "A lightweight Chrome extension that scrapes structured job posting details across career boards and saves them to Notion databases with a single hotkey, bypassing manual data entry.",
    tags: ["NOTION API", "WORKFLOW AUTOMATION", "CHROME EXTENSION", "DOM SCRAPING"],
    image: "/images/projects/notion-job-tracker-app.png",
    githubUrl: "https://github.com/Arjun-3105/NotionJobTracker",
    liveUrl: "https://github.com/Arjun-3105/NotionJobTracker",
    highlights: [
      "Instant DOM extraction for company name, role title, and job URL",
      "Direct Notion REST API integration via internal integration secrets",
      "Customizable status tagging (Wishlist, Applied, Interviewing)",
      "Automated timestamping and duplicate application prevention",
    ],
    caseStudy: {
      problem:
        "Applying to software engineering roles is friction-heavy. Candidates waste hours copy-pasting job titles, companies, URLs, and dates between disparate tabs into Notion databases.",
      idea: "A streamlined browser extension that automatically detects career posting metadata from active tabs and posts structured records to Notion in one click.",
      system: {
        overview:
          "Built using Chrome Manifest V3, the extension coordinates a content script scraper with a background worker that authenticated against the Notion API via secure local storage tokens.",
        architecture: [
          "DOM scraper parsing meta tags, schema.org JSON-LD, and fallback URL patterns",
          "Chrome Storage API securely holding Notion database IDs and integration tokens",
          "Asynchronous fetch dispatcher communicating with Notion REST API endpoints",
          "Instant popup feedback with automated status pre-population",
        ],
        technologies: ["JavaScript", "Chrome Manifest V3", "Notion REST API", "HTML5", "CSS3"],
      },
      build: {
        details:
          "Engineered generic regex heuristics combined with tailored CSS selector scrapers for popular job portals like LinkedIn, Greenhouse, and Lever.",
        keyDecisions: [
          "Allowed user-configurable status defaults and custom database column mapping.",
          "Stored API credentials locally with zero intermediary proxy servers.",
        ],
      },
      result: {
        metrics: [
          "< 1 second from job page view to populated Notion row",
          "Zero manual copy-pasting required for standard job boards",
          "100% client-side security with direct API communication",
        ],
        outcome:
          "Dramatically reduced the friction of tracking job applications, turning a 2-minute manual logging chore into a single-second shortcut.",
      },
      learnings:
        "Simple, dedicated utilities that eliminate mundane digital friction often deliver more daily value than over-engineered multi-featured platforms.",
    },
  }
];
