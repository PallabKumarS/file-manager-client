"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm, type LoginFormValues } from "./LoginForm";
import { RegisterForm, type RegisterFormValues } from "./RegisterForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AuthTabs() {
  const router = useRouter();

  async function handleLogin(values: LoginFormValues) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch {
      toast.error("Login failed. Please check your credentials.");
    }
  }

  async function handleRegister(values: RegisterFormValues) {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });
      if (!res.ok) throw new Error("Registration failed");
      toast.success("Account created! Please sign in.");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  }

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="w-full mb-6 h-11 bg-muted/60 p-1">
        <TabsTrigger
          value="login"
          className="flex-1 text-sm font-medium tracking-wide data-[state=active]:shadow-sm"
        >
          Sign In
        </TabsTrigger>
        <TabsTrigger
          value="register"
          className="flex-1 text-sm font-medium tracking-wide data-[state=active]:shadow-sm"
        >
          Register
        </TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <LoginForm onSubmit={handleLogin} />
      </TabsContent>

      <TabsContent value="register">
        <RegisterForm onSubmit={handleRegister} />
      </TabsContent>
    </Tabs>
  );
}
