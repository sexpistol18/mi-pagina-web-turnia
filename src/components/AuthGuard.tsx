"use client";

import React, { useEffect, useState } from "react";
import { useAuth, UserRole } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ShieldAlert, Scissors, UserCheck, ArrowRight, Lock } from "lucide-react";

interface AuthGuardProps {
  allowedRole: "entrepreneur" | "client";
  children: React.ReactNode;
}

export default function AuthGuard({ allowedRole, children }: AuthGuardProps) {
  const { role, login } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!role) {
        // If unauthenticated, redirect to home or allow quick login selector
      } else if (role !== allowedRole) {
        // Auto-redirect if role mismatch
        if (role === "entrepreneur") {
          router.push("/dashboard");
        } else if (role === "client") {
          router.push("/home");
        }
      }
    }
  }, [role, allowedRole, isMounted, router]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#2f2c79] border-t-transparent"></div>
      </div>
    );
  }

  // If role does not match allowedRole, show friendly guard prompt
  if (role !== allowedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1a1744] to-gray-900 flex items-center justify-center p-4 font-sans text-white">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/15 shadow-2xl text-center relative overflow-hidden">
          
          <div className="w-16 h-16 rounded-2xl bg-[#2f2c79] text-[#38bdf8] flex items-center justify-center mx-auto mb-5 shadow-lg border border-[#38bdf8]/30">
            <Lock className="w-8 h-8" />
          </div>

          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] text-xs font-bold border border-[#38bdf8]/30 mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Control de Acceso (Auth Guard)</span>
          </span>

          <h2 className="text-2xl font-black mb-2 text-white">
            Acceso Restringido por Rol
          </h2>

          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
            Esta sección está reservada exclusivamente para el rol{" "}
            <span className="font-extrabold text-[#38bdf8] uppercase">
              {allowedRole === "entrepreneur" ? "Emprendedor" : "Cliente"}
            </span>.
            {role ? (
              <span> Actualmente tenés sesión iniciada como <strong className="text-amber-400">{role === "entrepreneur" ? "Emprendedor" : "Cliente"}</strong>.</span>
            ) : (
              <span> Por favor selecciona tu rol para ingresar.</span>
            )}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => login(allowedRole)}
              className="w-full py-3.5 px-4 bg-[#2f2c79] hover:bg-[#23215c] text-white font-bold rounded-2xl shadow-lg border border-[#38bdf8]/30 transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer group"
            >
              {allowedRole === "entrepreneur" ? (
                <>
                  <Scissors className="w-4 h-4 text-[#38bdf8]" />
                  <span>Ingresar como Emprendedor</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 text-[#38bdf8]" />
                  <span>Ingresar como Cliente</span>
                </>
              )}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-2xl text-xs font-semibold transition-all cursor-pointer"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
