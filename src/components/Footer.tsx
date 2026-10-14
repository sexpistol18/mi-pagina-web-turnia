"use client";

import React from "react";
import { Phone, Mail, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 border-b border-gray-800 items-start">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/Turnia-wh.svg" 
                alt="Turnia Logo" 
                className="h-9 w-auto" 
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              La plataforma de agendamiento automático de turnos para emprendedores en <span className="text-[#38bdf8] font-semibold">Argentina</span>. Sin perder tiempo en mensajes.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <MapPin className="w-4 h-4 text-[#38bdf8]" />
              <span>Argentina</span>
            </div>
          </div>

          {/* Contacto Col */}
          <div className="md:justify-self-end w-full md:w-auto">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#38bdf8] pl-2">
              Contacto Directo
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+542945450000"
                  className="flex items-center space-x-3 text-gray-300 hover:text-[#38bdf8] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-[#38bdf8]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+54 (2945) 15-548920</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@turnia.app"
                  className="flex items-center space-x-3 text-gray-300 hover:text-[#38bdf8] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-[#38bdf8]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>contacto@turnia.app</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Turnia. Todos los derechos reservados. Argentina.</p>
          <div className="flex items-center space-x-1">
            <span>Desarrollado para Emprendedores de Argentina</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </div>
        </div>

      </div>
    </footer>
  );
}
