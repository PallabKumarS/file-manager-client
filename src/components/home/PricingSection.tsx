import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PLANS = [
  {
    id: "FREE",
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for personal use and trying out Filebox.",
    badge: null,
    features: [
      "10 GB total storage",
      "Up to 50 folders",
      "3 nesting levels",
      "10 files per folder",
      "Max 5 MB per file",
      "PDF & Image support",
    ],
    cta: "Get started free",
    highlight: false,
  },
  {
    id: "SILVER",
    name: "Silver",
    price: "$5",
    period: "/month",
    description: "For professionals who need more space and flexibility.",
    badge: null,
    features: [
      "50 GB total storage",
      "Up to 200 folders",
      "5 nesting levels",
      "50 files per folder",
      "Max 25 MB per file",
      "PDF, Image & Audio",
    ],
    cta: "Upgrade to Silver",
    highlight: false,
  },
  {
    id: "GOLD",
    name: "Gold",
    price: "$12",
    period: "/month",
    description: "Teams and power users who need serious storage.",
    badge: "Most Popular",
    features: [
      "250 GB total storage",
      "Unlimited folders",
      "10 nesting levels",
      "200 files per folder",
      "Max 100 MB per file",
      "All file types",
      "Version history",
      "Priority support",
    ],
    cta: "Upgrade to Gold",
    highlight: true,
  },
  {
    id: "DIAMOND",
    name: "Diamond",
    price: "$29",
    period: "/month",
    description: "Enterprise-grade storage with advanced features.",
    badge: null,
    features: [
      "2 TB total storage",
      "Unlimited everything",
      "Unlimited nesting",
      "Unlimited files",
      "Max 5 GB per file",
      "All file types",
      "Version history",
      "Dedicated support",
      "Custom domain",
      "Admin dashboard",
    ],
    cta: "Upgrade to Diamond",
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground text-base">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-2xl border p-6 flex flex-col gap-6 transition-all duration-200",
                plan.highlight
                  ? "border-primary bg-primary text-primary-foreground shadow-xl scale-[1.02]"
                  : "border-border/60 bg-card hover:border-border hover:shadow-md",
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gap-1 bg-background text-foreground border shadow-sm px-3 py-0.5 text-xs font-semibold">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <div>
                <h3
                  className={cn(
                    "font-bold text-sm uppercase tracking-widest mb-1",
                    plan.highlight
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground",
                  )}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tabular-nums">
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.highlight
                        ? "text-primary-foreground/60"
                        : "text-muted-foreground",
                    )}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-sm mt-2 leading-snug",
                    plan.highlight
                      ? "text-primary-foreground/75"
                      : "text-muted-foreground",
                  )}
                >
                  {plan.description}
                </p>
              </div>
              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={cn(
                        "h-4 w-4 mt-0.5 shrink-0",
                        plan.highlight
                          ? "text-primary-foreground"
                          : "text-primary",
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm",
                        plan.highlight ? "text-primary-foreground/85" : "",
                      )}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlight ? "secondary" : "default"}
                className="w-full font-semibold"
                asChild
              >
                <Link href="/auth">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-10">
          All plans include a 14-day free trial of Gold features. Downgrade
          anytime, no questions asked.
        </p>
      </div>
    </section>
  );
}
