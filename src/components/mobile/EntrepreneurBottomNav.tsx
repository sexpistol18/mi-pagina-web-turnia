"use client";

import React from "react";
import { LayoutDashboard, Calendar, Scissors, Settings } from "lucide-react";

interface EntrepreneurBottomNavProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export default function EntrepreneurBottomNav({
  activeTab = "panel",
  onSelectTab,
}: EntrepreneurBottomNavProps) {
  const items = [
    { id: "panel", label: "Panel", icon: LayoutDashboard },
    { id: "calendario", label: "Calendario", icon: Calendar, badge: "3" },
    { id: "servicios", label: "Servicios", icon: Scissors },
    { id: "ajustes", label: "Ajustes", icon: Settings },
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
              {item.badge && (
                <span className="absolute -top-1 -right-2 bg-[#0284c7] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#2f2c79]">
                  {item.badge}
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
