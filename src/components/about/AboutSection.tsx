"use client";

import React from "react";
import {
  Terminal,
  GraduationCap,
  Award,
  Code2,
  Cpu,
  Database,
  Layers,
  Server,
  Activity,
  CheckCircle2,
  BookOpen,
  Coffee,
  GitBranch,
} from "lucide-react";

export default function AboutSection() {
  const curiosities = [
    {
      title: "Distributed Task Queues",
      desc: "Celery, Redis, and asynchronous worker pools for high-throughput scraping and background job orchestration.",
    },
    {
      title: "Retrieval Engineering (RAG)",
      desc: "Hybrid search (BM25 + dense embeddings), FAISS vector indexing, and time-decay re-ranking for grounded responses.",
    },
    {
      title: "Speech & Multimodal Systems",
      desc: "End-to-end voice pipelines with Sarvam AI STT/TTS, client-side VAD, sub-second latency, and strict guardrails.",
    },
    {
      title: "Agent Observability & Linux",
      desc: "OpenTelemetry tracing for tool-using agents, background system daemons, and deterministic Linux automation.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 sm:px-10 border-b border-editorial-border bg-canvas">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Chapter Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="editorial-meta text-editorial-accent">04 / ABOUT ARJUN</span>
            <span className="h-[1px] w-8 bg-editorial-border" />
            <span className="text-[11px] font-mono uppercase tracking-editorial text-fg-subtle">
              FOUNDATIONS &amp; CRAFT
            </span>
          </div>

          <h2 className="editorial-headline text-4xl sm:text-5xl md:text-6xl text-fg">
            Engineering with <span className="editorial-italic font-normal text-editorial-accent">intent &amp; depth.</span>
          </h2>
        </div>

        {/* Narrative & Dossier Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Developer Dossier & System Profile (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Terminal / Developer Dossier Card */}
            <div className="rounded-3xl border border-editorial-border bg-canvas-card overflow-hidden shadow-sm hover:border-editorial-accent/30 transition-all duration-300">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-editorial-border bg-canvas-subtle/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-fg-subtle">
                  <Terminal className="w-3.5 h-3.5 text-editorial-accent" />
                  <span>arjun@dev:~$ whoami</span>
                </div>
                <span className="text-[10px] font-mono text-fg-subtle">bash</span>
              </div>

              {/* Dossier Body */}
              <div className="p-6 space-y-6 font-mono text-xs">
                {/* Profile Identity */}
                <div className="space-y-1 pb-4 border-b border-editorial-border/60">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-sans font-bold text-fg">Arjun Chaudhary</span>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  </div>
                  <p className="font-sans text-xs text-fg-muted">
                    Backend &amp; Systems Engineer · CS Undergrad
                  </p>
                  <p className="text-[11px] text-fg-subtle font-mono">
                    Delhi NCR, India · arjun.chaudhary3105@gmail.com
                  </p>
                </div>

                {/* Key Metrics / Highlights Grid */}
                <div className="grid grid-cols-2 gap-3 font-sans">
                  <div className="p-3 rounded-xl border border-editorial-border bg-canvas-subtle space-y-1">
                    <div className="flex items-center gap-1.5 text-editorial-accent text-[11px] font-mono">
                      <Award className="w-3.5 h-3.5" />
                      <span>CGPA 9.5 / 10</span>
                    </div>
                    <p className="text-xs font-semibold text-fg">Top 5% · Dean&apos;s List</p>
                    <p className="text-[10px] text-fg-subtle">Bennett University</p>
                  </div>

                  <div className="p-3 rounded-xl border border-editorial-border bg-canvas-subtle space-y-1">
                    <div className="flex items-center gap-1.5 text-editorial-accent text-[11px] font-mono">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>400+ Solved</span>
                    </div>
                    <p className="text-xs font-semibold text-fg">LeetCode &amp; Contests</p>
                    <p className="text-[10px] text-fg-subtle">DSA Foundations</p>
                  </div>

                  <div className="p-3 rounded-xl border border-editorial-border bg-canvas-subtle space-y-1">
                    <div className="flex items-center gap-1.5 text-editorial-accent text-[11px] font-mono">
                      <Server className="w-3.5 h-3.5" />
                      <span>WhatBytes Intern</span>
                    </div>
                    <p className="text-xs font-semibold text-fg">Backend &amp; Scraping</p>
                    <p className="text-[10px] text-fg-subtle">Celery, Redis, Django</p>
                  </div>

                  <div className="p-3 rounded-xl border border-editorial-border bg-canvas-subtle space-y-1">
                    <div className="flex items-center gap-1.5 text-editorial-accent text-[11px] font-mono">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Production RAG</span>
                    </div>
                    <p className="text-xs font-semibold text-fg">Vaani, EMP, RoBERTa</p>
                    <p className="text-[10px] text-fg-subtle">Multimodal &amp; FAISS</p>
                  </div>
                </div>

                {/* Core Stack Pills */}
                <div className="space-y-2 pt-2 border-t border-editorial-border/60">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-fg-subtle">
                    PRIMARY TOOLCHAIN
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {[
                      "Python",
                      "Django REST",
                      "FastAPI",
                      "Celery",
                      "Redis",
                      "PostgreSQL",
                      "Docker",
                      "Linux",
                      "TypeScript",
                      "Next.js",
                      "FAISS",
                      "C++",
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded-md bg-canvas border border-editorial-border/80 text-fg-muted font-mono text-[10px]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current Status Terminal line */}
                <div className="p-3 rounded-xl bg-canvas-subtle border border-editorial-border flex items-center gap-2 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-fg-muted font-mono">
                    status: building high-throughput systems &amp; open to backend roles
                  </span>
                </div>
              </div>
            </div>

            {/* Academic Foundation Card */}
            <div className="p-5 rounded-2xl border border-editorial-border bg-canvas-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-editorial-accent uppercase tracking-widest">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <p className="text-sm font-semibold text-fg">
                B.Tech in Computer Science &amp; Engineering
              </p>
              <p className="text-xs text-fg-muted font-light leading-relaxed">
                Bennett University • Greater Noida, India (2023 – 2027)
                <br />
                <span className="text-editorial-accent font-medium">CGPA: 9.5 / 10</span> (Top 5% of batch) · Dean&apos;s List
              </p>
            </div>
          </div>

          {/* Right Column: Personal Story & Philosophies (Cols 6-12) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-fg font-normal leading-relaxed">
                I&apos;m a Computer Science undergraduate at Bennett University with a deep focus on backend engineering, distributed task pipelines, and applied machine learning.
              </p>
              <p className="text-sm sm:text-base text-fg-muted font-light leading-relaxed">
                I enjoy taking complex, unstructured inputs—whether high-throughput web scraping, domain-specific legal documents, or real-time speech streams—and building resilient, low-latency software to process them cleanly.
              </p>
              <p className="text-sm sm:text-base text-fg-muted font-light leading-relaxed">
                As a Full Stack Developer Intern at WhatBytes, I work on backend architectures with Django REST Framework, WebSockets, Celery, and Redis, writing asynchronous web scraping pipelines and content relevance algorithms. Beyond day-to-day engineering, I&apos;ve solved 400+ problems on LeetCode and love shipping end-to-end open-source systems like LearnLoop, RoBERTa Legal AI, and Vaani.
              </p>
            </div>

            {/* Core Engineering Principles */}
            <div className="pt-4 border-t border-editorial-border space-y-4">
              <p className="editorial-meta text-fg-subtle">
                CORE ENGINEERING PRINCIPLES
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-editorial-border bg-canvas-card space-y-1.5">
                  <span className="text-[10px] font-mono text-editorial-accent">PRINCIPLE 01</span>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-fg">Systems over hype</h4>
                  <p className="text-xs text-fg-muted leading-relaxed font-light">
                    Real engineering starts where demos end. Prioritizing deterministic execution, clean error tracing, and observable pipelines over buzzwords.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-editorial-border bg-canvas-card space-y-1.5">
                  <span className="text-[10px] font-mono text-editorial-accent">PRINCIPLE 02</span>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-fg">First-principles CS</h4>
                  <p className="text-xs text-fg-muted leading-relaxed font-light">
                    Deep respect for data structures, memory, concurrency, and operating systems. Solid fundamentals ensure software scales predictably under load.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-editorial-border bg-canvas-card space-y-1.5">
                  <span className="text-[10px] font-mono text-editorial-accent">PRINCIPLE 03</span>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-fg">Low latency &amp; reliability</h4>
                  <p className="text-xs text-fg-muted leading-relaxed font-light">
                    Designing for sub-second responses, offloading heavy processing to async workers with Celery &amp; Redis, and enforcing strict validation guardrails.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-editorial-border bg-canvas-card space-y-1.5">
                  <span className="text-[10px] font-mono text-editorial-accent">PRINCIPLE 04</span>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-fg">Continuous building</h4>
                  <p className="text-xs text-fg-muted leading-relaxed font-light">
                    Learning by implementing systems end-to-end, deploying to production, benchmarking tradeoffs, and publishing open-source code on GitHub.
                  </p>
                </div>
              </div>
            </div>

            {/* Outside the editor */}
            <div className="pt-4 border-t border-editorial-border space-y-4">
              <p className="editorial-meta text-fg-subtle">
                OUTSIDE THE EDITOR
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-mono text-fg-muted">
                <span className="flex items-center gap-1.5 py-1 px-3 rounded-full border border-editorial-border bg-canvas-subtle">
                  <Code2 className="w-3.5 h-3.5 text-editorial-accent" />
                  <span>Competitive Programming (400+ DSA)</span>
                </span>
                <span className="flex items-center gap-1.5 py-1 px-3 rounded-full border border-editorial-border bg-canvas-subtle">
                  <BookOpen className="w-3.5 h-3.5 text-editorial-accent" />
                  <span>Systems Architecture Papers</span>
                </span>
                <span className="flex items-center gap-1.5 py-1 px-3 rounded-full border border-editorial-border bg-canvas-subtle">
                  <GitBranch className="w-3.5 h-3.5 text-editorial-accent" />
                  <span>Linux Customization &amp; Scripting</span>
                </span>
                <span className="flex items-center gap-1.5 py-1 px-3 rounded-full border border-editorial-border bg-canvas-subtle">
                  <Coffee className="w-3.5 h-3.5 text-editorial-accent" />
                  <span>Late-Night Problem Solving</span>
                </span>
              </div>
            </div>

            {/* Current Technical Focus Grid */}
            <div className="pt-4 border-t border-editorial-border space-y-4">
              <p className="editorial-meta text-fg-subtle">
                TECHNICAL FOCUS (2025 – 2026)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {curiosities.map((item) => (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-xl border border-editorial-border bg-canvas-card/60"
                  >
                    <h5 className="text-xs font-medium text-fg uppercase tracking-wider">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-fg-muted font-light mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
