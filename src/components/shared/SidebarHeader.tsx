"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { getNavItems } from "@/lib/routes";
import { useAuth } from "@/provider/AuthContext";
import { Role } from "@/types/enums";
import Link from "next/link";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function AppHeader() {
  const { user } = useAuth();
  const pathname = usePathname();
  const navItems = getNavItems(user?.role ?? Role.USER);

  const currentNav = navItems.find(
    (n) => pathname === n.href || pathname.startsWith(`${n.href}/`),
  );
  const pageLabel = currentNav?.label ?? "Dashboard";

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background/80 backdrop-blur-md px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />

      <Breadcrumb className="flex-1">
        <BreadcrumbList>
          <Link href="/">
            <BreadcrumbItem className="hidden sm:block text-muted-foreground text-xs">
              FileBox
            </BreadcrumbItem>
          </Link>
          <BreadcrumbSeparator className="hidden sm:block" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-sm font-semibold">
              {pageLabel}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-1 ring-background" />
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-bold shadow-sm">
          {getInitials(user?.name ?? "")}
        </div>
      </div>
    </header>
  );
}
