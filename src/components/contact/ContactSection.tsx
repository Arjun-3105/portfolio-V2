"use client";

import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail, Github, Linkedin, Twitter, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "arjun.chaudhary3105@gmail.com"; // User's email

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="pt-24 pb-12 px-6 sm:px-10 bg-canvas relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Chapter Header */}
        <div className="flex items-center gap-3">
          <span className="editorial-meta text-editorial-accent">06 / LET&apos;S BUILD</span>
          <span className="h-[1px] w-8 bg-editorial-border" />
          <span className="text-[11px] font-mono uppercase tracking-editorial text-fg-subtle">
            CLOSING CHAPTER
          </span>
        </div>

        {/* Narrative Closing Statement directly matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
          {/* Left Column: Bold Editorial Ending */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="editorial-headline text-5xl sm:text-6xl md:text-7xl text-fg leading-none">
              Curiosity <br />
              <span className="editorial-italic font-normal text-editorial-accent">compounds.</span>
            </h2>

            <p className="text-base sm:text-lg text-fg-muted font-light leading-relaxed max-w-lg">
              I believe in building, sharing, and staying a little more curious every single day. Open to interesting engineering collaborations, internships, and conversations.
            </p>

            {/* Email Contact Pill */}
            <div className="pt-4 flex items-center gap-3">
              <a
                href={`mailto:${emailAddress}`}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-canvas text-xs uppercase font-mono tracking-editorial font-medium hover:opacity-90 transition-opacity shadow-sm"
              >
                <span>SEND AN EMAIL</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button
                onClick={handleCopy}
                aria-label="Copy email address"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-editorial-border hover:border-fg-muted bg-canvas-card text-fg text-xs font-mono tracking-editorial transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-fg-subtle" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Social Channels directly matching reference */}
          <div className="lg:col-span-6 lg:pl-16 space-y-8 border-t lg:border-t-0 lg:border-l border-editorial-border pt-10 lg:pt-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent" />
                <p className="text-[10px] font-mono uppercase tracking-ultrawide text-fg-subtle">
                  CONNECT ACROSS THE WEB
                </p>
              </div>
              <p className="text-xs text-fg-muted font-light">
                Feel free to reach out about systems, AI infrastructure, or good books.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="https://github.com/arjun-chaudhary"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-2 border-b border-editorial-border/60 text-xs font-mono uppercase tracking-editorial text-fg-muted hover:text-fg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-editorial-accent" />
                  <span>GITHUB</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-fg-subtle group-hover:text-fg" />
              </a>

              <a
                href="https://linkedin.com/in/arjun-chaudhary"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-2 border-b border-editorial-border/60 text-xs font-mono uppercase tracking-editorial text-fg-muted hover:text-fg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-editorial-accent" />
                  <span>LINKEDIN</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-fg-subtle group-hover:text-fg" />
              </a>

              <a
                href="https://x.com/arjun_builds"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-2 border-b border-editorial-border/60 text-xs font-mono uppercase tracking-editorial text-fg-muted hover:text-fg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Twitter className="w-4 h-4 text-editorial-accent" />
                  <span>X (TWITTER)</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-fg-subtle group-hover:text-fg" />
              </a>

              <a
                href={`mailto:${emailAddress}`}
                className="group flex items-center justify-between py-2 border-b border-editorial-border/60 text-xs font-mono uppercase tracking-editorial text-fg-muted hover:text-fg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-editorial-accent" />
                  <span>EMAIL DIRECT</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-fg-subtle group-hover:text-fg" />
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Editorial Signature directly matching reference */}
        <div className="pt-12 border-t border-editorial-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono tracking-editorial text-fg-subtle">
          <div className="flex items-center gap-2">
            <span className="text-fg font-medium">ARJUN CHAUDHARY</span>
            <span>•</span>
            <span>2026</span>
          </div>

          <div className="flex items-center gap-2">
            <span>STUDENT</span>
            <span>/</span>
            <span>BUILDER</span>
            <span>/</span>
            <span className="text-editorial-accent">ALWAYS LEARNING</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

