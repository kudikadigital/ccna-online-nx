"use client";

import { useState } from "react";
import { X, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnrollModal({ isOpen, onClose }: EnrollModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Candidatura Enviada!", {
          description: "O INEFOR entrará em contacto via WhatsApp em breve.",
          className: "bg-slate-900 text-white border-blue-500/50",
        });
        onClose();
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("Falha no envio");
      }
    } catch (error) {
      toast.error("Erro ao enviar", {
        description: "Verifique sua conexão e tente novamente.",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop com Blur Profundo */}
      <div
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-slate-950 w-full max-w-lg rounded-[2.5rem] shadow-[0_0_50px_rgba(37,99,235,0.2)] border border-slate-800 overflow-hidden transform transition-all animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500">
        {/* Background Grid (Igual à Hero) */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>

        {/* Header com Gradiente */}
        <div className="relative bg-linear-to-br from-blue-600 to-blue-800 p-10 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full mb-3 border border-white/10">
                <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Inscrição Prioritária
                </span>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter leading-none italic">
                PRÉ-INSCRIÇÃO{" "}
                <span className="block text-blue-200">CCNAv7</span>
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-black/20 p-2 rounded-xl transition-all"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form Estilizado */}
        <form onSubmit={handleSubmit} className="relative p-10 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-blue-500 mb-2 tracking-[0.2em]">
                Nome do Candidato
              </label>
              <input
                type="text"
                name="nome"
                required
                placeholder="Ex: Manuel dos Santos"
                className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white font-medium placeholder:text-slate-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-blue-500 mb-2 tracking-[0.2em]">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  placeholder="9xx xxx xxx"
                  className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white font-medium placeholder:text-slate-600"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-blue-500 mb-2 tracking-[0.2em]">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="seu@email.com"
                  className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white font-medium placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-blue-500 mb-2 tracking-[0.2em]">
                Plano de Investimento
              </label>
              <div className="relative">
                <select
                  name="pagamento"
                  className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white font-bold appearance-none cursor-pointer"
                >
                  <option value="vista">80.000 AOA (À VISTA - 20% OFF)</option>
                  <option value="parcelado">42.000 AOA (2 PARCELAS)</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full py-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all uppercase tracking-tighter text-xl active:scale-95 flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              </div>
            ) : (
              <>
                Confirmar Minha Vaga
                <ShieldCheck className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 opacity-50">
            <ShieldCheck className="h-3 w-3 text-green-500" />
            <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">
              Ambiente Seguro & Criptografado INEFOR
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
