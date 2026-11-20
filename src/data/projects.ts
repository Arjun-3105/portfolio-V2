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
    id: "mcp-observer",
    number: "01",
    name: "MCP-Observer",
    tagline: "Distributed observability proxy for AI agent tool calls.",
    description:
      "A transparent OpenTelemetry proxy for Model Context Protocol (MCP) servers. Catches hung RPC requests, flags infinite retry loops within 60s windows, and exports spans & logs to SigNoz with 1-click correlation.",
    tags: ["OPENTELEMETRY", "TYPESCRIPT", "SIGNOZ", "JSON-RPC"],
    image: "/images/projects/mcp-preview.png",
    githubUrl: "https://github.com/Arjun-3105/mcp-observer",
    liveUrl: "https://github.com/Arjun-3105/mcp-observer",
    highlights: [
      "Zero-config stdio proxy sitting transparently between MCP client and server",
      "Flagged infinite retry loops within a 60-second window and hung RPC requests past 15s",
      "Direct OTel span and log export to SigNoz collector with trace-to-log correlation",
      "Appended structured diagnostic summaries to OTel log attributes for faster root-cause analysis",
    ],
    caseStudy: {
      problem:
        "The Model Context Protocol has no native observability layer. When an AI agent calls tools through an MCP server, developers cannot inspect latency spikes, infinite tool retry loops, or hung server processes.",
      idea: "A drop-in stdio proxy intercepting JSON-RPC messages between MCP clients and servers to emit standard OpenTelemetry traces, detect runtime anomalies, and correlate logs with active spans.",
      system: {
        overview:
          "mcp-observer sits transparently on stdin/stdout. It parses JSON-RPC requests and responses, calculates tool call durations, and streams standard OpenTelemetry data to SigNoz.",
        architecture: [
          "stdio transparent stream passthrough with zero serialization delay",
          "JSON-RPC stream parser tracking inflight requests against timeout budgets",
          "Sliding-window anomaly detection flagging retry loops (>60s) and hung calls (>15s)",
          "OpenTelemetry SDK exporter streaming spans and structured logs to SigNoz OTLP endpoints",
        ],
        technologies: ["TypeScript", "Node.js", "OpenTelemetry SDK", "SigNoz", "JSON-RPC 2.0", "Docker"],
      },
      build: {
        details:
          "Built non-blocking stdin/stdout pipes ensuring tool execution payloads flow without serialization delay. Captured request/response correlation IDs to match spans with diagnostic error logs.",
        keyDecisions: [
          "Used standard OpenTelemetry semantics rather than proprietary logging formats to prevent telemetry lock-in.",
          "Enforced sliding-window heuristic checks to catch repetitive tool calling loops before token allowances exhaust.",
        ],
      },
      result: {
        metrics: [
          "100% transparent zero-config stdio passthrough",
          "Caught hung RPC requests within 15-second latency threshold",
          "1-click trace-to-log correlation in SigNoz UI",
        ],
        outcome:
          "Provides engineers with complete runtime visibility into agent tool executions and failure modes in local and distributed MCP setups.",
      },
      learnings:
        "Observability for agentic tool use must be protocol-level and non-invasive. Correlating actionable error logs directly with trace spans eliminates hours of blind debugging.",
    },
  },
  {
    id: "notestamp",
    number: "02",
    name: "LearnLoop",
    tagline: "Proof of learning platform with multi-modal ingestion & WASM evaluation.",
    description:
      "Transforms YouTube videos, PDFs, and technical articles into flashcards, notes, and Dagre concept graphs, featuring Pyodide WASM in-browser code evaluation and ERC-721 skill credentials.",
    tags: ["NEXT.JS 15", "PYODIDE WASM", "SOLIDITY", "OPENROUTER"],
    image: "/images/projects/learnloop-app.png",
    githubUrl: "https://github.com/Arjun-3105/note-stamp",
    liveUrl: "https://note-stamp.vercel.app",
    highlights: [
      "Pipeline converting YouTube videos, PDFs, and documentation into flashcards, notes & Dagre graphs",
      "Multi-modal verification engine pairing GitHub OAuth repository analysis with Pyodide WASM sandboxing",
      "Symbolic math evaluation engine powered by Algebrite",
      "ERC-721 credentialing system issuing tamper-resistant skill proofs on milestone completion",
    ],
    caseStudy: {
      problem:
        "Technical learning materials are fragmented across long video lectures, dense PDF slides, and documentation without verified assessment of whether a learner actually understood or implemented the code.",
      idea: "A unified ingestion workspace that parses multi-format technical media into structured notes and concept graphs, backed by in-browser WASM code execution and tamper-resistant credentials.",
      system: {
        overview:
          "LearnLoop ingests video, audio, and documents into semantically aligned chunks. Code exercises are tested client-side via Pyodide WebAssembly sandboxes without requiring external remote execution clusters.",
        architecture: [
          "Video and document ingestion pipeline with chunked timestamp alignment",
          "Dagre-rendered interactive concept graphs mapping topic prerequisites",
          "Pyodide WebAssembly sandbox for safe, in-browser Python code execution and grading",
          "Smart contract verification engine issuing ERC-721 skill credentials upon milestone completion",
        ],
        technologies: ["Next.js 15", "Pyodide WASM", "OpenRouter", "Ethers.js", "Solidity", "Dagre", "Tailwind CSS"],
      },
      build: {
        details:
          "Engineered slide-aware chunking to group video transcription with slide transitions. Implemented client-side WASM sandboxing with Pyodide to run automated unit tests against user code submissions in <500ms.",
        keyDecisions: [
          "Executed code evaluation inside browser WASM sandboxes to eliminate server-side execution security risks and hosting costs.",
          "Anchored concept notes to precise video timestamps for instant source verification.",
        ],
      },
      result: {
        metrics: [
          "1,500+ study hours processed",
          "Sub-500ms in-browser code test execution via Pyodide WASM",
          "92% precision in exact lecture timestamp citation",
          "Live in production at note-stamp.vercel.app",
        ],
        outcome:
          "Replaces passive video watching with verified code execution, concept graphs, and tamper-resistant credentials.",
      },
      learnings:
        "Evaluating learner comprehension requires deterministic test execution (WASM unit tests, symbolic math) rather than trusting conversational evaluations.",
    },
  },
  {
    id: "legalassistant",
    number: "03",
    name: "RoBERTa Legal AI",
    tagline: "Legal document analysis & contract risk assessment.",
    description:
      "Fine-tuned RoBERTa transformer pipeline for legal document analysis, contract risk classification, and vector retrieval across complex legal agreements.",
    tags: ["ROBERTA", "LEGAL NLP", "RAG", "CHROMADB"],
    image: "/images/projects/legalassistant-app.png",
    githubUrl: "https://github.com/Arjun-3105/legalAssistant",
    liveUrl: "https://legalsummariz.streamlit.app",
    highlights: [
      "Fine-tuned RoBERTa on CUAD legal contract dataset (21K+ clauses)",
      "Improved factual accuracy by ~40% over zero-shot baseline via task decomposition",
      "Sub-second retrieval across 30+ legal documents using optimized vector chunking",
      "Live production deployment on Streamlit Cloud",
    ],
    caseStudy: {
      problem:
        "Legal contracts are dense documents where standard search misses critical liability clauses and generic zero-shot models hallucinate non-existent statutory obligations.",
      idea: "A domain-specific legal analysis pipeline combining a fine-tuned RoBERTa model with persistent vector indexing and modular task decomposition (Classify → Retrieve → Analyze → Synthesize).",
      system: {
        overview:
          "RoBERTa Legal AI breaks legal document queries into structured phases: classifying clause categories, querying vector embeddings in ChromaDB, and analyzing liability risk.",
        architecture: [
          "Task decomposition pipeline: Classify → Retrieve → Analyze → Synthesize",
          "ChromaDB persistent vector store for multi-document ingestion and chunk retrieval",
          "RoBERTa model fine-tuned on CUAD categorizing clauses with 88.1% accuracy",
          "Synthesizer producing citation-grounded risk evaluations with exact document passages",
        ],
        technologies: ["Python", "Streamlit", "RoBERTa", "ChromaDB", "PyTorch", "Hugging Face"],
      },
      build: {
        details:
          "Trained and benchmarked clause classification on the CUAD dataset. Optimized vector chunking strategies and embedding distance metrics to keep multi-document retrieval under 1 second.",
        keyDecisions: [
          "Fine-tuned domain-specific weights on CUAD rather than relying on generic zero-shot prompts.",
          "Implemented empirical retrieval benchmarks demonstrating a ~40% factual accuracy gain over non-retrieval baselines.",
        ],
      },
      result: {
        metrics: [
          "88.1% classification accuracy across 42 legal categories",
          "~40% accuracy improvement over zero-shot baseline",
          "Sub-second retrieval latency across 30+ legal documents",
        ],
        outcome:
          "Accelerates contract audit turnaround from hours to seconds while generating transparent risk evaluations.",
      },
      learnings:
        "Domain-specific fine-tuning coupled with structured multi-step retrieval is essential in high-liability verticals like legal tech where generic chatbots fail.",
    },
  },
  {
    id: "vaani",
    number: "04",
    name: "Vaani",
    tagline: "Voice-enabled RAG system for conversations in Hindi.",
    description:
      "A speech-to-speech conversational system built for Hackathon Goa 2026. Streams Hindi audio end-to-end using Sarvam AI STT/TTS, FAISS vector retrieval over MS MARCO-X!, Groq-accelerated generation, and 4 strict hallucination guardrails.",
    tags: ["VOICE RAG", "HINDI STT/TTS", "FAISS", "SARVAM AI", "GROQ"],
    image: "/images/projects/vaani-app.png",
    githubUrl: "https://github.com/Arjun-3105/vaani",
    liveUrl: "https://huggingface.co/spaces/oxarjun/vaani",
    highlights: [
      "Live on HuggingFace Spaces (oxarjun/vaani)",
      "Sarvam AI speech-to-speech pipeline with saaras:v3 voice synthesis",
      "FAISS IndexFlatIP over 74,182 vectors with multilingual-mpnet-base-v2",
      "Sub-second speech response with 4 strict safety and grounding guardrails",
    ],
    caseStudy: {
      problem:
        "Voice assistants in Indic languages frequently suffer from heavy latency, awkward transliteration errors, and factual hallucinations when answering informational questions in Hindi.",
      idea: "An end-to-end speech-to-speech RAG platform tailored for Hindi, combining Sarvam AI's Indic models, dense multilingual vector embeddings, Groq-accelerated reasoning, and multi-stage factual guardrails.",
      system: {
        overview:
          "Built for Hackathon Goa 2026 (Task 02 - Voice RAG), Vaani links in-browser 16kHz mono audio capture with Sarvam STT, FAISS vector search, Groq LPU inference, and Sarvam saaras:v3 TTS synthesis.",
        architecture: [
          "In-browser 16 kHz mono WAV audio capture posting to /query/voice",
          "Sarvam AI Indic speech-to-text transcription",
          "FAISS IndexFlatIP indexing 74,182 vectors with sentence-transformers/multilingual-mpnet-base-v2 over MS MARCO-X!",
          "Groq LPU generation running openai/gpt-oss-28b with four validation guardrails",
          "Sarvam saaras:v3 low-latency Hindi text-to-speech synthesis",
        ],
        technologies: ["HuggingFace Spaces", "Python", "Sarvam AI", "FAISS", "Groq LPU", "MS MARCO-X!", "multilingual-mpnet-base-v2"],
      },
      build: {
        details:
          "Engineered an end-to-end pipeline measuring exact millisecond latency across every stage: STT, semantic chunking, vector retrieval, LLM reasoning, safety guardrail checks, and TTS synthesis.",
        keyDecisions: [
          "Indexed 74,182 passages from MS MARCO-X! into FAISS IndexFlatIP for instant vector similarity search.",
          "Enforced four strict grounding guardrails before speech synthesis to completely eliminate fabricated claims.",
        ],
      },
      result: {
        metrics: [
          "74,182 passages indexed in FAISS vector store",
          "Sub-second end-to-end speech-to-speech latency",
          "Zero fabricated answers via multi-stage grounding guardrails",
          "Live in production on HuggingFace Spaces (oxarjun/vaani)",
        ],
        outcome:
          "Proves that conversational Indic voice assistants can achieve low latency without compromising on factual verification.",
      },
      learnings:
        "In voice systems, speech synthesis latency dominates perceived response time. Pre-warming TTS streams and parallelizing vector retrieval cuts turnaround by over half.",
    },
  },
  {
    id: "emp",
    number: "05",
    name: "Episodic Memory Platform",
    tagline: "Time-decay semantic memory platform on Endee C++ Vector DB.",
    description:
      "Production-style memory backend modeling user interactions as time-stamped semantic vector events with Endee Vector DB (SIMD C++ / RoaringBitmaps), OpenRouter models, and exponential time decay.",
    tags: ["ENDEE VECTOR DB", "EPISODIC RAG", "TIME DECAY", "C++ SIMD"],
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
        "Standard RAG systems treat all documents as flat, static text chunks. Traditional vector search cannot differentiate between an interaction yesterday versus six months ago, causing recency bias and temporal hallucinations.",
      idea: "An episodic memory system that models user knowledge as time-stamped semantic vector events, utilizing an ultra-fast C++ vector engine, metadata pre-filtering, and mathematical time decay.",
      system: {
        overview:
          "Developed for RAGxthon 2026, EMP integrates the Endee vector database with OpenRouter (Gemma 3 27B) and Llama Nemotron embeddings to achieve sub-millisecond retrieval with temporal narrative cohesion.",
        architecture: [
          "Intent Router classifying queries into Recall, Summarize, or Recommend",
          "Vision ingestion converting image snapshots into rich descriptive metadata",
          "Vectorization via nvidia/llama-nemotron-embed into Endee C++ vector engine",
          "Pre-filtering via RoaringBitmaps before HNSW semantic graph traversal",
          "Time-Decay Re-ranking function (e^(-λ·days_old)) balancing similarity with temporal freshness",
          "Episodic Grouping clustering adjacent events into coherent chronological chapters",
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
          "Implemented background consolidation organizing daily events into higher-order weekly summaries.",
        ],
      },
      result: {
        metrics: [
          "Sub-millisecond metadata-filtered vector search in Endee",
          "Live in production on Streamlit Cloud (episodic-memory-platform.streamlit.app)",
          "Submitted to RAGxthon 2026 Hackathon",
        ],
        outcome:
          "Provides a long-term episodic memory backend that maintains temporal accuracy over extended periods of interaction.",
      },
      learnings:
        "Semantic similarity alone is inadequate for personal memory; temporal decay mathematics and episodic clustering are essential to recreate chronological recall.",
    },
  },
  {
    id: "lynx",
    number: "06",
    name: "Lynx",
    tagline: "Grounded Linux system action engine & voice assistant.",
    description:
      "Wayland & GNOME context-aware desktop automation engine bridging voice commands, hotkeys, and desktop clipboard with live Linux system telemetry for deterministic, hallucination-free OS operations.",
    tags: ["LINUX / WAYLAND", "SYSTEM AUTOMATION", "GROQ WHISPER", "PYTHON DAEMON"],
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
          "Delivered a hands-free Linux engineering copilot that turns voice requests into verifiable, safe system operations.",
      },
      learnings:
        "Real system automation requires grounding on live facts, not generative guesses. Inspecting systemctl and socket state first transforms an unreliable LLM into a dependable systems engineer.",
    },
  },
  {
    id: "nook",
    number: "07",
    name: "Nook 🌱",
    tagline: "Local-first browser tab manager & reading workspace.",
    description:
      "A quiet, private browser companion for organizing open tabs. Features a local-first tab manager, creature states reacting to open tab volume, and scroll-position return points.",
    tags: ["LOCAL-FIRST", "CHROME EXTENSION", "MANIFEST V3", "INDEXEDDB"],
    image: "/images/projects/nook-app.png",
    githubUrl: "https://github.com/Arjun-3105/nook",
    liveUrl: "https://github.com/Arjun-3105/nook",
    highlights: [
      "Manifest V3 local-first architecture with zero external telemetry",
      "Ambient tab overview with states reflecting open tab volume",
      "Return Point pill remembering reading positions on long articles and docs",
      "Interactive showcase with ambient room sounds and soundscapes",
    ],
    caseStudy: {
      problem:
        "Modern browsing leads to tab overload. Engineers accumulate dozens of technical tabs, articles, and documentation pages, losing their place across multiple windows.",
      idea: "A local-first browser companion that transforms the chaotic New Tab into a calm overview, encouraging clean tab hygiene while remembering exact reading scroll positions.",
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
          "Crafted pixel art animations and serene audio cues. Designed a non-intrusive floating leaf pill that appears only when returning to an unfinished long-form document.",
        keyDecisions: [
          "Kept all tab metadata entirely client-side to guarantee personal privacy.",
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
          "Creates a focused, restorative browsing experience that ends the stress of forgotten reading tabs.",
      },
      learnings:
        "Software doesn't have to shout or gamify productivity with aggressive notifications. Ambient, quiet feedback loops influence digital hygiene much more sustainably.",
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
  },
];
