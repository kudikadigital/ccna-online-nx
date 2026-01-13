"use client";

import { CheckCircle2, Target, Award, Rocket } from "lucide-react";

export default function Features() {
  return (
    <section id="sobre" className="py-24 bg-white px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4 block">
            Carreira & Oportunidades
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter italic">
            Para quem é este curso<span className="text-blue-600">?</span>
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            O CCNA Online é ideal para quem busca uma formação sólida em{" "}
            <span className="text-slate-900 font-bold underline decoration-blue-400 decoration-4 underline-offset-4">
              infraestrutura, roteamento e switching.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card Esquerda: Público-alvo */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 p-8 md:p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-blue-200 transition-all duration-300 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <Target className="text-blue-600 h-6 w-6" />
                <h3 className="text-blue-600 font-black uppercase tracking-widest text-xs">
                  Público-alvo
                </h3>
              </div>
              
              <ul className="space-y-8">
                {[
                  "Técnicos que buscam crescer na carreira e aumentar oportunidades.",
                  "Quem deseja trabalhar em NOC, ISPs, Telecom, Suporte e Infraestrutura.",
                  "Estudantes e recém-formados que buscam vantagem competitiva no mercado."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-slate-700 font-bold leading-tight tracking-tight">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card Direita: Conquistas */}
          <div className="lg:col-span-7 relative overflow-hidden bg-slate-950 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/20">
            {/* Efeito Visual de Fundo */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8">
                <Award className="text-blue-500 h-6 w-6" />
                <h3 className="text-2xl md:text-3xl font-black mb-0 uppercase tracking-tighter text-white italic">
                  O que você vai conquistar<span className="text-blue-500">.</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 flex-1">
                {[
                  { title: "Redes IP", desc: "Entender e montar redes IP com base sólida e profissional." },
                  { title: "Configuração", desc: "Configurar switches e roteadores Cisco de forma prática." },
                  { title: "Arquitetura", desc: "Trabalhar com endereçamento, sub-redes, VLANs e roteamento." },
                  { title: "Futuro", desc: "Compreender segurança básica, automação e redes modernas." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-white font-black uppercase text-[10px] tracking-widest">{item.title}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 flex items-center gap-4">
                <Rocket className="text-blue-500 h-5 w-5 animate-bounce" />
                <p className="text-blue-400 font-black text-xs uppercase tracking-[0.2em]">
                  Foco total em empregabilidade técnica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}