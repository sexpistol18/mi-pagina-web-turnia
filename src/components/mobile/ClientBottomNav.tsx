"use client";

import React from "react";
import { Home, Search, CalendarDays, User } from "lucide-react";

interface ClientBottomNavProps {
  activeTab?: string;
  hasUnreadNotification?: boolean;
  onSelectTab?: (tab: string) => void;
}

export default function ClientBottomNav({
  activeTab = "inicio",
  hasUnreadNotification = true,
  onSelectTab,
}: ClientBottomNavProps) {
  const items = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "busqueda", label: "Búsqueda", icon: Search },
    {
      id: "mis-turnos",
      label: "Mis Turnos",
      icon: CalendarDays,
      hasRedDot: hasUnreadNotification,
    },
    { id: "perfil", label: "Perfil", icon: User },
  ];

  return (
    <nav className="w-full bg-[#2f2c79] text-[#fbf1e9] border-t border-[#38bdf8]/20 px-3 py-2 flex items-center justify-around rounded-b-3xl shadow-2xl relative z-10">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab && onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer relative ${
              isActive
                ? "text-[#38bdf8] font-bold scale-105"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? "text-[#38bdf8]" : ""}`} />
              
              {/* PUNTO ROJO BRILLANTE DE NOTIFICACIÓN NO LEÍDA (RED DOT BADGE) */}
              {item.hasRedDot && (
                <span className="absolute -top-1 -right-1.5 flex h-3.5 w-3.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-[#2f2c79]"></span>
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-[#38bdf8] mt-0.5"></span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
