"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { animate } from "animejs";
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Compass, Maximize2 } from "lucide-react";

interface ConstellationSlide {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  quote: string;
  image: string;
  metadata: string;
  tags: string[];
}

const SLIDES: ConstellationSlide[] = [
  {
    id: "code",
    category: "01 / SYNTAX & LOGIC",
    title: "The Architecture of Execution",
    subtitle: "Vector embeddings, AST parsers, and low-latency pipelines.",
    quote: "Translating ambiguous human questions into deterministic machine execution.",
    image: "/images/constellation/card-code.png",
    metadata: "PYTHON · TYPESCRIPT · RUST · CUDA",
    tags: ["AST Parsing", "Vector Search", "Low-Latency"],
  },
  {
    id: "mountain",
    category: "02 / TOPOGRAPHY & CLARITY",
    title: "A Quiet Ridgeline",
    subtitle: "Clarity found in negative space and long walks outside the editor.",
    quote: "Software feels better when designed with the composure of natural landscapes.",
    image: "/images/constellation/card-mountain.png",
    metadata: "PERSPECTIVE · MONOCHROME · ELEVATION",
    tags: ["Negative Space", "Composure", "Focus"],
  },
  {
    id: "graph",
    category: "03 / REASONING & MODELS",
    title: "Loss, Gradient & Convergence",
    subtitle: "Understanding high-dimensional vector spaces and geometric manifolds.",
    quote: "The math is elegant because it turns high-dimensional uncertainty into actionable decisions.",
    image: "/images/constellation/card-graph.png",
    metadata: "RAG · EMBEDDINGS · MANIFOLDS",
    tags: ["Dense Vectors", "Clustering", "Probabilities"],
  },
  {
    id: "paper",
    category: "04 / EDITORIAL SYNTHESIS",
    title: "The Printed Word on Glass",
    subtitle: "Bringing book craftsmanship, typographic hierarchy, and calm to modern web tools.",
    quote: "When typography is treated with respect, information breathes without screaming.",
    image: "/images/constellation/card-paper.png",
    metadata: "NEWSREADER · JAKARTA · LEADING · GRID",
    tags: ["Typography", "Book Craft", "Restraint"],
  },
  {
    id: "earth",
    category: "05 / PLANETARY SYSTEMS",
    title: "A Pale Blue Coordinate",
    subtitle: "Thinking about computing as human culture rather than pure efficiency metrics.",
    quote: "Building tools that make the internet a little more thoughtful for everyone on this rock.",
    image: "/images/constellation/card-earth.png",
    metadata: "CULTURE · SCALE · RESPONSIBILITY",
    tags: ["Human Systems", "Information Hygiene", "Ethics"],
  },
  {
    id: "circles",
    category: "06 / FORM & COMPOSITION",
    title: "Concentric Intersections",
    subtitle: "The convergence of design, distributed systems, human cognition, and curiosity.",
    quote: "Restraint is not the absence of effort; it is the ultimate precision of craft.",
    image: "/images/constellation/card-circles.png",
    metadata: "GEOMETRY · BALANCE · PROPORTION",
    tags: ["Concentric Form", "Precision", "Harmony"],
  },
  {
    id: "peak",
    category: "07 / THE ALPINE HORIZON",
    title: "The Persistent Climb",
    subtitle: "Student · Builder · Always Learning.",
    quote: "Curiosity compounds. Every question answered reveals five better questions.",
    image: "/images/constellation/card-peak.png",
    metadata: "BENNETT CSE · 2026 · CONTINUOUS SEARCH",
    tags: ["Curiosity", "Mastery", "Perseverance"],
  },
];

