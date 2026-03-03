import { AppSidebar } from "@/components/shared/Sidebar";
import { AppHeader } from "@/components/shared/SidebarHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { User } from "@/types";

interface DashboardLayoutProps {
  user: User;
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-[calc(100vh-3.5rem)]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
