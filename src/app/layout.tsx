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
  title: "Arjun Chaudhary — Ideas into a kinder internet",
  description:
    "Personal portfolio of Arjun Chaudhary. A computer science student who builds AI products, full-stack systems, and tools around learning, information, and the internet.",
  keywords: [
    "Arjun Chaudhary",
    "AI Engineer",
    "Full-Stack Developer",
    "NoteStamp",
    "RoBERTa Legal AI",
    "VaporMedia",
    "Vaani",
    "HireLens AI",
    "Episodic Memory Platform (EMP)",
    "Endee Vector DB",
    "MCP-Observer",
    "Bennett University",
    "Computer Science",
  ],
  authors: [{ name: "Arjun Chaudhary" }],
  openGraph: {
    title: "Arjun Chaudhary — Ideas into a kinder internet",
    description:
      "A computer science student who builds AI products, full-stack systems, and tools around learning, information, and the internet.",
    type: "website",
  },
};

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
          <div className="paper-grain" aria-hidden="true" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

