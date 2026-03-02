import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-150 rounded-full bg-primary/8 blur-[120px] -translate-y-1/4" />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Badge
          variant="secondary"
          className="gap-1.5 px-3 py-1 text-xs font-medium"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          Now available — Free tier includes 10 GB
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
          Your files.
          <br />
          <span className="text-muted-foreground/60">
            Beautifully organized.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Filebox is a modern cloud file manager — nested folders, multiple file
          types, tiered storage plans, and a clean interface that gets out of
          your way.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            size="lg"
            className="w-full sm:w-auto gap-2 px-7 h-12 text-base font-semibold"
            asChild
          >
            <Link href="/auth">
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto gap-2 px-7 h-12 text-base"
          >
            <Play className="h-4 w-4" />
            Watch demo
          </Button>
        </div>

        <p className="text-xs text-muted-foreground/60">
          No credit card required · Free plan forever · Upgrade anytime
        </p>
      </div>

      {/* App preview mockup */}
      <div className="relative mt-16 w-full max-w-5xl mx-auto px-4">
        <div className="relative rounded-2xl border border-border/60 shadow-2xl overflow-hidden bg-card">
          {/* Fake browser bar */}
          <div className="flex items-center gap-2 px-4 h-10 bg-muted/40 border-b border-border/40">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="flex-1 mx-4">
              <div className="h-5 rounded-md bg-border/50 max-w-xs mx-auto" />
            </div>
          </div>

          {/* Fake UI skeleton */}
          <div className="grid grid-cols-[220px_1fr] min-h-80 sm:min-h-95">
            {/* Sidebar skeleton */}
            <div className="border-r border-border/40 p-4 space-y-3 hidden sm:block">
              <div className="h-4 rounded bg-muted w-3/4" />
              <div className="space-y-2 pl-2">
                {[80, 60, 70, 50, 65].map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-primary/20 shrink-0" />
                    <div
                      className="h-3 rounded bg-muted"
                      style={{ width: `${w}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="pt-4 space-y-2">
                <div className="h-3 rounded bg-muted w-1/2" />
                <div className="h-2 rounded bg-muted/60 w-full" />
                <div className="h-1.5 rounded-full bg-primary/30 w-full overflow-hidden">
                  <div className="h-full bg-primary w-2/5 rounded-full" />
                </div>
                <div className="h-2.5 rounded bg-muted/50 w-2/3" />
              </div>
            </div>

            {/* Content skeleton */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-5 rounded bg-muted w-32" />
                <div className="flex gap-2">
                  <div className="h-7 w-7 rounded bg-muted" />
                  <div className="h-7 w-20 rounded bg-primary/20" />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border/40 p-3 space-y-2 bg-muted/20"
                  >
                    <div
                      className="h-10 rounded-lg"
                      style={{
                        background: [
                          "hsl(var(--chart-1)/0.15)",
                          "hsl(var(--chart-2)/0.15)",
                          "hsl(var(--chart-3)/0.15)",
                          "hsl(var(--chart-4)/0.15)",
                        ][i % 4],
                      }}
                    />
                    <div className="h-2.5 rounded bg-muted w-3/4" />
                    <div className="h-2 rounded bg-muted/60 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
