/** biome-ignore-all lint/style/noNonNullAssertion: <> */
"use client";

// app/auth/page.tsx
import { AuthTabs } from "@/components/auth/AuthTabs";
import {
  FolderOpen,
  FileText,
  FileImage,
  Music,
  Film,
  Folder,
  HardDrive,
} from "lucide-react";

const NODES = [
  {
    id: 1,
    icon: HardDrive,
    label: "Filebox Drive",
    x: 38,
    y: 8,
    color: "#818cf8",
    bg: "rgba(99,102,241,0.18)",
    size: "lg",
    delay: 0,
  },
  {
    id: 2,
    icon: Folder,
    label: "Projects",
    x: 12,
    y: 32,
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.15)",
    size: "md",
    delay: 0.4,
  },
  {
    id: 3,
    icon: Folder,
    label: "Design",
    x: 62,
    y: 30,
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.15)",
    size: "md",
    delay: 0.8,
  },
  {
    id: 4,
    icon: FileText,
    label: "report.pdf",
    x: 4,
    y: 58,
    color: "#f87171",
    bg: "rgba(239,68,68,0.15)",
    size: "sm",
    delay: 1.2,
  },
  {
    id: 5,
    icon: FileImage,
    label: "banner.png",
    x: 26,
    y: 62,
    color: "#fb923c",
    bg: "rgba(249,115,22,0.15)",
    size: "sm",
    delay: 1.5,
  },
  {
    id: 6,
    icon: Music,
    label: "intro.mp3",
    x: 54,
    y: 58,
    color: "#34d399",
    bg: "rgba(52,211,153,0.15)",
    size: "sm",
    delay: 1.8,
  },
  {
    id: 7,
    icon: Film,
    label: "promo.mp4",
    x: 76,
    y: 56,
    color: "#c084fc",
    bg: "rgba(192,132,252,0.15)",
    size: "sm",
    delay: 2.1,
  },
  {
    id: 8,
    icon: Folder,
    label: "Archives",
    x: 18,
    y: 80,
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.15)",
    size: "sm",
    delay: 2.4,
  },
  {
    id: 9,
    icon: FileText,
    label: "notes.txt",
    x: 64,
    y: 78,
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.15)",
    size: "sm",
    delay: 2.7,
  },
];

const EDGES = [
  [1, 2],
  [1, 3],
  [2, 4],
  [2, 5],
  [2, 8],
  [3, 6],
  [3, 7],
  [3, 9],
];

const SIZES = {
  lg: { box: "w-12 h-12", icon: "h-5 w-5", label: true },
  md: { box: "w-10 h-10", icon: "h-4 w-4", label: true },
  sm: { box: "w-8  h-8", icon: "h-3.5 w-3.5", label: false },
} as const;

