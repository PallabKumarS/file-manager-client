"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/types"; // adjust path
import { logoutUser } from "@/services/AuthService";
import { getMe } from "@/services/UserService";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const fetchCurrentUser = async () => {
        try {
          const res = await getMe();
          if (res.success) {
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
          } else {
            setUser(null);
            console.error("Failed to fetch current user:", res.error);
          }
        } catch (error) {
          console.error("Failed to fetch current user:", error);
          setUser(null);
        }
      };

      fetchCurrentUser();
    }
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
