"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, FolderArchive, ShieldCheck } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { PackageType, Role } from "@/types/enums";
import { getNavItems } from "@/lib/routes";
import { useAuth } from "@/provider/AuthContext";

// ── package badge colors ──────────────────────────────────────────────────
const pkgStyles: Record<string, { dot: string; label: string }> = {
  [PackageType.FREE]: { dot: "bg-slate-400", label: "text-slate-500" },
  [PackageType.SILVER]: { dot: "bg-stone-400", label: "text-stone-500" },
  [PackageType.GOLD]: { dot: "bg-amber-500", label: "text-amber-600" },
  [PackageType.DIAMOND]: { dot: "bg-pink-500", label: "text-pink-600" },
};

// ── helper ─────────────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ── Props ──────────────────────────────────────────────────────────────────

// ── Component ──────────────────────────────────────────────────────────────
export function AppSidebar() {
  const { user, logout } = useAuth();

  const pathname = usePathname();
  const navItems = getNavItems(user?.role ?? Role.USER);
  const pkg = pkgStyles[user?.subscription?.type ?? PackageType.FREE];
  const initials = getInitials(user?.name ?? "");

  return (
    <Sidebar collapsible="icon">
      {/* ── Logo ── */}
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 shadow-sm">
            <FolderArchive className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            FileBox
          </span>
        </div>
      </SidebarHeader>

      {/* ── User mini-card ── */}
      <div className="mx-3 mt-4 mb-1 group-data-[collapsible=icon]:mx-2 group-data-[collapsible=icon]:mt-3">
        <div className="flex items-center gap-3 rounded-xl bg-linear-to-br from-indigo-50 to-violet-50 p-3 border border-indigo-100/70 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
          {/* avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-sm">
            {initials}
          </div>
          {/* info — hidden when collapsed */}
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold text-slate-800">
              {user?.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", pkg.dot)} />
              <span className={cn("text-[11px] font-medium", pkg.label)}>
                {user?.subscription?.type ?? "FREE"}
              </span>
              {user?.role === Role.ADMIN && (
                <span className="ml-1 inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-px text-[10px] font-semibold text-amber-700">
                  <ShieldCheck className="h-2.5 w-2.5" />
                  Admin
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            {user?.role === Role.ADMIN ? "Admin" : "Navigation"}
          </SidebarGroupLabel>

          <SidebarMenu>
            {navItems.map(({ id, label, href, icon: Icon }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={label}
                    className={cn(
                      "transition-all",
                      isActive &&
                        "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white [&>svg]:text-indigo-100",
                    )}
                  >
                    <Link href={href}>
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer / sign-out ── */}
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              className="text-slate-500 hover:bg-red-50 hover:text-red-600 [&>svg]:text-slate-400 hover:[&>svg]:text-red-500 transition-colors"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
