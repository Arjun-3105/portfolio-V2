"use client";

import React, { useState } from "react";
import { ArrowUpRight, Bot, Activity, Play, CheckCircle2, AlertCircle, Terminal, Layers } from "lucide-react";
import { Project } from "@/data/projects";

interface MCPObserverCardProps {
  project: Project;
  onOpenCaseStudy: () => void;
}

export default function MCPObserverCard({ project, onOpenCaseStudy }: MCPObserverCardProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeNode, setActiveNode] = useState<number>(0);

  const pipelineStages = [
    { name: "tool.call()", desc: "Intercept JSON-RPC 2.0 payload", status: "VALIDATED" },
    { name: "tool.result()", desc: "Inspect output & token latency", status: "24ms" },
    { name: "trace()", desc: "Emit OpenTelemetry root span", status: "RECORDED" },
    { name: "analyze()", desc: "Audit schema against Zod model", status: "100% MATCH" },
  ];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < pipelineStages.length) {
        setActiveNode(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setActiveNode(0);
        }, 1200);
      }
    }, 450);
  };

  return (
    <div className="group rounded-3xl border border-editorial-border bg-canvas-card overflow-hidden hover:border-editorial-accent/30 transition-all duration-500 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 items-center">
        {/* Left: Narrative & Metadata (Cols 1-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-editorial-accent tracking-widest">
              {project.number}
            </span>
            <span className="h-[1px] w-6 bg-editorial-border" />
            <span className="text-[10px] font-mono tracking-ultrawide uppercase text-fg-subtle">
              AI INFRASTRUCTURE
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-fg group-hover:text-editorial-accent transition-colors">
              {project.name}
            </h3>
            <p className="editorial-italic text-base sm:text-lg text-fg-muted">
              {project.tagline}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-fg-muted font-light leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-canvas-subtle border border-editorial-border text-fg-subtle uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenCaseStudy}
              className="group/btn inline-flex items-center gap-2 text-xs uppercase font-mono tracking-editorial text-fg hover:text-editorial-accent transition-colors py-1"
            >
              <span className="font-semibold">VIEW CASE STUDY</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono tracking-editorial text-fg-subtle hover:text-fg uppercase transition-colors"
            >
              GITHUB ↗
            </a>
          </div>
        </div>

        {/* Right: Observability Architecture Visualizer (Cols 6-12) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative p-6 sm:p-8 rounded-2xl border border-editorial-border bg-canvas-subtle space-y-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-editorial-border/60 pb-3 text-xs font-mono">
              <span className="flex items-center gap-2 text-fg">
                <Terminal className="w-3.5 h-3.5 text-editorial-accent" />
                <span>MODEL CONTEXT PROTOCOL (MCP) TELEMETRY</span>
              </span>
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-editorial-border bg-canvas-card hover:border-editorial-accent text-fg-muted hover:text-fg flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <Play className="w-2.5 h-2.5 fill-current text-editorial-accent" />
                <span>{isSimulating ? "TRACING..." : "TEST TRACE"}</span>
              </button>
            </div>

            {/* Main Architecture Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Agent Node */}
              <div className="md:col-span-4 p-4 rounded-xl border border-editorial-border bg-canvas-card flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full border border-editorial-border bg-canvas-subtle flex items-center justify-center">
                  <Bot className="w-5 h-5 text-editorial-accent" />
                </div>
                <div>
                  <p className="text-xs font-mono font-medium text-fg uppercase">AI Agent</p>
                  <p className="text-[10px] font-mono text-fg-subtle">Claude / Autonomous</p>
                </div>
              </div>

              {/* Connecting Flow */}
              <div className="md:col-span-1 flex items-center justify-center">
                <div className="hidden md:block w-full h-[1px] bg-editorial-border relative">
                  <span
                    className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-editorial-accent transition-all duration-300 ${
                      isSimulating ? "left-full animate-ping" : "left-0"
                    }`}
                  />
                </div>
              </div>

              {/* Proxy Core Node */}
              <div
                className={`md:col-span-7 p-4 rounded-xl border transition-all duration-300 ${
                  isSimulating
                    ? "border-editorial-accent bg-canvas-card shadow-md"
                    : "border-editorial-border bg-canvas-card/60"
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-editorial-border/60">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-editorial-accent" />
                    <span className="text-xs font-mono font-medium text-fg">MCP-Observer Proxy</span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    &lt; 2ms overhead
                  </span>
                </div>

                {/* Sub-stages */}
                <div className="mt-3 space-y-2">
                  {pipelineStages.map((stage, idx) => {
                    const isPassed = isSimulating && activeNode >= idx;
                    return (
                      <div
                        key={stage.name}
                        className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono transition-colors ${
                          isPassed
                            ? "bg-canvas-subtle text-fg border border-editorial-accent/30"
                            : "text-fg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPassed ? "bg-editorial-accent" : "bg-fg-subtle/40"
                            }`}
                          />
                          <span className="font-medium">{stage.name}</span>
                        </div>
                        <span className="text-[10px] text-fg-subtle">{stage.status}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Tagline from Reference */}
            <div className="pt-2 border-t border-editorial-border/60 flex items-center justify-between text-xs font-mono text-fg-subtle">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-editorial-accent" />
                <span>Observe. Debug. Ship smarter.</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-fg-subtle">
                OPEN SOURCE TELEMETRY
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

