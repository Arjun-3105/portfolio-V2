"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, Play, RotateCcw } from "lucide-react";

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "whoami",
      output: (
        <div className="space-y-1 text-fg-muted font-mono text-[11px] leading-relaxed">
          <p>
            <span className="text-editorial-accent font-semibold">Arjun Chaudhary</span> — Backend Engineer &amp; Builder.
          </p>
          <p>
            Currently a <span className="text-fg font-medium">Backend / Full Stack Intern at WhatBytes</span>, building asynchronous task queues, high-throughput scrapers, and content ranking logic.
          </p>
          <p className="text-fg-subtle pt-1">
            Type <span className="text-editorial-accent">help</span> or click the chips below to explore commands.
          </p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>(["whoami"]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case "help":
        outputNode = (
          <div className="space-y-1 font-mono text-[11px] text-fg-muted">
            <p className="text-fg font-medium">Available commands:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1">
              <div><span className="text-editorial-accent font-semibold">whoami</span> — Quick bio &amp; background</div>
              <div><span className="text-editorial-accent font-semibold">skills</span> — Languages &amp; tech stack</div>
              <div><span className="text-editorial-accent font-semibold">stats</span> — Academics &amp; problem solving</div>
              <div><span className="text-editorial-accent font-semibold">experience</span> — Internships &amp; work</div>
              <div><span className="text-editorial-accent font-semibold">projects</span> — Flagship builds &amp; links</div>
              <div><span className="text-editorial-accent font-semibold">contact</span> — Email, GitHub, LinkedIn</div>
              <div><span className="text-editorial-accent font-semibold">clear</span> — Reset terminal window</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        outputNode = (
          <div className="space-y-1 text-fg-muted font-mono text-[11px] leading-relaxed">
            <p>
              <span className="text-editorial-accent font-semibold">Arjun Chaudhary</span> (Backend &amp; Systems Engineer)
            </p>
            <p>Engineer &amp; Builder · CGPA: 9.5 / 10 · Dean&apos;s List (Top 5%)</p>
            <p>Focus: Distributed queues (Celery/Redis), high-throughput web scraping, and low-latency voice &amp; vector retrieval.</p>
          </div>
        );
        break;

      case "skills":
      case "stack":
        outputNode = (
          <div className="space-y-2 font-mono text-[11px] text-fg-muted">
            <div>
              <span className="text-fg font-medium">Languages:</span> Python, TypeScript, JavaScript, C++, SQL
            </div>
            <div>
              <span className="text-fg font-medium">Backend &amp; Infra:</span> Django REST, FastAPI, Celery, Redis, Docker, Linux, OpenTelemetry
            </div>
            <div>
              <span className="text-fg font-medium">Databases &amp; Search:</span> PostgreSQL, MongoDB, ChromaDB, FAISS, Endee Vector DB
            </div>
            <div>
              <span className="text-fg font-medium">Frontend &amp; Tools:</span> Next.js 15, React, Tailwind CSS, Git, Postman
            </div>
          </div>
        );
        break;

      case "stats":
        outputNode = (
          <div className="space-y-1.5 font-mono text-[11px] text-fg-muted">
            <p>📊 <span className="text-fg font-medium">CGPA:</span> 9.5 / 10 (Dean&apos;s List · Top 5% at Bennett University)</p>
            <p>⚡ <span className="text-fg font-medium">LeetCode:</span> 400+ problems solved (~1550 rating, Arrays, Graphs, DP)</p>
            <p>🏢 <span className="text-fg font-medium">Internship:</span> WhatBytes (Django, Celery, Redis, Playwright scraping)</p>
            <p>🏆 <span className="text-fg font-medium">Hackathons:</span> Top 20 across multiple university hackathons</p>
            <p>🔬 <span className="text-fg font-medium">Research:</span> UAV hyperspectral imaging for wheat yield prediction (Minnesota DRUM)</p>
          </div>
        );
        break;

      case "experience":
        outputNode = (
          <div className="space-y-2 font-mono text-[11px] text-fg-muted">
            <div className="border-l-2 border-editorial-accent pl-2.5">
              <p className="text-fg font-medium">WhatBytes — Full Stack / Backend Intern</p>
              <p className="text-[10px] text-fg-subtle">April 2026 – Present · Remote</p>
              <p className="mt-0.5">Built Django REST APIs, WebSockets via Daphne, Celery background queues, and automated web scrapers for content ranking.</p>
            </div>
            <div className="border-l-2 border-editorial-border pl-2.5">
              <p className="text-fg font-medium">Stealth Startup — Software Engineer Intern</p>
              <p className="text-[10px] text-fg-subtle">Dec 2025 – April 2026 · Remote</p>
              <p className="mt-0.5">Cut quotation turnaround time by ~70% using OCR + LLM pipelines and automated line-item matching against live inventory.</p>
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-1.5 font-mono text-[11px] text-fg-muted">
            <p>1. <span className="text-fg font-medium">LearnLoop</span> — Multi-modal active recall workspace (Next.js 15, FastAPI, LangChain)</p>
            <p>2. <span className="text-fg font-medium">Vaani</span> — Hindi Voice RAG with Sarvam AI STT/TTS &amp; FAISS on Hugging Face</p>
            <p>3. <span className="text-fg font-medium">RoBERTa Legal AI</span> — Fine-tuned transformer contract risk analyzer (Streamlit, ChromaDB)</p>
            <p>4. <span className="text-fg font-medium">Episodic Memory Platform</span> — Time-decay cognitive memory on Endee C++ Vector DB</p>
            <p>5. <span className="text-fg font-medium">Lynx</span> — Grounded Linux Wayland automation daemon with Groq Whisper</p>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 font-mono text-[11px] text-fg-muted">
            <p>📧 Email: <a href="mailto:arjun.chaudhary3105@gmail.com" className="text-editorial-accent hover:underline">arjun.chaudhary3105@gmail.com</a></p>
            <p>🐙 GitHub: <a href="https://github.com/Arjun-3105" target="_blank" rel="noreferrer" className="text-editorial-accent hover:underline">github.com/Arjun-3105</a></p>
            <p>💼 LinkedIn: <a href="https://linkedin.com/in/0xarjun1" target="_blank" rel="noreferrer" className="text-editorial-accent hover:underline">linkedin.com/in/0xarjun1</a></p>
            <p>⚡ LeetCode: <a href="https://leetcode.com/0xarjun" target="_blank" rel="noreferrer" className="text-editorial-accent hover:underline">leetcode.com/0xarjun</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        outputNode = (
          <div className="text-red-400 font-mono text-[11px]">
            command not found: {rawCmd}. Type <span className="text-editorial-accent">help</span> to view available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: outputNode }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal("");
        }
      }
    }
  };

  const quickChips = ["whoami", "skills", "stats", "experience", "projects", "contact", "clear"];

  return (
    <div className="rounded-2xl border border-editorial-border bg-canvas-card overflow-hidden shadow-sm hover:border-editorial-accent/30 transition-all duration-300">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-editorial-border bg-canvas-subtle/80 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 text-[11px] font-mono text-fg-subtle flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-editorial-accent" />
            <span>arjun@dev:~$</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-fg-subtle uppercase px-2 py-0.5 rounded bg-canvas border border-editorial-border">
            interactive
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="p-5 max-h-[360px] min-h-[260px] overflow-y-auto space-y-4 font-mono text-xs cursor-text bg-canvas/40"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-fg">
              <span className="text-emerald-500 font-bold">➜</span>
              <span className="text-editorial-accent">~</span>
              <span className="font-semibold text-fg">{item.command}</span>
            </div>
            <div className="pl-5">{item.output}</div>
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 text-fg">
          <span className="text-emerald-500 font-bold">➜</span>
          <span className="text-editorial-accent">~</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help' or click a command..."
            aria-label="Terminal command input"
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-fg placeholder:text-fg-subtle/50"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={terminalBottomRef} />
      </div>

      {/* Quick Interactive Command Buttons */}
      <div className="px-4 py-3 border-t border-editorial-border bg-canvas-subtle/50 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-mono text-fg-subtle uppercase mr-1">QUICK CMDS:</span>
        {quickChips.map((chip) => (
          <button
            key={chip}
            onClick={() => handleCommand(chip)}
            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-canvas border border-editorial-border hover:border-editorial-accent hover:text-editorial-accent text-fg-muted transition-all active:scale-95"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
