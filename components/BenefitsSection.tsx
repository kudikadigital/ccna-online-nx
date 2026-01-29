"use client";

import {
  CheckCircle2,
  Users,
  PlayCircle,
  BookOpen,
  Target,
  Globe,
  Award,
  Network,
} from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Users,
      title: "Turmas com vagas limitadas",
      description:
        "Atenção personalizada e qualidade garantida com turmas reduzidas",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: PlayCircle,
      title: "Aulas ao vivo + gravação",
      description: "Assista ao vivo e reveja as aulas quando quiser",
      color: "from-green-500 to-emerald-400",
    },
    {
      icon: BookOpen,
      title: "Conteúdo oficial CCNA-V7",
      description: "Material alinhado aos 3 módulos oficiais da Cisco",
      color: "from-violet-500 to-purple-400",
    },
    {
      icon: Target,
      title: "Foco total em empregabilidade",
      description: "Preparação direcionada para o mercado de trabalho",
      color: "from-orange-500 to-amber-400",
    },
    {
      icon: Globe,
      title: "Plataforma Cisco Networking Academy",
      description: "Acesso à plataforma oficial da Cisco para prática",
      color: "from-indigo-500 to-blue-400",
    },
    {
      icon: Award,
      title: "Certificado CISCO oficial",
      description: "Certificado de conclusão reconhecido internacionalmente",
      color: "from-yellow-500 to-amber-400",
    },
    {
      icon: Network,
      title: "Comunidade INC e networking",
      description: "Conecte-se com profissionais e expanda sua rede",
      color: "from-rose-500 to-pink-400",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white py-24 px-4 overflow-hidden">
      {/* Efeito de Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradientes sutis */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>

        {/* Grid sutil */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #3b82f6 1px, transparent 1px),
              linear-gradient(180deg, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 80%)",
          }}
        ></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            BENEFÍCIOS EXCLUSIVOS
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            Por que esta é a formação que vai{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              impulsionar a sua carreira
            </span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Tudo que você precisa para se tornar um profissional de redes de
            alta demanda
          </p>
        </div>

        {/* Grid de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Ícone com gradiente */}
                <div
                  className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <Icon className="w-10 h-10 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>

                {/* Linha decorativa */}
                <div
                  className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${benefit.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
