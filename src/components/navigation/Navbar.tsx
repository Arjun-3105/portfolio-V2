"use client";

import React, { useState, useEffect } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-canvas/80 backdrop-blur-md border-b border-editorial-border shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "#hero")}
          className="group flex items-center gap-2 text-fg tracking-editorial uppercase font-medium text-xs sm:text-sm transition-opacity hover:opacity-75"
        >
          <span>ARJUN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent inline-block transition-transform duration-300 group-hover:scale-125" />
        </a>

        {/* Center: Clean Minimal Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-xs uppercase tracking-editorial text-fg-muted hover:text-fg transition-colors duration-200 relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-fg transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: Theme Toggle & Connect CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-editorial-border bg-canvas-card hover:bg-canvas-hover text-fg text-xs tracking-editorial uppercase transition-all duration-300"
          >
            <span>Let&apos;s connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-editorial-accent" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded border border-editorial-border text-fg-muted hover:text-fg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-6 pt-4 pb-6 bg-canvas border-b border-editorial-border flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm uppercase tracking-editorial text-fg-muted hover:text-fg py-1 border-b border-editorial-border/30"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="inline-flex items-center justify-between text-xs uppercase tracking-editorial text-editorial-accent font-medium pt-2"
          >
            <span>Let&apos;s connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </header>
  );
}

