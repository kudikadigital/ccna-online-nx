"use client";

import { Target, Users, GraduationCap, Briefcase, Rocket, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function TargetAudience() {
  const profiles = [
    {
      icon: Users,
      title: "Iniciantes",
      description: "Quer entrar na área de Redes e Telecomunicações do zero.",
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-500/10",
      features: ["Sem experiência necessária", "Começo estruturado", "Base sólida"]
    },
    {
      icon: Target,
      title: "Técnicos",
      description: "Já é técnico e busca crescer na carreira, aumentando as oportunidades.",
      color: "from-purple-500 to-violet-400",
      bgColor: "bg-purple-500/10",
      features: ["Aprimorar habilidades", "Certificação oficial", "Salto profissional"]
    },
    {
      icon: Briefcase,
      title: "Profissionais",
      description: "Deseja trabalhar em NOC, ISPs, Telecom, Suporte e Infraestrutura.",
      color: "from-orange-500 to-amber-400",
      bgColor: "bg-orange-500/10",
      features: ["Especialização", "Mercado em alta", "Posições estratégicas"]
    },
    {
      icon: GraduationCap,
      title: "Estudantes",
      description: "É estudante ou recém-formado e busca uma vantagem competitiva no mercado.",
      color: "from-green-500 to-emerald-400",
      bgColor: "bg-green-500/10",
      features: ["Diferencial no CV", "Preparação prática", "Networking profissional"]
    }
  ];

  return (
    <section id="features" className="relative py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* Elementos de fundo decorativos */}
      <div className="absolute inset-0 z-0">
        {/* Gradientes sutis */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        {/* Grid sutil */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #3b82f6 1px, transparent 1px),
              linear-gradient(180deg, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-blue-600 font-bold uppercase text-sm tracking-wider">
              Perfil dos Alunos
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
            Este curso foi desenhado
            <span className="block">
              para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">si?</span>
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Se você se identifica com algum destes perfis, esta é a formação certa para impulsionar sua carreira em redes
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-8 hover:border-blue-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Número do card */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white flex items-center justify-center font-black text-sm">
                  0{index + 1}
                </div>
                
                {/* Ícone com gradiente */}
                <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${profile.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <Icon className="w-12 h-12 text-white" />
                  
                  {/* Efeito de brilho no ícone */}
                  <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Título */}
                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {profile.title}
                </h3>
                
                {/* Descrição */}
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {profile.description}
                </p>
                
                {/* Features */}
                <div className="space-y-3">
                  {profile.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full ${profile.bgColor} flex items-center justify-center`}>
                        <CheckCircle2 className="w-3 h-3" style={{
                          color: profile.color.includes('blue') ? '#3b82f6' :
                                 profile.color.includes('purple') ? '#8b5cf6' :
                                 profile.color.includes('orange') ? '#f97316' : '#10b981'
                        }} />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Linha decorativa inferior */}
                <div className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${profile.color} rounded-full opacity-30 group-hover:opacity-100 transition-all duration-500 transform origin-left scale-x-0 group-hover:scale-x-100`}></div>
              </div>
            );
          })}
        </div>

        {/* Seção de destaque */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-10 md:p-16 shadow-2xl shadow-blue-900/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Texto */}
            <div className="lg:w-2/3">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white">
                  Todos os perfis. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Uma só formação.</span>
                </h3>
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-3xl">
                Independente do seu nível atual, o CCNA Online do INEFOR foi estruturado para levar você do básico ao avançado, 
                com metodologia prática e foco total na certificação oficial da Cisco.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-white mb-2">100%</div>
                  <div className="text-sm text-slate-400">Prático</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white mb-2">3x</div>
                  <div className="text-sm text-slate-400">Mais rápido</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white mb-2">24/7</div>
                  <div className="text-sm text-slate-400">Suporte</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white mb-2">✓</div>
                  <div className="text-sm text-slate-400">Garantia</div>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-center relative overflow-hidden group">
                {/* Efeito de brilho */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <h4 className="text-2xl font-black text-white mb-4">Se identificou?</h4>
                <p className="text-blue-100 mb-6">
                  Sua jornada em redes começa aqui
                </p>
                
                <button className="group w-full bg-white text-slate-900 font-bold py-4 px-6 rounded-xl hover:bg-slate-100 transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
                  <span>Garantir minha vaga</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-4 h-4 text-yellow-400">★</div>
                    ))}
                  </div>
                  <span className="text-sm text-blue-200">+500 alunos satisfeitos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}