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

/* ── Node data for the animated graph ── */
const NODES = [
  {
    id: 1,
    icon: HardDrive,
    label: "Filebox Drive",
    x: 42,
    y: 12,
    color: "#818cf8",
    bg: "rgba(99,102,241,0.18)",
    size: "lg",
    delay: 0,
  },
  {
    id: 2,
    icon: Folder,
    label: "Projects",
    x: 16,
    y: 34,
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.15)",
    size: "md",
    delay: 0.4,
  },
  {
    id: 3,
    icon: Folder,
    label: "Design",
    x: 64,
    y: 33,
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.15)",
    size: "md",
    delay: 0.8,
  },
  {
    id: 4,
    icon: FileText,
    label: "report.pdf",
    x: 6,
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
    x: 28,
    y: 63,
    color: "#fb923c",
    bg: "rgba(249,115,22,0.15)",
    size: "sm",
    delay: 1.5,
  },
  {
    id: 6,
    icon: Music,
    label: "intro.mp3",
    x: 55,
    y: 59,
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
    x: 20,
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
    x: 66,
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
  lg: { box: "w-14 h-14", icon: "h-6 w-6", label: true },
  md: { box: "w-12 h-12", icon: "h-5 w-5", label: true },
  sm: { box: "w-10 h-10", icon: "h-4 w-4", label: false },
} as const;

