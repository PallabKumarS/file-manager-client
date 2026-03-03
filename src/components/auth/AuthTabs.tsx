/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm, type LoginFormValues } from "./LoginForm";
import { RegisterForm, type RegisterFormValues } from "./RegisterForm";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/services/AuthService";
import { createUser } from "@/services/UserService";

export function AuthTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectPath") || "/dashboard/profile";

  async function handleLogin(values: LoginFormValues) {
    const toastId = toast.loading("Signing in...");
    try {
      const res = await loginUser(values);

      console.log(res);

      if (res.success) {
        toast.success("Welcome back!", { id: toastId });
        router.push(redirectPath);
      } else {
        toast.error(
          res.message || "Login failed. Please check your credentials.",
          { id: toastId },
        );
      }
    } catch (error: any) {
      toast.error(
        error.message || "Login failed. Please check your credentials.",
        { id: toastId },
      );
    }
  }

  async function handleRegister(values: RegisterFormValues) {
    const toastId = toast.loading("Creating account...");
    try {
      const res = await createUser(values);
      if (!res.success) {
        toast.error(res.message || "Registration failed. Please try again.", {
          id: toastId,
        });
        return;
      }
      toast.success("Account created! Please sign in.", { id: toastId });
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.", {
        id: toastId,
      });
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
