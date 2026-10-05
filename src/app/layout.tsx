import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arjun Chaudhary — Software Engineer & Builder",
  description:
    "Personal portfolio of Arjun Chaudhary — Software engineer and builder. Developing backend systems, distributed pipelines, and practical AI tools.",
  keywords: [
    "Arjun Chaudhary",
    "Software Engineer",
    "Backend Developer",
    "Builder",
    "Full-Stack Developer",
    "NoteStamp",
    "LearnLoop",
    "RoBERTa Legal AI",
    "VaporMedia",
    "Vaani",
    "HireLens AI",
    "Episodic Memory Platform (EMP)",
    "Endee Vector DB",
    "MCP-Observer",
    "Lynx",
    "Nook",
    "Notion Job Tracker",
    "Bennett University",
    "Computer Science",
  ],
  authors: [{ name: "Arjun Chaudhary" }],
  openGraph: {
    title: "Arjun Chaudhary — Software Engineer & Builder",
    description:
      "Software engineer and builder developing backend systems, distributed pipelines, and practical AI tools.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
};

import { SoundProvider } from "@/context/SoundContext";
import CursorSpotlight from "@/components/ui/CursorSpotlight";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${newsreader.variable} ${jakarta.variable} font-sans min-h-screen relative antialiased selection:bg-accent selection:text-white`}
      >
        <ThemeProvider>
          <SoundProvider>
            <div className="paper-grain" aria-hidden="true" />
            <CursorSpotlight />
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