export default function AuthPage() {
  return (
    <>
      <style>{`
        @keyframes floatY {
          0%,100% { transform:translateY(0) }
          50%     { transform:translateY(-10px) }
        }
        @keyframes pulseRing {
          0%  { box-shadow:0 0 0 0   var(--rc); opacity:.9 }
          70% { box-shadow:0 0 0 10px var(--rc); opacity:0 }
          100%{ box-shadow:0 0 0 0   var(--rc); opacity:0 }
        }
        @keyframes drawLine {
          from { stroke-dashoffset:300 }
          to   { stroke-dashoffset:0   }
        }
        @keyframes blobA {
          0%,100%{ transform:translate(0,0)scale(1) }
          33%    { transform:translate(40px,-30px)scale(1.1) }
          66%    { transform:translate(-20px,20px)scale(.95) }
        }
        @keyframes blobB {
          0%,100%{ transform:translate(0,0)scale(1) }
          33%    { transform:translate(-50px,40px)scale(1.08) }
          66%    { transform:translate(30px,-20px)scale(.92) }
        }
        @keyframes blobC {
          0%,100%{ transform:translate(0,0)scale(1) }
          50%    { transform:translate(20px,30px)scale(1.12) }
        }
        @keyframes fadeIn {
          from{opacity:0;transform:translateX(-16px)}
          to  {opacity:1;transform:translateX(0)}
        }
        .f-node { animation:floatY 4s ease-in-out infinite }
        .f-edge { stroke-dasharray:300;animation:drawLine 1.2s ease forwards }
        .f-fade { animation:fadeIn .7s ease both }
      `}</style>

      <div className="min-h-screen flex overflow-hidden">
        {/* ═══ LEFT — animated dark panel ═══ */}
        <div
          className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative overflow-hidden"
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
                "radial-gradient(circle,rgba(255,255,255,.09)1px,transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Glow blobs */}
          {[
            {
              style: {
                width: 520,
                height: 520,
                top: "-15%",
                left: "-12%",
                background:
                  "radial-gradient(circle,rgba(99,102,241,.22)0%,transparent 70%)",
                animation: "blobA 18s ease-in-out infinite",
              },
            },
            {
              style: {
                width: 440,
                height: 440,
                bottom: "-10%",
                right: "-8%",
                background:
                  "radial-gradient(circle,rgba(139,92,246,.20)0%,transparent 70%)",
                animation: "blobB 22s ease-in-out infinite",
              },
            },
            {
              style: {
                width: 300,
                height: 300,
                top: "38%",
                left: "38%",
                background:
                  "radial-gradient(circle,rgba(59,130,246,.14)0%,transparent 70%)",
                animation: "blobC 15s ease-in-out infinite",
              },
            },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute pointer-events-none rounded-full"
              style={b.style as React.CSSProperties}
            />
          ))}

          {/* Content */}
          <div className="relative z-10 flex flex-col w-full h-full px-12 xl:px-14 py-12">
            {/* Logo */}
            <div
              className="f-fade flex items-center gap-3"
              style={{ animationDelay: "0s" }}
            >
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.12)",
                }}
              >
                <FolderOpen className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Filebox
              </span>
            </div>

            {/* Headline */}
            <div
              className="mt-10 space-y-2 f-fade"
              style={{ animationDelay: ".15s" }}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-[.3em]"
                style={{ color: "rgba(255,255,255,.35)" }}
              >
                Cloud File Manager
              </p>
              <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-[1.15] tracking-tight">
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
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: "rgba(255,255,255,.42)" }}
              >
                Nested folders, PDF, images, audio and video — all in one
                beautifully structured drive.
              </p>
            </div>

            {/* Node graph */}
            <div
              className="flex-1 relative mt-4 f-fade"
              style={{ animationDelay: ".3s" }}
            >
              {/* SVG edges */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="eg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity=".55" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity=".15" />
                  </linearGradient>
                </defs>
                {EDGES.map(([a, b], i) => {
                  const from = NODES.find((n) => n.id === a)!;
                  const to = NODES.find((n) => n.id === b)!;
                  return (
                    <line
                      key={i}
                      className="f-edge"
                      x1={`${from.x + 2.5}%`}
                      y1={`${from.y + 2.5}%`}
                      x2={`${to.x + 2.5}%`}
                      y2={`${to.y + 2.5}%`}
                      stroke="url(#eg)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      style={{ animationDelay: `${0.5 + i * 0.15}s` }}
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
                    className="f-node absolute flex flex-col items-center gap-1.5"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      animationDelay: `${node.delay}s`,
                      animationDuration: `${3.5 + (node.id % 3) * 0.8}s`,
                    }}
                  >
                    {/* Pulse ring */}
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        // @ts-ignore
                        "--rc": `${node.color}55`,
                        animation: `pulseRing ${2.5 + node.id * 0.3}s ease-out infinite`,
                        animationDelay: `${node.delay + 0.5}s`,
                      }}
                    />
                    {/* Box */}
                    <div
                      className={`${s.box} rounded-2xl flex items-center justify-center relative`}
                      style={{
                        background: node.bg,
                        border: `1px solid ${node.color}44`,
                        boxShadow: `0 4px 24px ${node.color}22`,
                      }}
                    >
                      <Icon className={s.icon} style={{ color: node.color }} />
                    </div>
                    {/* Label */}
                    {s.label && (
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{
                          color: "rgba(255,255,255,.65)",
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

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-4 pt-7 f-fade"
              style={{
                borderTop: "1px solid rgba(255,255,255,.07)",
                animationDelay: ".5s",
              }}
            >
              {[
                { v: "10 GB", s: "Free storage" },
                { v: "256-bit", s: "Encryption" },
                { v: "99.9%", s: "Uptime SLA" },
              ].map((x) => (
                <div key={x.s}>
                  <div className="text-white text-lg font-bold tabular-nums">
                    {x.v}
                  </div>
                  <div
                    className="text-[11px] mt-0.5"
                    style={{ color: "rgba(255,255,255,.32)" }}
                  >
                    {x.s}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ RIGHT — form ═══ */}
        <div className="flex-1 flex flex-col justify-center items-center bg-background px-6 sm:px-10 py-16">
          {/* Mobile logo */}
          <div className="lg:hidden w-full max-w-md flex items-center gap-2 mb-10">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <FolderOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">Filebox</span>
          </div>

          <div className="w-full max-w-100">
            <div className="mb-8 space-y-1.5">
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome to Filebox
              </h2>
              <p className="text-sm text-muted-foreground">
                Sign in or create a free account below.
              </p>
            </div>

            <AuthTabs />

            <p className="text-center text-[11px] text-muted-foreground/55 mt-8 leading-relaxed">
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
