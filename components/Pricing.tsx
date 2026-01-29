"use client";

import { CheckCircle2, Clock, Zap, Shield, Award, Users, ArrowRight, AlertTriangle } from "lucide-react";

interface PricingProps {
  onOpenModal: () => void;
}

export default function Pricing({ onOpenModal }: PricingProps) {
  const features = [
    "Formação de CCNA-V7 completa",
    "CCNA 1: Fundamentos de Redes",
    "CCNA 2: Switching, Roteamento e Wireless",
    "CCNA 3: Redes Corporativas, Segurança e Automação",
    "Acesso à NETACAD Cisco",
    "Certificado de conclusão por módulo (CISCO)",
    "Acompanhamento e suporte especializado",
    "Laboratórios e exercícios práticos",
    "Preparação para o mercado de trabalho",
    "Acesso à comunidade exclusiva"
  ];

  return (
    <section id="investimento" className="relative py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Elementos de fundo */}
      <div className="absolute inset-0 z-0">
        {/* Luzes coloridas */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[100px]"></div>
        
        {/* Padrão geométrico */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="#3b82f6" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-8">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-bold uppercase text-sm tracking-wider">
              Oportunidade Única
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            O Seu Investimento Para Uma
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Carreira de Sucesso
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Transforme 80.000 AOA em uma carreira que pode render milhões. O melhor investimento da sua vida profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Card de Esquerda - O Que Está Incluso */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white">
                  Veja abaixo o que está incluso
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-slate-300 group-hover:text-white transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Comparação de Retorno */}
              <div className="mt-12 pt-8 border-t border-slate-700/50">
                <h4 className="text-lg font-black text-white mb-4 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Retorno sobre o Investimento
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-green-400 mb-1">12x</div>
                    <div className="text-sm text-slate-400">Mais rápido</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-blue-400 mb-1">+300%</div>
                    <div className="text-sm text-slate-400">Aumento salarial</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-cyan-400 mb-1">6 meses</div>
                    <div className="text-sm text-slate-400">Para recuperar o investimento</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card de Direita - Preço */}
          <div className="relative">
            {/* Efeito de brilho */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8">
              {/* Banner de desconto */}
              <div className="absolute top-6 -right-16 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-black py-2 px-16 rotate-45 shadow-lg rounded-full">
                -25.000 AOA
              </div>
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-2 rounded-full mb-6">
                  <Clock className="w-4 h-4" />
                  OFERTA POR TEMPO LIMITADO
                </div>
                
                <div className="mb-6">
                  <div className="text-slate-400 text-sm font-medium mb-2">Investimento</div>
                  <div className="text-4xl font-black text-slate-400 line-through">105.000 AOA</div>
                </div>
                
                {/* Preço principal */}
                <div className="mb-8">
                  <div className="text-7xl md:text-8xl font-black text-white mb-2">
                    80.000
                  </div>
                  <div className="text-xl text-slate-300">AOA (à vista)</div>
                </div>
                
                {/* Opção parcelada */}
                <div className="bg-slate-800/50 rounded-2xl p-6 mb-8">
                  <div className="text-slate-400 text-sm mb-2">Ou parcele em</div>
                  <div className="text-3xl font-black text-white">2x de 42.000 AOA</div>
                  <div className="text-sm text-slate-400 mt-2">Total: 84.000 AOA</div>
                </div>
              </div>
              
              {/* Aviso de urgência */}
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-4 mb-8">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm font-bold text-white">As vagas serão encerradas automaticamente</p>
                    <p className="text-xs text-slate-400">Quando atingirmos o limite de qualidade</p>
                  </div>
                </div>
              </div>
              
              {/* CTA Principal */}
              <button
                onClick={onOpenModal}
                className="group w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-black text-xl py-5 rounded-2xl hover:from-blue-500 hover:to-emerald-400 transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-2xl shadow-blue-500/25 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center gap-3">
                  INSCREVA-SE AGORA COM DESCONTO
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
              
              {/* Garantia */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm text-slate-400">
                  Garantia de satisfação ou seu dinheiro de volta
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {i === 4 ? "+" : <Users className="w-6 h-6" />}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-2xl font-black text-white">+500</div>
                <div className="text-slate-400 text-sm">Profissionais já formados</div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-5 h-5 text-yellow-400">★</div>
                ))}
              </div>
              <div className="text-slate-300 font-medium">4.9/5 baseado em 247 avaliações</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}