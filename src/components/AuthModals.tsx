"use client";

import React, { useState } from "react";
import { X, Scissors, UserCheck, ShieldCheck, Mail, Phone, Lock, User, Send } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalsProps {
  isOpen: boolean;
  mode: "emprendedor" | "cliente" | null;
  onClose: () => void;
  onSwitchMode: (mode: "emprendedor" | "cliente") => void;
}

export default function AuthModals({ isOpen, mode, onClose, onSwitchMode }: AuthModalsProps) {
  const { login } = useAuth();

  // Form states for Emprendedor
  const [empNombre, setEmpNombre] = useState("");
  const [empContacto, setEmpContacto] = useState("");
  const [empMensaje, setEmpMensaje] = useState("");
  const [empEnviado, setEmpEnviado] = useState(false);

  // Form states for Cliente Normal
  const [cliNombre, setCliNombre] = useState("");
  const [cliContacto, setCliContacto] = useState("");
  const [cliPassword, setCliPassword] = useState("");
  const [cliConfirmPassword, setCliConfirmPassword] = useState("");
  const [cliEnviado, setCliEnviado] = useState(false);

  if (!isOpen || !mode) return null;

  const handleEmprendedorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmpEnviado(true);
    setTimeout(() => {
      setEmpEnviado(false);
      onClose();
      // Auth Guard automatic redirect rule 2: if role is 'entrepreneur', redirect to /dashboard
      login("entrepreneur", { name: empNombre || "Barbería Patagonia Cuts", emailOrPhone: empContacto });
    }, 1200);
  };

  const handleClienteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCliEnviado(true);
    setTimeout(() => {
      setCliEnviado(false);
      onClose();
      // Auth Guard automatic redirect rule 3: if role is 'client', redirect to /home
      login("client", { name: cliNombre || "Juan Pérez", emailOrPhone: cliContacto });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-300">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform transition-all scale-100">
        
        {/* Header bar of modal */}
        <div className="bg-[#2f2c79] text-[#fbf1e9] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/Turnia-wh.svg" alt="Turnia Logo" className="h-6 w-auto" />
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#fbf1e9] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher inside modal */}
        <div className="flex border-b border-gray-100 bg-gray-50">
          <button
            onClick={() => onSwitchMode("emprendedor")}
            className={`flex-1 py-3 px-4 text-sm font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer ${
              mode === "emprendedor"
                ? "bg-white text-[#2f2c79] border-b-2 border-[#2f2c79]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Entrar como emprendedor</span>
          </button>
          <button
            onClick={() => onSwitchMode("cliente")}
            className={`flex-1 py-3 px-4 text-sm font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer ${
              mode === "cliente"
                ? "bg-white text-[#2f2c79] border-b-2 border-[#2f2c79]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Usuario normal (cliente)</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {mode === "emprendedor" ? (
            <div>
              <div className="mb-5">
                <h3 className="text-xl font-bold text-gray-900">Entrar como emprendedor</h3>
                <p className="text-sm text-[#4b5563] mt-1">
                  Registrá tu barbería o emprendimiento en <span className="font-semibold text-[#0284c7]">Argentina</span> para acceder al panel <code className="bg-gray-100 px-1 rounded text-[#2f2c79]">/dashboard</code>.
                </p>
              </div>

              {empEnviado ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
                  <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-bold text-emerald-900 text-lg">¡Redirigiendo a /dashboard!</h4>
                  <p className="text-sm text-emerald-700 mt-1">
                    Iniciando sesión como Emprendedor...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEmprendedorSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Nombre
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={empNombre}
                        onChange={(e) => setEmpNombre(e.target.value)}
                        placeholder="Ej: Marcos Barber"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2f2c79]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Gmail o Número de Teléfono
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={empContacto}
                        onChange={(e) => setEmpContacto(e.target.value)}
                        placeholder="ejemplo@gmail.com o 2945XXXXXX"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2f2c79]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Mensaje para validar emprendimiento
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={empMensaje}
                      onChange={(e) => setEmpMensaje(e.target.value)}
                      placeholder="Contanos brevemente sobre tu barbería (ubicación, servicios, etc.)..."
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2f2c79]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#2f2c79] hover:bg-[#23215c] text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Ingresar como Emprendedor (/dashboard)</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div>
              <div className="mb-5">
                <h3 className="text-xl font-bold text-gray-900">Usuario normal (cliente)</h3>
                <p className="text-sm text-[#4b5563] mt-1">
                  Iniciá sesión para ingresar al área de clientes <code className="bg-gray-100 px-1 rounded text-[#0284c7]">/home</code>.
                </p>
              </div>

              {cliEnviado ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
                  <UserCheck className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-bold text-emerald-900 text-lg">¡Redirigiendo a /home!</h4>
                  <p className="text-sm text-emerald-700 mt-1">
                    Iniciando sesión como Cliente...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleClienteSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Nombre
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={cliNombre}
                        onChange={(e) => setCliNombre(e.target.value)}
                        placeholder="Tu nombre completo"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2f2c79]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Gmail o número teléfono
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={cliContacto}
                        onChange={(e) => setCliContacto(e.target.value)}
                        placeholder="tuemail@gmail.com o teléfono"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2f2c79]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        value={cliPassword}
                        onChange={(e) => setCliPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2f2c79]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Validar contraseña
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        value={cliConfirmPassword}
                        onChange={(e) => setCliConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2f2c79]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-2 bg-[#2f2c79]/15 hover:bg-[#2f2c79]/25 text-[#2f2c79] border border-[#2f2c79]/30 font-bold rounded-xl transition-all flex items-center justify-center space-x-2 text-sm shadow-xs cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 text-[#2f2c79]" />
                    <span>Ingresar como Cliente (/home)</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
