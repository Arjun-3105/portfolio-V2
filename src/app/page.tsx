"use client";

import React, { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import ChapterProgress from "@/components/navigation/ChapterProgress";
import Hero from "@/components/hero/Hero";
import ExperienceSection from "@/components/experience/ExperienceSection";
import SelectedWork from "@/components/projects/SelectedWork";
import AboutSection from "@/components/about/AboutSection";
import WritingSection from "@/components/writing/WritingSection";
import ContactSection from "@/components/contact/ContactSection";
import CaseStudyModal from "@/components/projects/CaseStudyModal";
import { projects, Project } from "@/data/projects";

export default function HomePage() {
  const [modalProjectId, setModalProjectId] = useState<string | null>(null);

  const activeProject: Project | null =
    projects.find((p) => p.id === modalProjectId) || null;

  return (
    <main className="relative min-h-screen bg-canvas text-fg selection:bg-editorial-accent selection:text-canvas">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Side Chapter Tracker */}
      <ChapterProgress />

      {/* Chapter 01: Hero Narrative */}
      <Hero onOpenCaseStudy={(id) => setModalProjectId(id)} />

      {/* Chapter 02: Animated Vertical Experience Timeline */}
      <ExperienceSection />

      {/* Chapter 03: Selected Flagship Projects */}
      <SelectedWork />

      {/* Chapter 04: About & Humanizing the Story */}
      <AboutSection />

      {/* Chapter 05: Writing & Workbench Experiments */}
      <WritingSection />

      {/* Chapter 06: Contact & Closing Signature */}
      <ContactSection />

      {/* Case Study Modal (if opened from hero or quick links) */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setModalProjectId(null)}
      />
    </main>
  );
}