export default function ConstellationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const splinePathRef = useRef<SVGPathElement>(null);
  const splinePath2Ref = useRef<SVGPathElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  const total = SLIDES.length;

  // Next / Prev handlers
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total]);

  // Autoplay loop
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4800);
    return () => clearInterval(timer);
  }, [isPlaying, total]);

  // animeJS: Subtle floating levitation on cards
  useEffect(() => {
    if (!cardsContainerRef.current) return;
    const cards = cardsContainerRef.current.querySelectorAll(".constellation-card");

    const anims: ReturnType<typeof animate>[] = [];

    cards.forEach((card, i) => {
      // Gentle floating animation with staggered timing
      const anim = animate(card, {
        translateY: [-(4 + (i % 3) * 2), 4 + (i % 3) * 2],
        duration: 3200 + i * 400,
        ease: "inOutSine",
        loop: true,
        alternate: true,
      });
      anims.push(anim);
    });

    return () => {
      anims.forEach((a) => a.pause());
    };
  }, []);

  // animeJS: Constellation SVG line pulse and node glow
  useEffect(() => {
    if (splinePathRef.current) {
      animate(splinePathRef.current, {
        strokeDashoffset: [200, 0],
        opacity: [0.3, 0.75, 0.3],
        duration: 5000,
        ease: "inOutQuad",
        loop: true,
        alternate: true,
      });
    }

    if (splinePath2Ref.current) {
      animate(splinePath2Ref.current, {
        strokeDashoffset: [-200, 0],
        opacity: [0.2, 0.6, 0.2],
        duration: 6200,
        ease: "inOutQuad",
        loop: true,
        alternate: true,
      });
    }

    if (nodesRef.current) {
      const nodes = nodesRef.current.querySelectorAll(".constellation-node");
      nodes.forEach((node, idx) => {
        animate(node, {
          scale: [0.85, 1.3, 0.85],
          opacity: [0.4, 1, 0.4],
          duration: 2400 + idx * 300,
          ease: "inOutSine",
          loop: true,
          alternate: true,
        });
      });
    }
  }, []);

  // animeJS: Smooth card transition when index changes
  useEffect(() => {
    if (!cardsContainerRef.current) return;
    const activeCardEl = cardsContainerRef.current.querySelector(
      `[data-slide-index="${currentIndex}"]`
    );
    if (activeCardEl) {
      animate(activeCardEl, {
        scale: [0.94, 1],
        opacity: [0.8, 1],
        duration: 600,
        ease: "outCubic",
      });
    }
  }, [currentIndex]);

  return (
    <section
      id="constellation"
      ref={containerRef}
      className="py-24 px-4 sm:px-8 md:px-12 border-b border-editorial-border bg-canvas relative overflow-hidden select-none"
    >
      {/* Background Ambience & Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-editorial-accent/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Section Header directly inspired by Pasted image.png metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-editorial-border/70">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="editorial-meta text-editorial-accent">
                THE THINKING ARC
              </span>
              <span className="h-[1px] w-8 bg-editorial-border" />
              <span className="text-[11px] font-mono uppercase tracking-editorial text-fg-subtle">
                KNOWLEDGE CONSTELLATION
              </span>
            </div>

            <h2 className="editorial-headline text-3xl sm:text-5xl text-fg">
              Building tools for a{" "}
              <span className="editorial-italic font-normal text-editorial-accent">
                more human internet.
              </span>
            </h2>

            <div className="flex items-center gap-4 text-[10px] font-mono tracking-ultrawide uppercase text-fg-subtle">
              <span>CONTEXT</span>
              <span>·</span>
              <span>RETRIEVAL</span>
              <span>·</span>
              <span>REASONING</span>
              <span>·</span>
              <span>UNDERSTANDING</span>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause constellation auto-scroll" : "Play constellation auto-scroll"}
              className="p-2 rounded-full border border-editorial-border hover:border-fg-muted bg-canvas-card text-fg transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            <button
              onClick={handlePrev}
              aria-label="Previous card in constellation"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-editorial-border hover:border-fg-muted bg-canvas-card text-xs font-mono tracking-editorial text-fg transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">PREV</span>
            </button>

            <span className="text-xs font-mono text-fg-subtle px-1">
              {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>

            <button
              onClick={handleNext}
              aria-label="Next card in constellation"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-editorial-border hover:border-fg-muted bg-canvas-card text-xs font-mono tracking-editorial text-fg transition-colors"
            >
              <span className="hidden sm:inline">NEXT</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* The 3D Orbital Carousel Stage */}
        <div className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full flex items-center justify-center overflow-hidden rounded-3xl border border-editorial-border bg-canvas-subtle/50">
          {/* Flowing Constellation Spline Lines (SVG) matching Pasted image.png */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
          >
            <path
              ref={splinePathRef}
              d="M 50,320 C 300,180 500,420 850,220 C 1000,140 1150,280 1180,240"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="6 6"
              className="text-editorial-accent/40"
            />
            <path
              ref={splinePath2Ref}
              d="M 80,250 C 350,380 600,160 900,340 C 1050,420 1120,200 1160,280"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-fg-subtle/25"
            />
          </svg>

          {/* Glowing Constellation Orbit Nodes matching Pasted image.png */}
          <div ref={nodesRef} className="absolute inset-0 pointer-events-none z-0">
            <div className="constellation-node absolute top-[28%] left-[16%] w-2 h-2 rounded-full bg-editorial-accent shadow-[0_0_10px_var(--accent)]" />
            <div className="constellation-node absolute top-[44%] left-[34%] w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
            <div className="constellation-node absolute top-[30%] left-[52%] w-1.5 h-1.5 rounded-full bg-editorial-accent" />
            <div className="constellation-node absolute top-[52%] left-[70%] w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
            <div className="constellation-node absolute top-[24%] left-[84%] w-2 h-2 rounded-full bg-editorial-accent" />
          </div>

          {/* Floating Cards Carousel Container */}
          <div
            ref={cardsContainerRef}
            className="relative w-full h-full flex items-center justify-center perspective-1000 z-10"
          >
            {SLIDES.map((slide, idx) => {
              // Calculate relative offset from active index with circular wrap
              let offset = idx - currentIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              // Compute transforms for 3D curved carousel feel
              const isCenter = offset === 0;
              const isImmediateLeft = offset === -1;
              const isImmediateRight = offset === 1;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              const translateX = offset * 260; // horizontal separation
              const translateZ = -Math.abs(offset) * 140; // depth recession
              const rotateY = offset * -18; // curve angle
              const scale = isCenter ? 1 : Math.max(0.78, 1 - Math.abs(offset) * 0.16);
              const opacity = isCenter ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.38);
              const zIndex = 30 - Math.abs(offset) * 10;

              return (
                <div
                  key={slide.id}
                  data-slide-index={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease",
                  }}
                  className={`constellation-card absolute w-[260px] sm:w-[310px] md:w-[350px] aspect-[4/5] rounded-2xl overflow-hidden border shadow-xl cursor-pointer transition-colors duration-300 ${
                    isCenter
                      ? "border-editorial-accent bg-canvas-card shadow-[0_16px_40px_rgba(0,0,0,0.2)] ring-1 ring-editorial-accent/20"
                      : "border-editorial-border bg-canvas-card/80 hover:border-fg-subtle"
                  }`}
                >
                  {/* Card Image */}
                  <div className="relative w-full h-1/2 overflow-hidden bg-canvas-subtle border-b border-editorial-border/60">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white/90 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                        {slide.category}
                      </span>
                      {isCenter && (
                        <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent animate-ping" />
                      )}
                    </div>
                  </div>

                  {/* Card Editorial Content */}
                  <div className="p-5 flex flex-col justify-between h-1/2 space-y-2 bg-canvas-card">
                    <div>
                      <h4 className="text-sm sm:text-base font-medium text-fg uppercase tracking-editorial leading-snug">
                        {slide.title}
                      </h4>
                      <p className="text-[11px] text-fg-muted font-light mt-1 line-clamp-2 leading-relaxed">
                        {slide.subtitle}
                      </p>
                    </div>

                    {isCenter && (
                      <div className="p-2.5 rounded-lg bg-canvas-subtle border border-editorial-border text-[11px] text-fg-subtle italic leading-relaxed">
                        &ldquo;{slide.quote}&rdquo;
                      </div>
                    )}

                    <div className="pt-2 border-t border-editorial-border/50 flex items-center justify-between text-[9px] font-mono text-fg-subtle">
                      <span className="truncate max-w-[170px]">{slide.metadata}</span>
                      <span className="text-editorial-accent font-semibold">VIEW ↗</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arjun's Contemplative Silhouette in the Foreground (Center Bottom) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center">
            <div className="relative w-36 sm:w-44 md:w-52 h-44 sm:h-52 md:h-64">
              <Image
                src="/images/constellation/arjun-silhouette-alpha.png"
                alt="Arjun Chaudhary silhouette contemplating the constellation"
                fill
                priority
                className="object-contain object-bottom drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_24px_rgba(224,169,109,0.25)]"
              />
            </div>
            {/* Base platform fade */}
            <div className="absolute bottom-0 w-64 h-12 bg-gradient-to-t from-canvas to-transparent pointer-events-none" />
          </div>

          {/* Bottom Floating Subtitle Badges matching Pasted image.png */}
          <div className="absolute bottom-4 left-6 right-6 hidden sm:flex items-center justify-between z-40 pointer-events-none text-[10px] font-mono uppercase tracking-ultrawide text-fg-subtle bg-canvas/80 backdrop-blur-md px-4 py-2 rounded-full border border-editorial-border">
            <span>IDEAS · CODE · DATA · PEOPLE</span>
            <span className="text-editorial-accent font-medium">STUDENT · BUILDER · ALWAYS LEARNING</span>
            <span>SIMPLE · USEFUL · MEANINGFUL</span>
          </div>
        </div>

        {/* Carousel Pagination Progress Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Jump to slide ${idx + 1}: ${s.title}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-editorial-accent"
                  : "w-2 bg-editorial-border hover:bg-fg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

