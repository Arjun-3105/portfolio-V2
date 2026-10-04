"use client";

import React, { useState } from "react";
import { Play, RotateCcw, CheckCircle2, Cpu, Database, Radio, Server, Layers, Zap } from "lucide-react";

type PipelineMode = "whatbytes" | "vaani";

export default function SystemArchitectureSimulator() {
  const [mode, setMode] = useState<PipelineMode>("whatbytes");
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [totalLatency, setTotalLatency] = useState<number | null>(null);

  const whatbytesSteps = [
    { name: "Scrape Trigger", tool: "Playwright / Cron", latency: "12ms", icon: Radio },
    { name: "API Gateway", tool: "Django REST / Daphne", latency: "8ms", icon: Server },
    { name: "Message Broker", tool: "Redis Queue", latency: "4ms", icon: Layers },
    { name: "Async Worker", tool: "Celery Worker Pool", latency: "64ms", icon: Cpu },
    { name: "Persistence", tool: "PostgreSQL & Cache", latency: "14ms", icon: Database },
  ];

  const vaaniSteps = [
    { name: "Audio Input", tool: "16kHz Mono WAV", latency: "20ms", icon: Radio },
    { name: "Speech-to-Text", tool: "Sarvam AI STT", latency: "135ms", icon: Server },
    { name: "Dense Retrieval", tool: "FAISS (74k vectors)", latency: "18ms", icon: Database },
    { name: "Reasoning", tool: "Groq LPU (gpt-oss-28b)", latency: "190ms", icon: Cpu },
    { name: "Voice Synthesis", tool: "Sarvam saaras:v3 TTS", latency: "115ms", icon: Layers },
  ];

  const currentSteps = mode === "whatbytes" ? whatbytesSteps : vaaniSteps;

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setTotalLatency(null);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < currentSteps.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setActiveStep(currentSteps.length);
        setIsRunning(false);
        const sum = mode === "whatbytes" ? 102 : 478;
        setTotalLatency(sum);
      }
    }, 450);
  };

  const resetSimulation = () => {
    setActiveStep(-1);
    setIsRunning(false);
    setTotalLatency(null);
  };

  return (
    <div className="rounded-2xl border border-editorial-border bg-canvas-card overflow-hidden shadow-sm hover:border-editorial-accent/30 transition-all duration-300">
      {/* Simulator Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-editorial-border bg-canvas-subtle/80 gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-editorial-accent" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-fg">
            LIVE PIPELINE SIMULATOR
          </span>
        </div>

        {/* Pipeline selector tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-canvas border border-editorial-border text-xs font-mono">
          <button
            onClick={() => {
              setMode("whatbytes");
              resetSimulation();
            }}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              mode === "whatbytes"
                ? "bg-editorial-accent text-canvas font-medium shadow-xs"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            WhatBytes Scraper
          </button>
          <button
            onClick={() => {
              setMode("vaani");
              resetSimulation();
            }}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              mode === "vaani"
                ? "bg-editorial-accent text-canvas font-medium shadow-xs"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            Vaani Voice RAG
          </button>
        </div>
      </div>

      {/* Interactive Pipeline Stage Nodes */}
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-mono text-fg-subtle">
            {mode === "whatbytes"
              ? "Asynchronous task queue with Celery, Redis & Django REST"
              : "Sub-second speech-to-speech pipeline with Sarvam AI, FAISS & Groq"}
          </p>
          {totalLatency && (
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 animate-in fade-in">
              Total: {totalLatency}ms
            </span>
          )}
        </div>

        {/* Pipeline Nodes Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {currentSteps.map((s, index) => {
            const Icon = s.icon;
            const isCompleted = activeStep > index;
            const isCurrent = activeStep === index;

            return (
              <div
                key={s.name}
                className={`p-3 rounded-xl border transition-all duration-300 relative ${
                  isCurrent
                    ? "border-editorial-accent bg-editorial-accent/10 shadow-sm scale-102"
                    : isCompleted
                    ? "border-emerald-500/40 bg-emerald-500/5 text-fg"
                    : "border-editorial-border bg-canvas-subtle/50 text-fg-muted opacity-75"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon
                    className={`w-4 h-4 ${
                      isCurrent
                        ? "text-editorial-accent animate-pulse"
                        : isCompleted
                        ? "text-emerald-500"
                        : "text-fg-subtle"
                    }`}
                  />
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-canvas border border-editorial-border/60">
                    {isCompleted ? "✓ " + s.latency : isCurrent ? "RUNNING" : s.latency}
                  </span>
                </div>
                <h4 className="text-[11px] font-semibold text-fg tracking-tight leading-tight">
                  {s.name}
                </h4>
                <p className="text-[10px] font-mono text-fg-subtle mt-0.5 truncate">
                  {s.tool}
                </p>
              </div>
            );
          })}
        </div>

        {/* Simulator Controls & Real-time Metrics */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-editorial-border/60">
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-fg text-canvas text-xs font-mono uppercase font-semibold hover:opacity-90 disabled:opacity-40 transition-all active:scale-95 shadow-sm"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isRunning ? "Simulating..." : "Trigger Pipeline"}</span>
            </button>

            <button
              onClick={resetSimulation}
              disabled={isRunning || activeStep === -1}
              className="p-1.5 rounded-lg border border-editorial-border hover:bg-canvas text-fg-subtle hover:text-fg disabled:opacity-30 transition-colors"
              aria-label="Reset simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-fg-subtle">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isRunning ? "bg-amber-400 animate-ping" : "bg-emerald-500"}`} />
              <span>{isRunning ? "Worker Processing" : "Workers Ready"}</span>
            </div>
            <div>Queue Depth: <span className="text-fg font-medium">0</span></div>
            <div>Concurrency: <span className="text-fg font-medium">4x</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