export default function AuthPage() {
  return (
    <>
      <style>{`
        @keyframes floatY {
          0%,100% { transform: translateY(0px) }
          50%     { transform: translateY(-8px) }
        }
        @keyframes pulseRing {
          0%  { box-shadow: 0 0 0 0    var(--rc); opacity: .8 }
          70% { box-shadow: 0 0 0 8px  var(--rc); opacity: 0  }
          100%{ box-shadow: 0 0 0 0    var(--rc); opacity: 0  }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 300 }
          to   { stroke-dashoffset: 0   }
        }
        @keyframes blobA {
          0%,100%{ transform: translate(0,0) scale(1) }
          33%    { transform: translate(30px,-20px) scale(1.08) }
          66%    { transform: translate(-15px,15px) scale(.95) }
        }
        @keyframes blobB {
          0%,100%{ transform: translate(0,0) scale(1) }
          33%    { transform: translate(-30px,25px) scale(1.06) }
          66%    { transform: translate(20px,-15px) scale(.93) }
        }
        @keyframes blobC {
          0%,100%{ transform: translate(0,0) scale(1) }
          50%    { transform: translate(12px,18px) scale(1.1) }
        }
        @keyframes panelFade {
          from { opacity:0; transform: translateY(12px) }
          to   { opacity:1; transform: translateY(0) }
        }
        .f-node { animation: floatY 4s ease-in-out infinite }
        .f-edge { stroke-dasharray: 300; animation: drawLine 1s ease forwards }
        .f-in   { animation: panelFade .6s ease both }
      `}</style>

      {/* Full-screen centered container */}
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 sm:p-8">
        {/* Card wrapper — both sides side by side */}
        <div
          className="w-full max-w-4xl flex rounded-3xl overflow-hidden shadow-2xl border border-border/40"
          style={{ minHeight: 560 }}
        >
          {/* ═══ LEFT — animated illustration ═══ */}
          <div
            className="hidden md:flex md:w-1/2 relative overflow-hidden flex-col"
            style={{ background: "oklch(0.13 0.028 261.692)" }}
          >
            {/* Noise */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.04,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "160px 160px",
              }}
            />

            {/* Dot grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,.07) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* Glow blobs */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 340,
                height: 340,
                top: "-20%",
                left: "-20%",
                background:
                  "radial-gradient(circle, rgba(99,102,241,.28) 0%, transparent 70%)",
                animation: "blobA 16s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 280,
                height: 280,
                bottom: "-15%",
                right: "-15%",
                background:
                  "radial-gradient(circle, rgba(139,92,246,.24) 0%, transparent 70%)",
                animation: "blobB 20s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 200,
                height: 200,
                top: "40%",
                left: "35%",
                background:
                  "radial-gradient(circle, rgba(59,130,246,.16) 0%, transparent 70%)",
                animation: "blobC 13s ease-in-out infinite",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full px-8 py-8">
              {/* Logo */}
              <div
                className="f-in flex items-center gap-2.5"
                style={{ animationDelay: "0s" }}
              >
                <div
                  className="h-8 w-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.12)",
                  }}
                >
                  <FolderOpen className="h-4 w-4 text-white" />
                </div>
                <span className="text-white font-bold text-base tracking-tight">
                  Filebox
                </span>
              </div>

              {/* Headline */}
              <div
                className="mt-6 space-y-1.5 f-in"
                style={{ animationDelay: ".12s" }}
              >
                <p
                  className="text-[9px] font-semibold uppercase tracking-[.28em]"
                  style={{ color: "rgba(255,255,255,.35)" }}
                >
                  Cloud File Manager
                </p>
                <h2 className="text-xl font-extrabold text-white leading-tight tracking-tight">
                  Your files.
                  <br />
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg,#818cf8 0%,#a78bfa 50%,#60a5fa 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Always organized.
                  </span>
                </h2>
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,.38)", maxWidth: 200 }}
                >
                  Nested folders, multi-format files, accessible from anywhere.
                </p>
              </div>

              {/* Node graph — takes remaining space */}
              <div
                className="flex-1 relative mt-4 f-in"
                style={{ animationDelay: ".25s" }}
              >
                {/* SVG edges */}
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ overflow: "visible" }}
                >
                  <defs>
                    <linearGradient id="eg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity=".6" />
                      <stop
                        offset="100%"
                        stopColor="#60a5fa"
                        stopOpacity=".12"
                      />
                    </linearGradient>
                  </defs>
                  {EDGES.map(([a, b], i) => {
                    const from = NODES.find((n) => n.id === a)!;
                    const to = NODES.find((n) => n.id === b)!;
                    return (
                      <line
                        // biome-ignore lint/suspicious/noArrayIndexKey: <>
                        key={i}
                        className="f-edge"
                        x1={`${from.x + 3}%`}
                        y1={`${from.y + 3}%`}
                        x2={`${to.x + 3}%`}
                        y2={`${to.y + 3}%`}
                        stroke="url(#eg)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        style={{ animationDelay: `${0.4 + i * 0.12}s` }}
                      />
                    );
                  })}
                </svg>

                {/* Nodes */}
                {NODES.map((node) => {
                  const Icon = node.icon;
                  const s = SIZES[node.size as keyof typeof SIZES];
                  return (
                    <div
                      key={node.id}
                      className="f-node absolute flex flex-col items-center gap-1"
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        animationDelay: `${node.delay}s`,
                        animationDuration: `${3.5 + (node.id % 3) * 0.7}s`,
                      }}
                    >
                      {/* Pulse */}
                      <div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          // @ts-expect-error
                          "--rc": `${node.color}50`,
                          animation: `pulseRing ${2.5 + node.id * 0.28}s ease-out infinite`,
                          animationDelay: `${node.delay + 0.4}s`,
                        }}
                      />
                      {/* Box */}
                      <div
                        className={`${s.box} rounded-2xl flex items-center justify-center relative`}
                        style={{
                          background: node.bg,
                          border: `1px solid ${node.color}40`,
                          boxShadow: `0 3px 16px ${node.color}20`,
                        }}
                      >
                        <Icon
                          className={s.icon}
                          style={{ color: node.color }}
                        />
                      </div>
                      {/* Label */}
                      {s.label && (
                        <span
                          className="text-[9px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap"
                          style={{
                            color: "rgba(255,255,255,.60)",
                            background: "rgba(255,255,255,.06)",
                            border: "1px solid rgba(255,255,255,.08)",
                          }}
                        >
                          {node.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom stats */}
              <div
                className="grid grid-cols-3 gap-3 pt-5 f-in"
                style={{
                  borderTop: "1px solid rgba(255,255,255,.07)",
                  animationDelay: ".4s",
                }}
              >
                {[
                  { v: "10 GB", s: "Free storage" },
                  { v: "256-bit", s: "Encryption" },
                  { v: "99.9%", s: "Uptime" },
                ].map((x) => (
                  <div key={x.s}>
                    <div className="text-white text-sm font-bold tabular-nums">
                      {x.v}
                    </div>
                    <div
                      className="text-[10px] mt-0.5"
                      style={{ color: "rgba(255,255,255,.30)" }}
                    >
                      {x.s}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ RIGHT — form ═══ */}
          <div className="flex-1 flex flex-col justify-center bg-background px-8 py-10">
            {/* Mobile logo */}
            <div className="md:hidden flex items-center gap-2 mb-8">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                <FolderOpen className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="font-bold tracking-tight">Filebox</span>
            </div>

            <div className="space-y-1.5 mb-7">
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm text-muted-foreground">
                Sign in or create a free account to continue.
              </p>
            </div>

            <AuthTabs />

            <p className="text-center text-[11px] text-muted-foreground/50 mt-7 leading-relaxed">
              By continuing you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
              >
                Terms
              </a>
              {" & "}
              <a
                href="/privacy"
                className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
