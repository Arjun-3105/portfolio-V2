"use client";

import React, { useState } from "react";
import InteractiveTerminal from "./InteractiveTerminal";
import SystemArchitectureSimulator from "./SystemArchitectureSimulator";
import { Terminal, Zap, ArrowUpRight, GraduationCap, Briefcase, Award, Code2, FileText, Mail } from "lucide-react";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"terminal" | "simulator">("terminal");

  return (
    <section id="about" className="py-24 px-6 sm:px-10 border-b border-editorial-border bg-canvas">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Chapter Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="editorial-meta text-editorial-accent">04 / ABOUT ME</span>
            <span className="h-[1px] w-8 bg-editorial-border" />
            <span className="text-[11px] font-mono uppercase tracking-editorial text-fg-subtle">
              BACKGROUND &amp; WORKBENCH
            </span>
          </div>

          <h2 className="editorial-headline text-3xl sm:text-4xl md:text-5xl text-fg">
            Engineering with <span className="editorial-italic font-normal text-editorial-accent">focus &amp; craft.</span>
          </h2>
        </div>

        {/* 2-Column Layout: Left Narrative, Right Interactive Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Human Narrative & Verified Facts (Cols 1-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-fg-muted font-light leading-relaxed text-sm sm:text-base">
              <p className="text-fg font-normal">
                Hey, I&apos;m Arjun. I&apos;m a software engineer and builder, currently working as a Full Stack / Backend Developer Intern at WhatBytes.
              </p>
              <p>
                Most of my engineering revolves around backend systems, asynchronous task queues with Celery &amp; Redis, web scraping pipelines, and domain-grounded retrieval (RAG). I like building tools that are fast, deterministic, and handle messy real-world data without breaking.
              </p>
              <p>
                I maintain a <span className="text-fg font-medium">9.5 / 10 CGPA</span> (Top 5% · Dean&apos;s List), have solved <span className="text-fg font-medium">400+ problems on LeetCode</span>, and spend my free time exploring Linux system internals and shipping open-source projects like LearnLoop, RoBERTa Legal AI, and Vaani.
              </p>
            </div>

            {/* Grounded Key Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl border border-editorial-border bg-canvas-card space-y-1">
                <div className="flex items-center gap-2 text-editorial-accent text-xs font-mono">
                  <GraduationCap className="w-4 h-4" />
                  <span>EDUCATION</span>
                </div>
                <p className="text-xs font-semibold text-fg">B.Tech in Computer Science</p>
                <p className="text-[11px] text-fg-muted">
                  Bennett University · <span className="text-editorial-accent font-medium">CGPA 9.5</span> (Dean&apos;s List)
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-editorial-border bg-canvas-card space-y-1">
                <div className="flex items-center gap-2 text-editorial-accent text-xs font-mono">
                  <Briefcase className="w-4 h-4" />
                  <span>CURRENT ROLE</span>
                </div>
                <p className="text-xs font-semibold text-fg">Backend / Full Stack Intern</p>
                <p className="text-[11px] text-fg-muted">
                  WhatBytes · Django REST, Celery, Redis
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-editorial-border bg-canvas-card space-y-1">
                <div className="flex items-center gap-2 text-editorial-accent text-xs font-mono">
                  <Code2 className="w-4 h-4" />
                  <span>DATA STRUCTURES</span>
                </div>
                <p className="text-xs font-semibold text-fg">400+ Problems Solved</p>
                <p className="text-[11px] text-fg-muted">
                  LeetCode &amp; Contests (Rating ~1550)
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-editorial-border bg-canvas-card space-y-1">
                <div className="flex items-center gap-2 text-editorial-accent text-xs font-mono">
                  <Award className="w-4 h-4" />
                  <span>ACHIEVEMENTS</span>
                </div>
                <p className="text-xs font-semibold text-fg">Dean&apos;s List &amp; Hackathons</p>
                <p className="text-[11px] text-fg-muted">
                  Top 20 in university hackathons · ML Research
                </p>
              </div>
            </div>

            {/* Quick Human Action Links */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href="mailto:arjun.chaudhary3105@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fg text-canvas text-xs uppercase font-mono tracking-editorial font-medium hover:opacity-90 transition-opacity"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Get in touch</span>
              </a>

              <a
                href="https://github.com/Arjun-3105"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-editorial-border hover:border-fg text-xs font-mono tracking-editorial text-fg transition-colors"
              >
                <span>GitHub ↗</span>
              </a>

              <a
                href="https://linkedin.com/in/0xarjun1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-editorial-border hover:border-fg text-xs font-mono tracking-editorial text-fg transition-colors"
              >
                <span>LinkedIn ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Workbench (Terminal / Simulator) (Cols 7-12) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Workbench Tab Switcher */}
            <div className="flex items-center justify-between p-1.5 rounded-xl border border-editorial-border bg-canvas-card">
              <span className="text-[11px] font-mono uppercase tracking-wider text-fg-subtle px-2">
                INTERACTIVE WORKBENCH
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === "terminal"
                      ? "bg-editorial-accent text-canvas font-medium shadow-xs"
                      : "text-fg-muted hover:text-fg hover:bg-canvas-subtle"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>CLI Terminal</span>
                </button>

                <button
                  onClick={() => setActiveTab("simulator")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === "simulator"
                      ? "bg-editorial-accent text-canvas font-medium shadow-xs"
                      : "text-fg-muted hover:text-fg hover:bg-canvas-subtle"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Pipeline Simulator</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Live Interactive CLI Terminal */}
            {activeTab === "terminal" && <InteractiveTerminal />}

            {/* Tab 2: Live Architecture Pipeline Simulator */}
            {activeTab === "simulator" && <SystemArchitectureSimulator />}
          </div>
        </div>
      </div>
    </section>
  );
}
