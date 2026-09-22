export interface Dispatch {
  id: string;
  title: string;
  category: "ESSAY" | "NOTE" | "EXPERIMENT";
  date: string;
  readTime: string;
  summary: string;
  link: string;
}

export const dispatches: Dispatch[] = [
  {
    id: "observability-agents",
    title: "Why AI agent tool calls need standard observability",
    category: "ESSAY",
    date: "Feb 2025",
    readTime: "4 min read",
    summary:
      "Autonomous agents are only as reliable as their tool interfaces. Exploring why the Model Context Protocol (MCP) and distributed tracing are critical for deterministic agent loops.",
    link: "#",
  },
  {
    id: "latency-voice-rag",
    title: "Overcoming the sub-500ms voice conversational threshold",
    category: "NOTE",
    date: "Jan 2025",
    readTime: "6 min read",
    summary:
      "A technical walkthrough of speculative vector retrieval, client-side VAD, and chunked audio streaming that makes conversational voice AI feel natural.",
    link: "#",
  },
  {
    id: "editorial-software",
    title: "Software as an editorial medium: Craft, typography, and calm",
    category: "ESSAY",
    date: "Nov 2024",
    readTime: "5 min read",
    summary:
      "Why digital products should take inspiration from classical book typography and architecture rather than SaaS conversion funnels and neon gradients.",
    link: "#",
  },
  {
    id: "multi-modal-chunking",
    title: "The unsung bottleneck in multi-modal RAG: Semantic slide boundaries",
    category: "EXPERIMENT",
    date: "Sep 2024",
    readTime: "3 min read",
    summary:
      "Empirical tests showing how slide-aware video chunking beats naive timestamp splitting by 40% on technical lecture comprehension benchmarks.",
    link: "#",
  },
];

