"use client";

import { useState } from "react";
import {
  X,
  ShieldCheck,
  Zap,
  User,
  Briefcase,
  Target,
  Building,
  GraduationCap,
  Network,
  Rocket,
  Star,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

export default function EnrollModal({ isOpen, onClose }: EnrollModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStep1Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("Dados enviados:", data);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          whatsapp: data.whatsapp,
          perfil: data.perfil || "",
          objetivo: data.objetivo || "",
          experiencia: data.experiencia || "",
          profissao: data.profissao || "",
          empresa: data.empresa || "",
          cargo: data.cargo || "",
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setLeadId(result.leadId);
        toast.success("Dados salvos com sucesso!", {
          description: "Agora selecione seu plano de pagamento.",
        });
        setStep(2);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao criar lead");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao enviar", {
        description: error instanceof Error ? error.message : "Tente novamente",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          plano: data.plano,
        }),
      });

      if (response.ok) {
        toast.success("Pagamento processado!", {
          description: "Sua inscrição está confirmada.",
        });
        setStep(3);
      } else {
        throw new Error("Falha no pagamento");
      }
    } catch (error) {
      toast.error("Erro no pagamento", {
        description: "Verifique os dados e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const PERFIL_OPCOES = [
    {
      id: "iniciante",
      label: "Iniciante",
      desc: "Estou começando na área de redes",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "tecnico",
      label: "Técnico",
      desc: "Já trabalho com suporte/redes básicas",
      icon: Network,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "profissional",
      label: "Profissional",
      desc: "Atuo na área e quero me especializar",
      icon: Briefcase,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "estudante",
      label: "Estudante",
      desc: "Sou estudante de TI/Engenharia",
      icon: GraduationCap,
      color: "from-orange-500 to-yellow-500",
    },
  ];

  const OBJETIVO_OPCOES = [
    {
      id: "entrar_area",
      label: "Entrar na área de Redes",
      desc: "Quero minha primeira oportunidade",
      icon: Rocket,
    },
    {
      id: "crescer_carreira",
      label: "Crescer na carreira",
      desc: "Busco promoção ou melhores oportunidades",
      icon: TrendingUp,
    },
    {
      id: "certificacao",
      label: "Obter certificação CCNA",
      desc: "Foco na certificação oficial Cisco",
      icon: Star,
    },
    {
      id: "mudar_area",
      label: "Mudar de área",
      desc: "Transição para Redes/TI",
      icon: Network,
    },
    {
      id: "trabalhar_isp",
      label: "Trabalhar em ISP/Telecom",
      desc: "Almejo vagas em provedores/telecom",
      icon: Building,
    },
    {
      id: "consultoria",
      label: "Trabalhar como consultor",
      desc: "Quero atuar com projetos/consultoria",
      icon: Briefcase,
    },
  ];

  const renderStep1 = () => (
    <form onSubmit={handleStep1Submit} className="relative p-10 space-y-8">
      {/* Cabeçalho do Step */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white font-black text-xl">
            1
          </div>
        </div>
        <div>
          <h4 className="font-black uppercase text-blue-500 tracking-widest text-lg mb-1">
            Dados do Candidato
          </h4>
          <p className="text-slate-400 text-sm">
            Complete suas informações para garantir sua vaga
          </p>
        </div>
      </div>

      {/* Grid Principal - 2 colunas em desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coluna 1: Dados Pessoais */}
        <div className="space-y-6">
          <div>
            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Dados Pessoais
            </h5>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-2 tracking-wider">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="nome"
                  required
                  placeholder="Ex: Manuel dos Santos"
                  className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2 tracking-wider">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    placeholder="+244 9XX XXX XXX"
                    className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2 tracking-wider">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="seu@email.com"
                    className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-500" />
              Informações Profissionais
            </h5>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-2 tracking-wider">
                  Empresa / Instituição
                </label>
                <input
                  type="text"
                  name="empresa"
                  placeholder="Ex: UNI, Telecom, Empresa X"
                  className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2 tracking-wider">
                    Cargo Atual
                  </label>
                  <input
                    type="text"
                    name="cargo"
                    placeholder="Ex: Técnico, Analista"
                    className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2 tracking-wider">
                    Área de Atuação
                  </label>
                  <input
                    type="text"
                    name="profissao"
                    placeholder="Ex: TI, Telecom, Estudante"
                    className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna 2: Perfil e Objetivos */}
        <div className="space-y-6">
          <div>
            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Qual é o seu perfil?
            </h5>
            <div className="grid grid-cols-2 gap-4">
              {PERFIL_OPCOES.map((perfil) => {
                const Icon = perfil.icon;
                return (
                  <label key={perfil.id} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="perfil"
                      value={perfil.id}
                      className="hidden peer"
                      required
                    />
                    <div className="p-4 bg-slate-900 border-2 border-slate-800 rounded-xl peer-checked:border-blue-500 peer-checked:bg-blue-900/20 transition-all h-full">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${perfil.color} flex items-center justify-center`}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">
                            {perfil.label}
                          </p>
                          <p className="text-slate-400 text-xs mt-1">
                            {perfil.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Qual é seu principal objetivo?
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OBJETIVO_OPCOES.map((objetivo) => {
                const Icon = objetivo.icon;
                return (
                  <label key={objetivo.id} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="objetivo"
                      value={objetivo.id}
                      className="hidden peer"
                      required
                    />
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl peer-checked:border-blue-500 peer-checked:bg-blue-900/20 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">
                            {objetivo.label}
                          </p>
                          <p className="text-slate-400 text-xs">
                            {objetivo.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-500" />
              Nível de Experiência em Redes
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: "nenhuma", label: "Nenhuma", color: "bg-blue-900/50" },
                { value: "basica", label: "Básica", color: "bg-green-900/50" },
                {
                  value: "intermedia",
                  label: "Intermediária",
                  color: "bg-yellow-900/50",
                },
                { value: "avancada", label: "Avançada", color: "bg-red-900/50" },
              ].map((nivel) => (
                <label key={nivel.value} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="experiencia"
                    value={nivel.value}
                    className="hidden peer"
                    required
                  />
                  <div
                    className={`p-3 border border-slate-800 rounded-xl peer-checked:border-blue-500 transition-all text-center ${nivel.color}`}
                  >
                    <p className="font-semibold text-white text-sm">
                      {nivel.label}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Botão de Submissão */}
      <div className="pt-6 border-t border-slate-800">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all uppercase tracking-tighter text-lg flex items-center justify-center gap-3 group"
        >
          {loading ? (
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            </div>
          ) : (
            <>
              Continuar
              <ShieldCheck className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </>
          )}
        </button>
        <p className="text-center text-slate-500 text-xs mt-4">
          * Campos obrigatórios
        </p>
      </div>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleStep2Submit} className="relative p-10 space-y-8">
      {/* Cabeçalho do Step */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white font-black text-xl">
            2
          </div>
        </div>
        <div>
          <h4 className="font-black uppercase text-blue-500 tracking-widest text-lg mb-1">
            Plano de Investimento
          </h4>
          <p className="text-slate-400 text-sm">
            Escolha a melhor forma de pagamento para você
          </p>
        </div>
      </div>

      {/* Cards de Planos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Plano Parcelado */}
        <label className="relative cursor-pointer">
          <input
            type="radio"
            name="plano"
            value="parcelado"
            className="hidden peer"
            defaultChecked
          />
          <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-slate-800 rounded-3xl peer-checked:border-blue-500 peer-checked:shadow-[0_0_40px_rgba(37,99,235,0.3)] transition-all h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" />
                    </svg>
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest text-blue-500">
                    MAIS ESCOLHIDO
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">2 PARCELAS</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Custo-benefício ideal
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">
                  42.000
                </span>
                <span className="text-xl font-bold text-white">AOA</span>
              </div>
              <p className="text-slate-400 text-sm mt-2">
                por mês (total: 84.000 AOA)
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-300">Sem juros</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-300">Flexibilidade financeira</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-300">Melhor opção para estudantes</span>
              </div>
            </div>
          </div>
        </label>

        {/* Plano à Vista */}
        <label className="relative cursor-pointer">
          <input
            type="radio"
            name="plano"
            value="vista"
            className="hidden peer"
          />
          <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-slate-800 rounded-3xl peer-checked:border-green-500 peer-checked:shadow-[0_0_40px_rgba(34,197,94,0.3)] transition-all h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest text-green-500">
                    ECONOMIZE 20%
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">À VISTA</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Pagamento único com desconto
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">80.000</span>
                <span className="text-xl font-bold text-white">AOA</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-slate-400 text-sm line-through">
                  105.000 AOA
                </span>
                <span className="text-green-400 text-sm font-bold">
                  Economize 25.000 AOA
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-300">20% de desconto</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-300">Acesso imediato ao curso</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-300">Menor custo total</span>
              </div>
            </div>
          </div>
        </label>
      </div>

      {/* Inclusos */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h5 className="font-bold text-white mb-4 flex items-center gap-2">
          <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          O que está incluso no valor:
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "Acesso à Plataforma Cisco NETACAD",
            "Certificado oficial por módulo",
            "Laboratórios práticos guiados",
            "Aulas ao vivo com instrutores",
            "Material didático completo",
            "Suporte e acompanhamento",
            "Acesso à comunidade INEFOR",
            "Preparação para o mercado",
            "Possibilidade de networking",
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center">
                <svg className="h-3 w-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Navegação */}
      <div className="flex gap-4 pt-6 border-t border-slate-800">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-green-600/20 transition-all uppercase tracking-tighter text-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.1s]"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.2s]"></div>
            </div>
          ) : (
            "Confirmar Pagamento"
          )}
        </button>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <div className="relative p-10 text-center space-y-8">
      {/* Cabeçalho do Step */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-black text-2xl mb-4">
          <ShieldCheck className="h-10 w-10" />
        </div>
        <h4 className="font-black uppercase text-green-500 tracking-widest text-xl mb-2">
          Inscrição Confirmada!
        </h4>
        <p className="text-slate-400">
          Parabéns, sua vaga no CCNAv7 Online está garantida
        </p>
      </div>

      {/* Card de Confirmação */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-green-800 rounded-3xl p-8">
        <h3 className="text-2xl font-black text-white mb-4">
          Bem-vindo ao CCNAv7 Online!
        </h3>
        <p className="text-slate-300 mb-6">
          Em breve nossa equipe entrará em contato via WhatsApp com todos os
          detalhes de acesso.
        </p>

        <div className="bg-slate-800/30 rounded-2xl p-6">
          <h5 className="font-bold text-white mb-4">Próximos passos:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                step: "01",
                title: "Contato via WhatsApp",
                desc: "Receberá o link do grupo da turma",
              },
              {
                step: "02",
                title: "Acesso à NETACAD",
                desc: "Credenciais liberadas em até 24h",
              },
              {
                step: "03",
                title: "Material didático",
                desc: "Disponível na primeira aula",
              },
              {
                step: "04",
                title: "Início das aulas",
                desc: "09/02/2026 às 19:00",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-blue-500">{item.step}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 p-6 rounded-2xl">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22a10 10 0 1110-10 10 10 0 01-10 10zm0-18a8 8 0 108 8 8 8 0 00-8-8z" />
              <path d="M12 17a1 1 0 01-1-1v-4a1 1 0 012 0v4a1 1 0 01-1 1zm0-8a1 1 0 01-.92-1.38.9.9 0 01.54-.54.94.94 0 011.34.85.76.76 0 01-.42.69A1 1 0 0112 9z" />
            </svg>
          </div>
          <h6 className="font-bold text-white mb-2">Dúvidas?</h6>
          <p className="text-slate-400 text-sm">
            Entre em contato: +244 923 456 789
          </p>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h6 className="font-bold text-white mb-2">E-mail</h6>
          <p className="text-slate-400 text-sm">contato@inefor.com</p>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
          </div>
          <h6 className="font-bold text-white mb-2">Comunidade</h6>
          <p className="text-slate-400 text-sm">
            Acesso à comunidade exclusiva
          </p>
        </div>
      </div>

      {/* Botão Final */}
      <button
        onClick={onClose}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold rounded-2xl transition-all"
      >
        Fechar e Voltar ao Site
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
        onClick={onClose}
      ></div>

      <div className="relative bg-slate-950 w-full max-w-6xl rounded-3xl shadow-[0_0_80px_rgba(37,99,235,0.3)] border border-slate-800 overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500 max-h-[90vh] overflow-y-auto">
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Header com Gradiente */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-10 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 bg-white/10 w-fit px-4 py-2 rounded-full mb-4 border border-white/20 backdrop-blur-sm">
                <Zap className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-black uppercase tracking-widest">
                  {step === 1 && "Pré-inscrição"}
                  {step === 2 && "Seleção de Plano"}
                  {step === 3 && "Confirmação"}
                </span>
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">
                CCNAv7 ONLINE
              </h3>
              <p className="text-blue-200 text-lg">
                {step === 1 && "Garanta sua vaga na próxima turma"}
                {step === 2 && "Escolha a melhor forma de investir na sua carreira"}
                {step === 3 && "Você está oficialmente inscrito!"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-black/30 p-3 rounded-xl transition-all backdrop-blur-sm"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? "bg-white text-blue-600"
                      : "bg-white/20 text-white/60"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-1 w-16 mx-2 ${
                      step > s ? "bg-white" : "bg-white/20"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="relative">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
}