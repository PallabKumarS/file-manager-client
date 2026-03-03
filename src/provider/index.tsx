"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import type { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </AuthProvider>
  );
};

export default Provider;
