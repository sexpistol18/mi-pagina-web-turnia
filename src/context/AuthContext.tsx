"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export type UserRole = "entrepreneur" | "client" | null;

interface UserProfile {
  name: string;
  emailOrPhone: string;
  role: UserRole;
  shopName?: string;
  location?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  login: (role: "entrepreneur" | "client", userData?: Partial<UserProfile>) => void;
  logout: () => void;
  switchRole: (role: "entrepreneur" | "client") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Restore saved role from localStorage if available
  useEffect(() => {
    const savedRole = localStorage.getItem("turnia_role") as UserRole;
    if (savedRole && (savedRole === "entrepreneur" || savedRole === "client")) {
      setRole(savedRole);
      setUser({
        name: savedRole === "entrepreneur" ? "Marcos Barber" : "Juan Pérez",
        emailOrPhone: savedRole === "entrepreneur" ? "patagoniacuts@gmail.com" : "juan.perez@gmail.com",
        role: savedRole,
        shopName: savedRole === "entrepreneur" ? "Barbería Patagonia Cuts - Argentina" : undefined,
        location: "Argentina",
      });
    }
  }, []);

  const login = (newRole: "entrepreneur" | "client", userData?: Partial<UserProfile>) => {
    setRole(newRole);
    const profile: UserProfile = {
      name: userData?.name || (newRole === "entrepreneur" ? "Barbería Patagonia Cuts" : "Juan Pérez"),
      emailOrPhone: userData?.emailOrPhone || (newRole === "entrepreneur" ? "contacto@patagoniacuts.com" : "juan.perez@gmail.com"),
      role: newRole,
      shopName: newRole === "entrepreneur" ? "Barbería Patagonia Cuts - Argentina" : undefined,
      location: "Argentina",
    };
    setUser(profile);
    localStorage.setItem("turnia_role", newRole);

    // Auth Guard Redirect rule enforcement:
    if (newRole === "entrepreneur") {
      router.push("/dashboard");
    } else if (newRole === "client") {
      router.push("/home");
    }
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    localStorage.removeItem("turnia_role");
    router.push("/");
  };

  const switchRole = (newRole: "entrepreneur" | "client") => {
    login(newRole);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
