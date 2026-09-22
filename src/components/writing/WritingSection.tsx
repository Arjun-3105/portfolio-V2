"use client";

import React from "react";
import { dispatches } from "@/data/writing";
import { ArrowUpRight, FileText, Sparkles } from "lucide-react";

export default function WritingSection() {
  return (
    <section id="writing" className="py-24 px-6 sm:px-10 border-b border-editorial-border bg-canvas">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Chapter Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="editorial-meta text-editorial-accent">05 / DISPATCHES</span>
            <span className="h-[1px] w-8 bg-editorial-border" />
            <span className="text-[11px] font-mono uppercase tracking-editorial text-fg-subtle">
              NOTES &amp; EXPERIMENTS
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="editorial-headline text-4xl sm:text-5xl md:text-6xl text-fg">
                Notes from the <span className="editorial-italic font-normal text-editorial-accent">workbench.</span>
              </h2>
              <p className="text-sm sm:text-base text-fg-muted font-light mt-3 max-w-xl leading-relaxed">
                Short essays, architectural notes, and open-source experiments that keep the system alive and evolving.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-fg-subtle">
              <Sparkles className="w-3.5 h-3.5 text-editorial-accent" />
              <span>LEARNING IN PUBLIC</span>
            </div>
          </div>
        </div>

        {/* List of dispatches */}
        <div className="divide-y divide-editorial-border border-y border-editorial-border">
          {dispatches.map((post) => (
            <article
              key={post.id}
              className="group py-6 sm:py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-4 transition-colors hover:bg-canvas-card/40 -mx-4 px-4 rounded-xl"
            >
              {/* Left: Metadata & Title */}
              <div className="md:w-7/12 space-y-2">
                <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-ultrawide text-fg-subtle">
                  <span className="text-editorial-accent font-semibold">{post.category}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-medium text-fg group-hover:text-editorial-accent transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-fg-muted font-light leading-relaxed max-w-2xl">
                  {post.summary}
                </p>
              </div>

              {/* Right: Read link */}
              <div className="md:w-3/12 flex md:justify-end items-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-editorial text-fg-subtle group-hover:text-fg transition-colors">
                  <span>Read Note</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-editorial-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

