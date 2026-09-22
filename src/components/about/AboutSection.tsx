"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Heart, Coffee, BookOpen, Footprints, GraduationCap } from "lucide-react";

export default function AboutSection() {
  const curiosities = [
    {
      title: "Local-first AI",
      desc: "Small language models running directly on device, respecting personal telemetry and offline autonomy.",
    },
    {
      title: "Acoustic Interfaces",
      desc: "Voice interactions that feel unscripted, natural, and respect human conversational rhythm.",
    },
    {
      title: "Tactile Typography",
      desc: "Editorial layout design, print-grade micro-typography, and digital restraint on the web.",
    },
    {
      title: "Agent Observability",
      desc: "Deterministic telemetry primitives that eliminate opaque failure in autonomous tool-using loops.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 sm:px-10 border-b border-editorial-border bg-canvas">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Chapter Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="editorial-meta text-editorial-accent">04 / BEYOND CODE</span>
            <span className="h-[1px] w-8 bg-editorial-border" />
            <span className="text-[11px] font-mono uppercase tracking-editorial text-fg-subtle">
              HUMANIZING THE STORY
            </span>
          </div>

          <h2 className="editorial-headline text-4xl sm:text-5xl md:text-6xl text-fg">
            A bit more <span className="editorial-italic font-normal text-editorial-accent">about me.</span>
          </h2>
        </div>

        {/* Narrative & Portrait Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Portrait & Knowledge Constellation Artwork (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-editorial-border bg-canvas-subtle shadow-md group">
              <Image
                src="/images/story-constellation.png"
                alt="Arjun Chaudhary contemplative narrative constellation"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Editorial Frame Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-ultrawide text-stone-300">
                  ARJUN CHAUDHARY
                </p>
                <p className="editorial-italic text-sm text-stone-100">
                  Student · Builder · Always Learning
                </p>
              </div>
            </div>

            {/* Quick Context Card */}
            <div className="p-5 rounded-2xl border border-editorial-border bg-canvas-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-editorial-accent uppercase tracking-widest">
                <GraduationCap className="w-4 h-4" />
                <span>FOUNDATION</span>
              </div>
              <p className="text-sm font-medium text-fg">
                B.Tech in Computer Science &amp; Engineering
              </p>
              <p className="text-xs text-fg-muted">
                Bennett University • Greater Noida, India
              </p>
            </div>
          </div>

          {/* Right Column: Personal Story & Philosophies (Cols 6-12) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-fg font-light leading-relaxed">
                I&apos;m a computer science student who loves building, learning in public, and exploring how technology can become more thoughtful, useful, and human.
              </p>
              <p className="text-sm sm:text-base text-fg-muted font-light leading-relaxed">
                I spend most of my days thinking about information architecture, retrieval-augmented generation, and why so much of the modern web feels noisy and exhausting. When I build, I obsess over restraint: cutting away unnecessary animations, generic cards, and bloat until only the essence remains.
              </p>
            </div>

            {/* Core Human Principles */}
            <div className="pt-4 border-t border-editorial-border space-y-4">
              <p className="editorial-meta text-fg-subtle">
                CORE WORKING PRINCIPLES
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-editorial-border bg-canvas-card space-y-1.5">
                  <span className="text-[10px] font-mono text-editorial-accent">PRINCIPLE 01</span>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-fg">Taste over templates</h4>
                  <p className="text-xs text-fg-muted leading-relaxed font-light">
                    Resisting generic boilerplate. Every line of CSS, every typeface pairing, and every interaction should serve the narrative.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-editorial-border bg-canvas-card space-y-1.5">
                  <span className="text-[10px] font-mono text-editorial-accent">PRINCIPLE 02</span>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-fg">Calm software</h4>
                  <p className="text-xs text-fg-muted leading-relaxed font-light">
                    The internet doesn&apos;t need more dopamine loops. It needs quiet utilities that answer questions and get out of the way.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-editorial-border bg-canvas-card space-y-1.5">
                  <span className="text-[10px] font-mono text-editorial-accent">PRINCIPLE 03</span>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-fg">Honest engineering</h4>
                  <p className="text-xs text-fg-muted leading-relaxed font-light">
                    Clear understanding of latency tradeoffs, token costs, and chunking boundaries over superficial AI hype.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-editorial-border bg-canvas-card space-y-1.5">
                  <span className="text-[10px] font-mono text-editorial-accent">PRINCIPLE 04</span>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-fg">Continuous learning</h4>
                  <p className="text-xs text-fg-muted leading-relaxed font-light">
                    Publishing experiments openly, acknowledging what failed, and staying relentlessly curious about foundational systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Outside the editor */}
            <div className="pt-4 border-t border-editorial-border space-y-4">
              <p className="editorial-meta text-fg-subtle">
                OUTSIDE THE EDITOR
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-fg-muted">
                <span className="flex items-center gap-1.5 py-1 px-3 rounded-full border border-editorial-border bg-canvas-subtle">
                  <BookOpen className="w-3.5 h-3.5 text-editorial-accent" />
                  <span>Reading science history</span>
                </span>
                <span className="flex items-center gap-1.5 py-1 px-3 rounded-full border border-editorial-border bg-canvas-subtle">
                  <Footprints className="w-3.5 h-3.5 text-editorial-accent" />
                  <span>Long evening walks</span>
                </span>
                <span className="flex items-center gap-1.5 py-1 px-3 rounded-full border border-editorial-border bg-canvas-subtle">
                  <Coffee className="w-3.5 h-3.5 text-editorial-accent" />
                  <span>Black coffee &amp; notes</span>
                </span>
                <span className="flex items-center gap-1.5 py-1 px-3 rounded-full border border-editorial-border bg-canvas-subtle">
                  <Sparkles className="w-3.5 h-3.5 text-editorial-accent" />
                  <span>Collecting type specimens</span>
                </span>
              </div>
            </div>

            {/* Current Curiosities Grid */}
            <div className="pt-4 border-t border-editorial-border space-y-4">
              <p className="editorial-meta text-fg-subtle">
                CURRENT CURIOSITIES (2025+)
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

