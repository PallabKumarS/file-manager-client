import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl bg-primary text-primary-foreground overflow-hidden px-8 sm:px-16 py-16 text-center">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl pointer-events-none" />
          <div className="relative space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to organize your files?
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto leading-relaxed">
              Join thousands of users who trust Filebox to keep their documents,
              images, and media safe.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto gap-2 px-8 h-12 text-base font-semibold"
                asChild
              >
                <Link href="/auth">
                  Get started free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-xs text-primary-foreground/50">
              Free forever. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
