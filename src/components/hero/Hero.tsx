"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight, ArrowDown, ArrowUpRight, Briefcase, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";

import { Compass } from "lucide-react";

interface HeroProps {
  onOpenCaseStudy: (projectId: string) => void;
}

export default function Hero({ onOpenCaseStudy }: HeroProps) {
  const { theme } = useTheme();
  const visualRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 px-6 sm:px-10 flex flex-col justify-between overflow-hidden border-b border-editorial-border"
    >
      {/* Editorial Chapter Header */}
      <div className="max-w-7xl mx-auto w-full mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="editorial-meta text-editorial-accent">01 / A CURIOUS MIND</span>
          <span className="h-[1px] w-8 bg-editorial-border" />
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-editorial text-fg-subtle">
            PORTFOLIO &amp; RESEARCH ARCHIVE
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-fg-subtle">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="tracking-editorial uppercase">AVAILABLE FOR COLLABORATION</span>
        </div>
      </div>

      {/* Main 3-Column Editorial Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center flex-1 my-auto">
        {/* Left Column: Narrative Headline & Bio (Cols 1-5) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-7 z-10">
          <div className="space-y-1">
            <p className="text-[11px] font-mono tracking-editorial uppercase text-fg-subtle">
              COMPUTER SCIENCE STUDENT
            </p>
            <p className="text-[11px] font-mono tracking-editorial uppercase text-fg-subtle">
              BUILDER · LEARNER · CURIOUS HUMAN
            </p>
          </div>

          <h1 className="editorial-headline text-5xl sm:text-6xl md:text-7xl lg:text-[4.2rem] text-fg leading-[1.04] tracking-tight">
            Ideas <br />
            into a <span className="editorial-italic font-normal text-editorial-accent">kinder</span> <br />
            internet<span className="text-editorial-accent">.</span>
          </h1>

          <p className="text-sm sm:text-base text-fg-muted font-light leading-relaxed max-w-md">
            I&apos;m Arjun — a computer science student at Bennett University who builds AI products, full-stack systems, and thoughtful tools around learning, information, and the internet.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection("work")}
              className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-fg text-canvas text-xs uppercase tracking-editorial font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-canvas text-fg flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3" />
              </div>
              <span>Explore My Work</span>
            </button>

            <button
              onClick={() => scrollToSection("experience")}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-editorial-border hover:border-fg-muted text-xs uppercase tracking-editorial text-fg-muted hover:text-fg transition-all duration-300"
            >
              <Briefcase className="w-3.5 h-3.5 text-editorial-accent" />
              <span>Experience</span>
            </button>
          </div>

          {/* Left bottom micro-story metadata */}
          <div className="pt-6 border-t border-editorial-border/60 grid grid-cols-2 gap-4 max-w-sm">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-ultrawide text-fg-subtle">FOCUS</p>
              <p className="text-xs text-fg mt-0.5 font-medium">Distributed AI &amp; RAG</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-ultrawide text-fg-subtle">ACADEMICS</p>
              <p className="text-xs text-fg mt-0.5 font-medium">B.Tech CSE · CGPA 9.5</p>
            </div>
          </div>
        </div>

        {/* Center Column: The Contemplative Visual Window (Cols 6-8) */}
        <div
          ref={visualRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-4 flex flex-col items-center justify-center relative perspective-1000 py-4"
        >
          <div
            style={{
              transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg) scale3d(1, 1, 1)`,
              transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-editorial-border shadow-2xl bg-canvas-subtle group"
          >
            {/* Visual Image with smooth transition based on theme */}
            <div className="relative w-full h-full">
              {/* Light Mode Portal Visual */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  theme === "dark" ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <Image
                  src="/images/hero-light-portal.png"
                  alt="Architectural portal overlooking mountain sunrise"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
              </div>

              {/* Dark Mode Celestial Moon Visual */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  theme === "dark" ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src="/images/hero-moon-visual.png"
                  alt="Celestial crescent moon rising over mountain ridge"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              </div>

              {/* Floating Architectural HUD Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="text-[9px] font-mono uppercase tracking-ultrawide text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {theme === "dark" ? "HORIZON • 01" : "PORTAL • 01"}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-white/70 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  <span>INTERACTIVE</span>
                </span>
              </div>

              {/* Silhouette Narrative Caption at Base */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-white pointer-events-none">
                <p className="text-[10px] font-mono uppercase tracking-ultrawide text-stone-300">PERSPECTIVE</p>
                <p className="editorial-italic text-sm text-stone-100 mt-0.5">
                  &ldquo;A more curious, human internet.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Sub-label under visual */}
          <div className="mt-4 flex items-center gap-3 text-[10px] font-mono uppercase tracking-editorial text-fg-subtle">
            <span>THINK</span>
            <span className="h-[1px] w-3 bg-editorial-border" />
            <span>BUILD</span>
            <span className="h-[1px] w-3 bg-editorial-border" />
            <span>LEARN</span>
            <span className="h-[1px] w-3 bg-editorial-border" />
            <span>REPEAT</span>
          </div>
        </div>

        {/* Right Column: Featured Work Index & Philosophy (Cols 9-12) */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-6 lg:pl-4 border-t lg:border-t-0 lg:border-l border-editorial-border pt-6 lg:pt-0">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="editorial-meta text-fg-subtle">— FEATURED WORK</span>
              <span className="text-[11px] font-mono text-fg-subtle">
                ({String(projects.length).padStart(2, "0")})
              </span>
              <span className="text-[11px] font-mono text-fg-subtle">(04)</span>
            </div>

            {/* Quick Project List directly matching reference */}
            <div className="space-y-4">
              {projects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onOpenCaseStudy(p.id)}
                  className="group cursor-pointer p-2.5 -mx-2.5 rounded-lg hover:bg-canvas-card hover:border hover:border-editorial-border transition-all duration-200"
                >
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-fg-subtle group-hover:text-editorial-accent transition-colors">
                        {p.number}
                      </span>
                      <h4 className="text-xs font-medium text-fg uppercase tracking-editorial group-hover:text-editorial-accent transition-colors">
                        {p.name}
                      </h4>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-fg-subtle group-hover:text-fg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-fg-muted font-light mt-1 line-clamp-1">
                    {p.tagline}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-2">
              <button
                onClick={() => scrollToSection("work")}
                className="text-[11px] font-mono uppercase tracking-editorial text-editorial-accent hover:underline inline-flex items-center gap-1.5"
              >
                <span>View all projects</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Editorial Thought Snippet */}
          <div className="p-4 rounded-xl border border-editorial-border bg-canvas-card/60 backdrop-blur-sm space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-ultrawide text-fg-subtle">
              BETTER TOOLS · BRIGHTER PEOPLE
            </p>
            <p className="text-xs text-fg-muted font-light italic leading-relaxed">
              &ldquo;Software shouldn&apos;t shout. The best tools feel invisible, amplifying human thought without stealing it.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar of Hero */}
      <div className="max-w-7xl mx-auto w-full pt-8 mt-4 border-t border-editorial-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <button
          onClick={() => scrollToSection("experience")}
          className="group flex items-center gap-2 text-fg-subtle hover:text-fg transition-colors"
        >
          <div className="w-6 h-6 rounded-full border border-editorial-border flex items-center justify-center group-hover:border-fg">
            <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
          </div>
          <span className="editorial-meta">SCROLL TO EXPLORE</span>
        </button>

        <div className="flex items-center gap-6 text-[11px] font-mono uppercase tracking-editorial text-fg-subtle">
          <a
            href="https://github.com/Arjun-3105"
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg transition-colors"
          >
            GITHUB
          </a>
          <span>·</span>
          <a
            href="https://linkedin.com/in/0xarjun1"
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg transition-colors"
          >
            LINKEDIN
          </a>
          <span>·</span>
          <a
            href="https://leetcode.com/0xarjun"
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg transition-colors"
          >
            LEETCODE
            X (TWITTER)
          </a>
        </div>
      </div>
    </section>
  );
}

