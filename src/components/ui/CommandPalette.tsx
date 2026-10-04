"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";
import { projects } from "@/data/projects";
import {
  Search,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  ArrowRight,
  FolderGit2,
  Compass,
  FileText,
  CornerDownLeft,
  HelpCircle,
  Keyboard,
  BookOpen,
} from "lucide-react";

interface CommandItem {
  id: string;
  category: "Navigation" | "Projects" | "Actions" | "Socials" | "Help";
  label: string;
  desc?: string;
  icon: React.ElementType;
  badge?: string;
  keywords?: string[];
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCaseStudy: (projectId: string) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenCaseStudy,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound, playKey, playClick, playSuccess } = useSound();

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("arjun.chaudhary3105@gmail.com");
    playSuccess();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  // Commands Registry
  const commands: CommandItem[] = [
    // Help & Manual
    {
      id: "cmd-help",
      category: "Help",
      label: "help",
      desc: "CLI manual, keyboard shortcuts, and command index",
      icon: HelpCircle,
      badge: "MANUAL",
      keywords: ["help", "?", "man", "shortcuts", "keys", "commands", "guide", "info", "usage"],
      action: () => {
        playClick();
        setShowHelp(true);
      },
    },

    // Navigation
    {
      id: "nav-hero",
      category: "Navigation",
      label: "Jump to Hero",
      desc: "Chapter 01 · Introduction & Bio",
      icon: Compass,
      action: () => {
        playClick();
        scrollTo("hero");
      },
    },
    {
      id: "nav-experience",
      category: "Navigation",
      label: "Jump to Experience",
      desc: "Chapter 02 · WhatBytes & Stealth Internships",
      icon: Compass,
      action: () => {
        playClick();
        scrollTo("experience");
      },
    },
    {
      id: "nav-work",
      category: "Navigation",
      label: "Jump to Projects",
      desc: "Chapter 03 · 3D Spatial Carousel (08 Repos)",
      icon: FolderGit2,
      action: () => {
        playClick();
        scrollTo("work");
      },
    },
    {
      id: "nav-about",
      category: "Navigation",
      label: "Jump to About",
      desc: "Chapter 04 · Background & Interactive CLI",
      icon: Terminal,
      action: () => {
        playClick();
        scrollTo("about");
      },
    },
    {
      id: "nav-contact",
      category: "Navigation",
      label: "Jump to Contact",
      desc: "Chapter 05 · Get in touch & socials",
      icon: Compass,
      action: () => {
        playClick();
        scrollTo("contact");
      },
    },

    // Projects deep dives
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      category: "Projects" as const,
      label: `${p.number} / ${p.name}`,
      desc: p.tagline,
      icon: FileText,
      badge: p.tags[0],
      action: () => {
        playClick();
        onClose();
        setTimeout(() => onOpenCaseStudy(p.id), 120);
      },
    })),

    // Actions & Tools
    {
      id: "act-copy-email",
      category: "Actions",
      label: copied ? "Copied Email!" : "Copy Email Address",
      desc: "arjun.chaudhary3105@gmail.com",
      icon: copied ? Check : Copy,
      badge: "CLIPBOARD",
      action: copyEmail,
    },
    {
      id: "act-theme",
      category: "Actions",
      label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      desc: `Currently in ${theme} mode`,
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        playClick();
        toggleTheme();
      },
    },
    {
      id: "act-sound",
      category: "Actions",
      label: soundEnabled ? "Mute Ambient Pad & Sound FX" : "Enable Ambient Pad & UI Sound",
      desc: soundEnabled ? "Turn off background ambient harmonics & clicks" : "Generative ambient pad + synthesized clicks",
      icon: soundEnabled ? VolumeX : Volume2,
      badge: soundEnabled ? "ON" : "OFF",
      keywords: ["sound", "audio", "music", "ambient", "pad", "mute", "volume"],
      action: () => {
        toggleSound();
      },
    },

    // External Socials
    {
      id: "soc-github",
      category: "Socials",
      label: "Open GitHub Profile",
      desc: "github.com/Arjun-3105",
      icon: ExternalLink,
      badge: "EXTERNAL",
      action: () => {
        playClick();
        window.open("https://github.com/Arjun-3105", "_blank");
        onClose();
      },
    },
    {
      id: "soc-linkedin",
      category: "Socials",
      label: "Open LinkedIn Profile",
      desc: "linkedin.com/in/0xarjun1",
      icon: ExternalLink,
      badge: "EXTERNAL",
      action: () => {
        playClick();
        window.open("https://linkedin.com/in/0xarjun1", "_blank");
        onClose();
      },
    },
    {
      id: "soc-twitter",
      category: "Socials",
      label: "Open X (Twitter) Profile",
      desc: "x.com/Oxarjun1",
      icon: ExternalLink,
      badge: "EXTERNAL",
      action: () => {
        playClick();
        window.open("https://x.com/Oxarjun1", "_blank");
        onClose();
      },
    },
  ];

  // Filter commands by query
  const filtered = commands
    .filter((cmd) => {
      if (!query) return true;
      const q = query.toLowerCase().trim();
      return (
        cmd.label.toLowerCase().includes(q) ||
        (cmd.desc && cmd.desc.toLowerCase().includes(q)) ||
        cmd.category.toLowerCase().includes(q) ||
        (cmd.keywords && cmd.keywords.some((k) => k.toLowerCase().includes(q)))
      );
    })
    .sort((a, b) => {
      const q = query.toLowerCase().trim();
      if (q === "help" || q === "?") {
        if (a.id === "cmd-help") return -1;
        if (b.id === "cmd-help") return 1;
      }
      return 0;
    });

  // Keep index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
      setShowHelp(false);
    }
  }, [isOpen]);

  // Keyboard navigation within palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showHelp) {
      if (e.key === "Escape") {
        e.preventDefault();
        playClick();
        setShowHelp(false);
        return;
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      playKey();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      playKey();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* CLI Palette Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-2xl border border-editorial-border bg-canvas-card shadow-2xl overflow-hidden z-10 font-sans"
          >
            {/* Terminal Top Window Bar */}
            <div className="px-4 py-2.5 bg-canvas-subtle/80 border-b border-editorial-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-[11px] font-mono text-fg-subtle">
                  arjun@cli:~$ command-palette
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-fg-subtle">
                <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-editorial-border">ESC</kbd>
                <span>to close</span>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="p-4 border-b border-editorial-border/60 flex items-center gap-3 bg-canvas/40">
              <span className="text-emerald-500 font-bold font-mono text-sm">➜</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  playKey();
                  if (showHelp) setShowHelp(false);
                }}
                onKeyDown={handleKeyDown}
                placeholder={showHelp ? "Type to search or ESC to return..." : "Type a command, project, or 'help'..."}
                aria-label="Command search"
                className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-fg placeholder:text-fg-subtle/60"
                autoComplete="off"
                spellCheck="false"
              />
              <div className="flex items-center gap-2">
                {!showHelp ? (
                  <button
                    onClick={() => {
                      playClick();
                      setShowHelp(true);
                    }}
                    className="px-2 py-0.5 rounded text-[10px] font-mono text-fg-subtle hover:text-editorial-accent bg-canvas border border-editorial-border hover:border-editorial-accent transition-colors flex items-center gap-1"
                    title="Open CLI Manual"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>HELP</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      playClick();
                      setShowHelp(false);
                    }}
                    className="px-2 py-0.5 rounded text-[10px] font-mono text-editorial-accent bg-canvas border border-editorial-accent transition-colors flex items-center gap-1"
                  >
                    <span>← LIST</span>
                  </button>
                )}
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-[10px] font-mono text-fg-subtle hover:text-fg"
                  >
                    CLEAR
                  </button>
                )}
              </div>
            </div>

            {/* Main Stage: Help Manual OR Results List */}
            {showHelp ? (
              <div className="max-h-[380px] overflow-y-auto p-4 sm:p-5 space-y-5 font-mono text-xs select-none">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-editorial-border/60">
                  <div className="space-y-0.5">
                    <p className="text-editorial-accent font-bold text-xs flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>MANUAL PAGE: arjun-cli(1)</span>
                    </p>
                    <p className="text-[11px] text-fg-subtle">
                      Command index, shortcuts &amp; terminal manual
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      playClick();
                      setShowHelp(false);
                    }}
                    className="px-2.5 py-1 rounded bg-canvas hover:bg-canvas-subtle border border-editorial-border text-[11px] text-fg-muted hover:text-fg transition-colors"
                  >
                    ← Back to Commands
                  </button>
                </div>

                {/* Section 1: Keyboard Shortcuts */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5 text-fg font-semibold text-[11px] uppercase tracking-wider">
                    <Keyboard className="w-3.5 h-3.5 text-editorial-accent" />
                    <span>01 / GLOBAL KEYBOARD SHORTCUTS</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-canvas border border-editorial-border/60">
                      <span className="text-fg-muted">Command Palette</span>
                      <kbd className="px-2 py-0.5 rounded bg-canvas-subtle border border-editorial-border text-editorial-accent font-semibold">⌘K / Ctrl+K</kbd>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-canvas border border-editorial-border/60">
                      <span className="text-fg-muted">Navigate Results</span>
                      <kbd className="px-2 py-0.5 rounded bg-canvas-subtle border border-editorial-border text-editorial-accent font-semibold">↑ / ↓</kbd>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-canvas border border-editorial-border/60">
                      <span className="text-fg-muted">Execute Selected</span>
                      <kbd className="px-2 py-0.5 rounded bg-canvas-subtle border border-editorial-border text-editorial-accent font-semibold">↵ Enter</kbd>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-canvas border border-editorial-border/60">
                      <span className="text-fg-muted">Close / Return</span>
                      <kbd className="px-2 py-0.5 rounded bg-canvas-subtle border border-editorial-border text-editorial-accent font-semibold">ESC</kbd>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-canvas border border-editorial-border/60">
                      <span className="text-fg-muted">Rotate 3D Carousel</span>
                      <kbd className="px-2 py-0.5 rounded bg-canvas-subtle border border-editorial-border text-editorial-accent font-semibold">← / →</kbd>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-canvas border border-editorial-border/60">
                      <span className="text-fg-muted">View Case Study</span>
                      <span className="text-editorial-accent text-[10px] font-semibold">Click / ↵</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: Command Keywords */}
                <div className="space-y-2.5">
                  <div className="text-fg font-semibold text-[11px] uppercase tracking-wider">
                    <span>02 / PALETTE COMMANDS &amp; KEYWORDS</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="p-2 rounded-lg bg-canvas border border-editorial-border/60 flex items-start gap-2.5">
                      <code className="text-editorial-accent font-bold shrink-0">help, ?</code>
                      <span className="text-fg-muted">Displays this manual page and shortcut guide.</span>
                    </div>
                    <div className="p-2 rounded-lg bg-canvas border border-editorial-border/60 flex items-start gap-2.5">
                      <code className="text-editorial-accent font-bold shrink-0">01 … 08</code>
                      <span className="text-fg-muted">Opens deep case study modal for any project (e.g. LearnLoop, Vaani, EMP).</span>
                    </div>
                    <div className="p-2 rounded-lg bg-canvas border border-editorial-border/60 flex items-start gap-2.5">
                      <code className="text-editorial-accent font-bold shrink-0">hero, exp, work, about, contact</code>
                      <span className="text-fg-muted">Instantly smooth-scrolls to the target portfolio chapter.</span>
                    </div>
                    <div className="p-2 rounded-lg bg-canvas border border-editorial-border/60 flex items-start gap-2.5">
                      <code className="text-editorial-accent font-bold shrink-0">email, copy</code>
                      <span className="text-fg-muted">Copies arjun.chaudhary3105@gmail.com directly to clipboard.</span>
                    </div>
                    <div className="p-2 rounded-lg bg-canvas border border-editorial-border/60 flex items-start gap-2.5">
                      <code className="text-editorial-accent font-bold shrink-0">theme, sound</code>
                      <span className="text-fg-muted">Toggles Dark/Light theme or Web Audio tactile click feedback.</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Interactive Shell in About */}
                <div className="space-y-2.5">
                  <div className="text-fg font-semibold text-[11px] uppercase tracking-wider">
                    <span>03 / IN-PAGE INTERACTIVE SHELL (CHAPTER 04)</span>
                  </div>
                  <p className="text-[11px] text-fg-muted leading-relaxed">
                    The embedded terminal in the About section accepts standard Linux-like commands:
                  </p>
                  <div className="p-3 rounded-lg bg-canvas border border-editorial-border/60 grid grid-cols-2 gap-2 text-[11px]">
                    <div><span className="text-emerald-500 font-bold">whoami</span> — Quick intro &amp; bio</div>
                    <div><span className="text-emerald-500 font-bold">skills</span> — Tech stack breakdown</div>
                    <div><span className="text-emerald-500 font-bold">stats</span> — Academics &amp; 9.5 CGPA</div>
                    <div><span className="text-emerald-500 font-bold">experience</span> — Production roles</div>
                    <div><span className="text-emerald-500 font-bold">projects</span> — Flagship builds</div>
                    <div><span className="text-emerald-500 font-bold">contact</span> — Reach out</div>
                    <div><span className="text-emerald-500 font-bold">clear</span> — Wipe screen</div>
                    <div><span className="text-emerald-500 font-bold">help</span> — Command list</div>
                  </div>
                </div>
              </div>
            ) : (
              /* Results List */
              <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 select-none">
                {filtered.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono text-fg-subtle space-y-1">
                    <p>No commands or projects matching &ldquo;{query}&rdquo;</p>
                    <p className="text-[11px] text-fg-subtle/70">
                      Type &ldquo;help&rdquo; to view the manual or try &ldquo;Vaani&rdquo;, &ldquo;Email&rdquo;
                    </p>
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = idx === selectedIndex;

                    return (
                      <div
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? "bg-canvas-subtle border border-editorial-accent/30 text-fg shadow-xs"
                            : "text-fg-muted hover:bg-canvas-subtle/60 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? "bg-editorial-accent/15 text-editorial-accent"
                                : "bg-canvas border border-editorial-border text-fg-subtle"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>

                          <div className="min-w-0">
                            <p className={`text-xs font-medium truncate ${isSelected ? "text-fg" : "text-fg-muted"}`}>
                              {item.label}
                            </p>
                            {item.desc && (
                              <p className="text-[11px] text-fg-subtle truncate font-light">
                                {item.desc}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          {item.badge && (
                            <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-canvas border border-editorial-border text-fg-subtle">
                              {item.badge}
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-mono transition-opacity ${
                              isSelected ? "opacity-100 text-editorial-accent" : "opacity-0"
                            }`}
                          >
                            ↵
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Bottom Keyboard Hint Bar */}
            <div className="px-4 py-2.5 bg-canvas-subtle/60 border-t border-editorial-border flex items-center justify-between text-[10px] font-mono text-fg-subtle">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-editorial-border">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-editorial-border">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-editorial-border">↵</kbd>
                  <span>select</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-fg-subtle/80">
                  <span>type</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-canvas border border-editorial-border text-editorial-accent font-semibold">help</kbd>
                  <span>for manual</span>
                </span>
              </div>
              <span className="text-editorial-accent">CLI COMMAND PALETTE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
