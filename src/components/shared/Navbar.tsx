"use client";

import { useState, useEffect } from "react";
import { FolderOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Role } from "@/types/enums";
import { logoutUser } from "@/services/AuthService";
import { toast } from "sonner";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar({
  currentUser,
}: {
  currentUser: { name?: string; role: Role; email: string; id: string } | null;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.success) {
      window.location.href = "/";
    } else {
      toast.error(res.message || "Logout failed. Please try again.");
    }
  };

  return (
    <nav className="h-16">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm"
            : "bg-transparent",
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <FolderOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">Filebox</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/profile">Go to Dashboard</Link>
                </Button>
                <Button size="sm" asChild onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth">Get Started Free</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-4 py-4 space-y-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1.5"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2 border-t border-border">
              {currentUser ? (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/profile">Go to Dashboard</Link>
                  </Button>
                  <Button size="sm" asChild onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/auth">Sign In</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/auth">Get Started Free</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </nav>
  );
}
