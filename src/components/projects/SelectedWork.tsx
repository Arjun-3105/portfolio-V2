"use client";

import React, { useState } from "react";
import { projects, Project } from "@/data/projects";
import NoteStampCard from "./NoteStampCard";
import LegalAssistantCard from "./LegalAssistantCard";
import VaaniCard from "./VaaniCard";
import HireLensCard from "./HireLensCard";
import EMPCard from "./EMPCard";
import LynxCard from "./LynxCard";
import NookCard from "./NookCard";
import NotionJobTrackerCard from "./NotionJobTrackerCard";
import CaseStudyModal from "./CaseStudyModal";

export default function SelectedWork() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const activeProject: Project | null =
    projects.find((p) => p.id === selectedProjectId) || null;

  return (
    <section id="work" className="py-24 px-6 sm:px-10 border-b border-editorial-border bg-canvas">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Chapter Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="editorial-meta text-editorial-accent">03 / THINGS I&apos;VE BUILT</span>
            <span className="h-[1px] w-8 bg-editorial-border" />
            <span className="text-[11px] font-mono uppercase tracking-editorial text-fg-subtle">
              SELECTED WORK (08)
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="editorial-headline text-4xl sm:text-5xl md:text-6xl text-fg">
                From ideas to <span className="editorial-italic font-normal text-editorial-accent">real things.</span>
              </h2>
              <p className="text-sm sm:text-base text-fg-muted font-light mt-3 max-w-2xl leading-relaxed">
                Projects, experiments and systems I&apos;ve spent unreasonable amounts of time thinking about.
              </p>
            </div>
            <p className="text-xs font-mono text-fg-subtle">
              CLICK ANY CASE STUDY FOR DEEP-DIVE
            </p>
          </div>
        </div>

        {/* The 8 Bespoke Projects Stack */}
        <div className="space-y-12">
          {/* 01 NoteStamp */}
          <NoteStampCard
            project={projects[0]}
            onOpenCaseStudy={() => setSelectedProjectId("notestamp")}
          />

          {/* 02 RoBERTa Legal AI */}
          <LegalAssistantCard
            project={projects[1]}
            onOpenCaseStudy={() => setSelectedProjectId("legalassistant")}
          />

          {/* 03 Vaani */}
          <VaaniCard
            project={projects[2]}
            onOpenCaseStudy={() => setSelectedProjectId("vaani")}
          />

          {/* 04 HireLens AI */}
          <HireLensCard
            project={projects[3]}
            onOpenCaseStudy={() => setSelectedProjectId("hirelens")}
          />

          {/* 05 Episodic Memory Platform */}
          <EMPCard
            project={projects[4]}
            onOpenCaseStudy={() => setSelectedProjectId("emp")}
          />

          {/* 06 Lynx */}
          <LynxCard
            project={projects[5]}
            onOpenCaseStudy={() => setSelectedProjectId("lynx")}
          />

          {/* 07 Nook */}
          <NookCard
            project={projects[6]}
            onOpenCaseStudy={() => setSelectedProjectId("nook")}
          />

          {/* 08 Notion Job Tracker */}
          <NotionJobTrackerCard
            project={projects[7]}
            onOpenCaseStudy={() => setSelectedProjectId("notion-job-tracker")}
          />
        </div>

        {/* Global Case Study Reader Modal */}
        <CaseStudyModal
          project={activeProject}
          onClose={() => setSelectedProjectId(null)}
        />
      </div>
    </section>
  );
}
