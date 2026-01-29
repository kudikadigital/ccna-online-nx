"use client";

import {
  Target,
  Server,
  Cpu,
  Shield,
  Zap,
  Layers,
  Globe,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

interface SkillsSectionProps {
  onOpenModal: () => void;
}

export default function SkillsSection({ onOpenModal }: SkillsSectionProps) {
  const skills = [
    {
      icon: Server,
      title: "Redes IP Profissionais",
      description: "Entender e montar redes IP com base sólida e profissional",
      color: "from-blue-500 to-cyan-400",
      details: ["Protocolos TCP/IP", "Modelo OSI", "Topologias de rede"],
    },
    {
      icon: Cpu,
      title: "Configuração de Equipamentos",
      description:
        "Configurar switches e roteadores Cisco de forma prática e eficiente",
      color: "from-purple-500 to-violet-400",
      details: ["CLI Commands", "IOS Configuration", "Troubleshooting"],
    },
    {
      icon: Layers,
      title: "Arquitetura de Redes",
      description:
        "Trabalhar com endereçamento, sub-redes, VLANs e roteamento avançado",
      color: "from-green-500 to-emerald-400",
      details: ["Subnetting", "VLANs & Trunking", "Routing Protocols"],
    },
    {
      icon: Shield,
      title: "Segurança Básica",
      description: "Compreender segurança básica, automação e redes modernas",
      color: "from-orange-500 to-amber-400",
      details: ["ACLs", "Firewall Basics", "Network Automation"],
    },
  ];

  const milestones = [
    { number: "1º", title: "Introdução a Redes", desc: "Fundamentos sólidos" },
    { number: "2º", title: "Conectividade", desc: "Switching e Routing" },
    { number: "3º", title: "Escalabilidade", desc: "Redes empresariais" },
    { number: "CCNA", title: "Certificação", desc: "Preparação oficial" },
  ];

  return (
    <section
      id="skills"
      className="relative py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 z-0">
        {/* Luzes azuis */}
        <div className="absolute top-20 left-1/4 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px]"></div>

        {/* Grid de pontos conectados */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="40" cy="40" r="1" fill="#3b82f6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-8">
            <Target className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-bold uppercase text-sm tracking-wider">
              Conquistas Profissionais
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            O Que Você Vai
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Conquistar
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Domine as competências mais requisitadas pelo mercado e transforme
            sua carreira em redes
          </p>
        </div>

        {/* Grid de Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Número animado */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 flex items-center justify-center">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {index + 1}
                  </span>
                </div>

                {/* Ícone com efeito */}
                <div
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                  <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Título */}
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {skill.title}
                </h3>

                {/* Descrição */}
                <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                  {skill.description}
                </p>

                {/* Detalhes */}
                <div className="flex flex-wrap gap-3">
                  {skill.details.map((detail, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-slate-800/50 text-slate-300 text-sm font-medium border border-slate-700/50 group-hover:border-blue-500/30 transition-colors"
                    >
                      {detail}
                    </span>
                  ))}
                </div>

                {/* Linha decorativa */}
                <div
                  className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${skill.color} rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Linha do Tempo / Milestones */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-black text-white">
              Jornada de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Aprendizado
              </span>
            </h3>
          </div>

          <div className="relative">
            {/* Linha conectando os milestones */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative group">
                  <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2">
                    {/* Ponto na linha */}
                    <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center transform -translate-y-1/2 group-hover:scale-125 transition-transform duration-500">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                        {milestone.number}
                      </span>
                      <h4 className="text-xl font-black text-white mb-2">
                        {milestone.title}
                      </h4>
                      <p className="text-slate-400 text-sm">{milestone.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl"></div>

          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-3xl p-12 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
                      Pronto para transformar sua carreira?
                    </h3>
                    <p className="text-slate-300 text-lg">
                      Junte-se aos +500 profissionais que já conquistaram sua
                      certificação CCNA conosco
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Certificação Oficial</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">
                      Networking profissional
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">
                      Suporte Especializado
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3">
                <button
                  onClick={onOpenModal}
                  className="group w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-lg py-5 px-8 rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-2xl shadow-blue-500/25 flex items-center justify-center gap-3"
                >
                  <span>EU QUERO ESSA FORMAÇÃO</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>

                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
                    <Globe className="w-4 h-4" />
                    <span>Vagas limitadas para turma de Fevereiro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
