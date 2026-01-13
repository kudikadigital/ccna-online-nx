"use client";

import { CheckCircle2, Building2, ArrowRight, Users } from "lucide-react";

interface PricingProps {
  onOpenModal: () => void;
}

export default function Pricing({ onOpenModal }: PricingProps) {
  return (
    <section id="pricing" className="py-24 bg-slate-50 px-4 overflow-hidden relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase px-4 py-2 rounded-full tracking-[0.2em] mb-4 inline-block">
            Investimento Justo
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tighter italic">
            Dê o Próximo Passo<span className="text-blue-600">.</span>
          </h2>
          <p className="text-slate-500 mt-4 font-medium max-w-xl mx-auto italic text-lg">
            Condições especiais de lançamento para a próxima turma de especialistas em redes.
          </p>
        </div>

        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-400 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header do Card */}
            <div className="bg-slate-900 px-8 py-5 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-bold uppercase tracking-widest text-[11px]">Inscrições Abertas</span>
              </div>
              <span className="bg-blue-600 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg shadow-blue-500/20">
                Turma 2026.1
              </span>
            </div>

            <div className="p-8 md:p-16 flex flex-col items-center">
              {/* Preços */}
              <div className="text-center mb-12">
                <span className="text-slate-400 line-through text-xl font-bold italic opacity-60">
                  AOA 105.000
                </span>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-2">
                  <h3 className="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter">
                    80.000<span className="text-2xl ml-2 font-black text-slate-400 uppercase">AOA</span>
                  </h3>
                  <div className="bg-green-500 text-white text-[10px] font-black px-3 py-2 rounded-lg uppercase rotate-3 shadow-lg">
                    -25.000 Poupança
                  </div>
                </div>
                
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mx-auto">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 hover:border-blue-300 transition-colors">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">À Vista</p>
                    <p className="text-2xl font-black text-blue-600 tracking-tight">AOA 80.000</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 hover:border-blue-300 transition-colors">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Parcelado (2x)</p>
                    <p className="text-2xl font-black text-slate-800 tracking-tight">AOA 42.000</p>
                  </div>
                </div>
              </div>

              {/* Benefícios */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12 border-y border-slate-100 py-12">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-slate-800 uppercase tracking-tight text-sm">Currículo Completo</p>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">CCNA 1, 2 e 3 (Introdução, Switching/Routing e Enterprise Networking).</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-slate-800 uppercase tracking-tight text-sm">Laboratórios Reais</p>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Acesso total à plataforma oficial Cisco NetAcad e Packet Tracer.</p>
                  </div>
                </div>
              </div>

              {/* CTA e Social Proof */}
              <div className="w-full flex flex-col items-center gap-8">
                <button 
                  onClick={onOpenModal}
                  className="group relative inline-flex items-center justify-center w-full md:w-auto px-16 py-6 bg-green-600 hover:bg-green-500 text-white font-black text-2xl rounded-2xl transition-all duration-300 shadow-[0_20px_50px_rgba(22,163,74,0.3)] hover:-translate-y-1 active:scale-95 uppercase tracking-tighter"
                >
                  Garantir Minha Vaga
                  <ArrowRight className="h-7 w-7 ml-3 group-hover:translate-x-2 transition-transform" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden shadow-sm">
                        <div className="w-full h-full bg-linear-to-br from-slate-400 to-slate-600 flex items-center justify-center text-[10px] text-white font-bold">
                          {i === 4 ? "+" : <Users size={12}/>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.15em]">
                    Junte-se a <span className="text-blue-600 font-black">+40 alunos</span> já inscritos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}