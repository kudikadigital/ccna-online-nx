"use client";

import {
  Award,
  BookOpen,
  Briefcase,
  Cpu,
  Shield,
  Users,
  Zap,
  Star,
  Target,
  Globe,
} from "lucide-react";
import Image from "next/image";

interface InstructorsSectionProps {
  onOpenModal: () => void;
}

export default function InstructorsSection({
  onOpenModal,
}: InstructorsSectionProps) {
  const instructors = [
    {
      name: "Ladislau Pereira",
      title: "Especialista em Redes e Segurança",
      photo: "/instrutores/lp.jpeg", // Caminho para a imagem
      certifications: ["Cisco CCNA", "Cisco CCNP", "Network Security"],
      experience: "10+ anos",
      description:
        "Ladislau Pereira é um profissional de Redes e Segurança de Informação apaixonado por tecnologia, com uma trajetória marcada por disciplina, resiliência e dedicação constante ao aprendizado.",
      bio: "Iniciou sua jornada na área de redes há vários anos, alcançando rapidamente certificações de peso, como Cisco CCNA e Cisco CCNP, que consolidaram seu domínio em infraestrutura, roteamento e switching. Com experiência prática em implementações, troubleshooting e projetos de redes corporativas, Ladislau também atuou em soluções de conectividade avançada, VPNs, ambientes virtualizados e ferramentas de análise e monitoramento.",
      expertise: [
        "GNS3",
        "VPNs",
        "Automação",
        "TheHive & Cortex",
        "Troubleshooting",
      ],
      color: "from-blue-500 to-cyan-400",
    },
    {
      name: "Osvaldo Amadeu",
      title: "Engenheiro de Telecomunicações Sênior",
      photo: "/instrutores/oa2.jpeg", // Caminho para a imagem
      certifications: ["CCNA Instructor", "HCIA", "HCIP Core Network"],
      experience: "15+ anos",
      description:
        "Engenheiro de Telecomunicações e profissional sénior em Tecnologia de Informação, com ampla experiência no planeamento, implementação e gestão de infraestruturas de comunicação e redes corporativas.",
      bio: "Como instrutor certificado em CCNA e HCIA, formador em Dimensionamento de Redes Móveis Celulares e especialista em Segurança Eletrónica, desenvolvi uma combinação sólida entre conhecimento técnico avançado, capacidade de liderança e forte vocação para formação profissional.",
      expertise: [
        "Redes Móveis Celulares",
        "Virtualização",
        "Windows Server",
        "Segurança",
        "Liderança Técnica",
      ],
      color: "from-purple-500 to-violet-400",
    },
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Alunos Formados" },
    { icon: Award, value: "25+", label: "Certificações" },
    { icon: Briefcase, value: "25+", label: "Anos de Experiência" },
    { icon: Star, value: "4.9/5", label: "Avaliação dos Alunos" },
  ];

  return (
    <section
      id="instructors"
      className="relative py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 z-0">
        {/* Gradientes sutis */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl"></div>

        {/* Padrão de circuitos */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="circuit"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,50 L100,50 M50,0 L50,100"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  fill="none"
                />
                <circle cx="50" cy="50" r="3" fill="#3b82f6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-8">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-blue-600 font-bold uppercase text-sm tracking-wider">
              Excelência em Ensino
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
            Aprenda com quem tem
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Experiência Real de Mercado
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Conheça os especialistas que vão guiar sua jornada rumo à
            certificação CCNA
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-black text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cards dos Instrutores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Header do Card */}
              <div
                className={`relative h-48 bg-gradient-to-r ${instructor.color} overflow-hidden`}
              >
                {/* Foto do Instrutor */}
                <div className="absolute -bottom-12 left-8 w-32 h-32 rounded-2xl bg-white border-4 border-white shadow-2xl overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={instructor.photo}
                      alt={instructor.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 128px) 100vw, 128px"
                    />
                  </div>
                </div>

                {/* Badge de experiência */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-bold text-slate-900">
                      {instructor.experience}
                    </span>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="pt-16 px-8 pb-8">
                {/* Nome e título */}
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {instructor.name}
                  </h3>
                  <p className="text-slate-600 font-medium">
                    {instructor.title}
                  </p>
                </div>

                {/* Descrição */}
                <p className="text-slate-700 mb-6 leading-relaxed">
                  {instructor.description}
                </p>

                {/* Certificações */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Certificações
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {instructor.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expertise */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Áreas de Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {instructor.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio expandida */}
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Diferenciais da Metodologia */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-10 md:p-16 text-white overflow-hidden relative">
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black">
                    Metodologia{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      Comprovada
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        Aprendizado Prático
                      </h4>
                      <p className="text-slate-400">
                        Laboratórios hands-on com equipamentos reais e
                        simuladores profissionais
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        Conexão com o Mercado
                      </h4>
                      <p className="text-slate-400">
                        Casos reais e projetos aplicáveis ao dia a dia
                        corporativo
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        Suporte Personalizado
                      </h4>
                      <p className="text-slate-400">
                        Acompanhamento individual e resolução de dúvidas em
                        tempo real
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        Networking Profissional
                      </h4>
                      <p className="text-slate-400">
                        Acesso a comunidade exclusiva e conexões com o mercado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="lg:w-1/3">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-center relative overflow-hidden">
                  <h4 className="text-2xl font-black text-white mb-4">
                    Pronto para aprender com os melhores?
                  </h4>
                  <p className="text-blue-100 mb-6">
                    Sua jornada rumo à certificação CCNA começa aqui
                  </p>
                  <button
                    onClick={onOpenModal}
                    className="w-full bg-white text-slate-900 font-bold py-4 px-6 rounded-xl hover:bg-slate-100 transition-all duration-300 hover:-translate-y-1 active:scale-95"
                  >
                    Quero Minha Vaga
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
