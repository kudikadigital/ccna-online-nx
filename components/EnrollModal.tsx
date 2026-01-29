"use client";

import { useState, useRef } from "react";
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
  Upload,
  FileText,
  Copy,
  Check,
  Banknote,
  CreditCard,
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleStep1Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("📥 Body recebido:", data);

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

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validar tamanho do arquivo (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Arquivo muito grande", {
        description: "O comprovativo deve ter no máximo 5MB",
      });
      return;
    }

    // Validar tipo de arquivo
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      toast.error("Formato inválido", {
        description: "Apenas JPG, PNG ou PDF são aceitos",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simular upload progressivo
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    try {
      // Aqui você faria o upload real para um servidor (Cloudinary, AWS S3, etc.)
      // Por enquanto, apenas simulamos
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      clearInterval(interval);
      setUploadProgress(100);
      setUploadedFile(file);
      
      toast.success("Comprovativo carregado!", {
        description: "Arquivo pronto para envio.",
      });

      // Reset progress after success
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (error) {
      clearInterval(interval);
      toast.error("Erro no upload", {
        description: "Não foi possível carregar o arquivo",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Validar se um plano foi selecionado
    if (!data.plano) {
      toast.error("Selecione um plano", {
        description: "Escolha entre pagamento à vista ou parcelado",
      });
      setLoading(false);
      return;
    }

    try {
      // Primeiro processar o pagamento
      const paymentResponse = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          plano: data.plano,
          comprovativoEnviado: !!uploadedFile,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Falha no processamento do pagamento");
      }

      // Se houver arquivo, fazer upload separadamente
      if (uploadedFile && leadId) {
        const uploadFormData = new FormData();
        uploadFormData.append("comprovativo", uploadedFile);
        uploadFormData.append("leadId", leadId);
        uploadFormData.append("plano", data.plano as string);

        try {
          const uploadResponse = await fetch("/api/upload-comprovativo", {
            method: "POST",
            body: uploadFormData,
          });

          if (!uploadResponse.ok) {
            console.warn("Upload do comprovativo falhou, mas pagamento foi processado");
          }
        } catch (uploadError) {
          console.warn("Erro no upload do comprovativo:", uploadError);
          // Não falha o processo principal
        }
      }

      toast.success("Inscrição confirmada!", {
        description: uploadedFile 
          ? "Pagamento processado e comprovativo recebido!" 
          : "Pagamento processado com sucesso!",
      });
      
      setStep(3);
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro no pagamento", {
        description: "Verifique os dados e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success("Copiado!", {
        description: `${fieldName} copiado para a área de transferência`,
      });
      
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast.error("Erro ao copiar", {
        description: "Não foi possível copiar o texto",
      });
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
              Continuar para Pagamento
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
            Pagamento e Comprovativo
          </h4>
          <p className="text-slate-400 text-sm">
            Escolha seu plano e envie o comprovativo de pagamento
          </p>
        </div>
      </div>

      {/* Grid de 2 colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coluna 1: Seleção de Plano */}
        <div className="space-y-6">
          <h5 className="font-bold text-white mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-500" />
            Escolha seu Plano de Pagamento
          </h5>

          <div className="space-y-4">
            {/* Plano Parcelado */}
            <label className="relative cursor-pointer block">
              <input
                type="radio"
                name="plano"
                value="parcelado"
                className="hidden peer"
                defaultChecked
              />
              <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-slate-800 rounded-2xl peer-checked:border-blue-500 peer-checked:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
                        MAIS ESCOLHIDO
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white">2 PARCELAS</h3>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">42.000</span>
                    <span className="text-lg font-bold text-white">AOA</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    por mês • Total: 84.000 AOA
                  </p>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center">
                      <svg className="h-2 w-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-300">Sem juros</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center">
                      <svg className="h-2 w-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-300">Melhor opção para estudantes</span>
                  </li>
                </ul>
              </div>
            </label>

            {/* Plano à Vista */}
            <label className="relative cursor-pointer block">
              <input
                type="radio"
                name="plano"
                value="vista"
                className="hidden peer"
              />
              <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-slate-800 rounded-2xl peer-checked:border-green-500 peer-checked:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-green-500">
                        ECONOMIZE 20%
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white">À VISTA</h3>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">80.000</span>
                    <span className="text-lg font-bold text-white">AOA</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-400 text-sm line-through">
                      105.000 AOA
                    </span>
                    <span className="text-green-400 text-xs font-bold bg-green-500/10 px-2 py-0.5 rounded">
                      Economize 25.000 AOA
                    </span>
                  </div>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center">
                      <svg className="h-2 w-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-300">20% de desconto</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500/20 rounded flex items-center justify-center">
                      <svg className="h-2 w-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-300">Menor custo total</span>
                  </li>
                </ul>
              </div>
            </label>
          </div>
        </div>

        {/* Coluna 2: Comprovativo e Referência Bancária */}
        <div className="space-y-6">
          {/* Seção de Referência Bancária */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6">
            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
              <Banknote className="h-5 w-5 text-blue-500" />
              Dados Bancários para Pagamento
            </h5>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                  Banco
                </label>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                  <span className="text-white font-medium">Banco BAI</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("Banco BAI", "Banco")}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copiedField === "Banco" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                  Conta
                </label>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                  <span className="text-white font-mono">9848701410001</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("9848701410001", "Conta")}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copiedField === "Conta" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                  IBAN
                </label>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                  <span className="text-white font-mono">AO06 0040 0000 9848 7014 1014 9</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("AO06004000009848701410149", "IBAN")}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copiedField === "IBAN" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                  Titular
                </label>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                  <span className="text-white">INEFOR PRESTAÇÃO DE SERVIÇOS Lda</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("INEFOR PRESTAÇÃO DE SERVIÇOS Lda", "Titular")}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copiedField === "Titular" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-xl">
                <p className="text-sm text-blue-300 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-semibold">Instruções importantes:</span>
                </p>
                <ul className="text-xs text-slate-300 space-y-1 mt-2 ml-6 list-disc">
                  <li>Use seu nome como referência do pagamento</li>
                  <li>Envie o comprovativo após realizar o pagamento</li>
                  <li>O processamento pode levar até 24 horas</li>
                  <li>Mantenha o comprovativo para referência</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Seção de Upload de Comprovativo */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6">
            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-500" />
              Envie seu Comprovativo
            </h5>

            <div className="space-y-4">
              <div className="text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                />
                
                {!uploadedFile ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-700 rounded-2xl p-8 cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="text-white font-medium mb-2">
                      Clique para fazer upload
                    </p>
                    <p className="text-slate-400 text-sm">
                      Formatos aceitos: JPG, PNG, PDF (máx. 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="border-2 border-green-500/30 border-dashed rounded-2xl p-6 bg-green-900/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                          <FileText className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{uploadedFile.name}</p>
                          <p className="text-slate-400 text-sm">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {uploadedFile.type}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                      >
                        Remover
                      </button>
                    </div>
                    
                    {isUploading && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Carregando...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {!isUploading && uploadProgress === 100 && (
                      <div className="flex items-center gap-2 text-green-400 text-sm mt-2">
                        <Check className="h-4 w-4" />
                        <span>Comprovativo pronto para envio</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center justify-center gap-2 mx-auto"
                  >
                    <Upload className="h-4 w-4" />
                    {uploadedFile ? "Trocar arquivo" : "Selecionar arquivo"}
                  </button>
                </div>
              </div>

              <div className="mt-4 p-4 bg-slate-800/30 rounded-xl">
                <p className="text-sm text-slate-300 mb-2">
                  <span className="font-semibold text-white">Por que enviar o comprovativo?</span>
                </p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Acelera o processamento da sua inscrição</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Garante a confirmação imediata da sua vaga</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Evita atrasos na liberação do acesso</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inclusos no Valor */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h5 className="font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-blue-500" />
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
          Voltar aos Dados
        </button>
        <button
          type="submit"
          disabled={loading || isUploading}
          className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-green-600/20 transition-all uppercase tracking-tighter text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.1s]"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.2s]"></div>
            </div>
          ) : (
            `Finalizar Inscrição ${uploadedFile ? "✓" : ""}`
          )}
        </button>
      </div>

      {/* Nota sobre o comprovativo */}
      {!uploadedFile && (
        <div className="p-4 bg-yellow-900/20 border border-yellow-800 rounded-xl">
          <p className="text-sm text-yellow-300 flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>
              <strong>Você pode finalizar sem comprovativo agora</strong>, mas envie-o o quanto antes para acelerar a confirmação.
            </span>
          </p>
        </div>
      )}
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
          {uploadedFile ? "Inscrição Completa!" : "Inscrição Confirmada!"}
        </h4>
        <p className="text-slate-400">
          {uploadedFile 
            ? "Pagamento processado e comprovativo recebido!"
            : "Pagamento processado com sucesso!"}
        </p>
      </div>

      {/* Card de Confirmação */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-green-800 rounded-3xl p-8">
        <h3 className="text-2xl font-black text-white mb-4">
          Bem-vindo ao CCNAv7 Online!
        </h3>
        <p className="text-slate-300 mb-6">
          {uploadedFile 
            ? "Sua inscrição está completa! Em breve entraremos em contato via WhatsApp."
            : "Sua inscrição foi registrada! Envie o comprovativo para completar o processo."}
        </p>

        <div className="bg-slate-800/30 rounded-2xl p-6">
          <h5 className="font-bold text-white mb-4">Próximos passos:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                step: "01",
                title: uploadedFile ? "Contato via WhatsApp" : "Envie o comprovativo",
                desc: uploadedFile 
                  ? "Receberá o link do grupo da turma" 
                  : "Envie para +244 923 456 789",
                color: "bg-blue-500/20 text-blue-500",
              },
              {
                step: "02",
                title: "Acesso à NETACAD",
                desc: "Credenciais liberadas em até 24h",
                color: "bg-green-500/20 text-green-500",
              },
              {
                step: "03",
                title: "Material didático",
                desc: "Disponível na primeira aula",
                color: "bg-purple-500/20 text-purple-500",
              },
              {
                step: "04",
                title: "Início das aulas",
                desc: "09/02/2026 às 19:00",
                color: "bg-amber-500/20 text-amber-500",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>
                  <span className="font-bold">{item.step}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!uploadedFile && (
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-xl">
            <p className="text-sm text-blue-300 mb-2">
              <strong>Lembre-se de enviar seu comprovativo!</strong>
            </p>
            <p className="text-slate-400 text-sm">
              Para: +244 923 456 789 • Referência: seu nome
            </p>
          </div>
        )}
      </div>

      {/* Informações de Contato */}
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
            WhatsApp: +244 923 456 789
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
                  {step === 2 && "Pagamento e Comprovativo"}
                  {step === 3 && "Confirmação"}
                </span>
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">
                CCNAv7 ONLINE
              </h3>
              <p className="text-blue-200 text-lg">
                {step === 1 && "Garanta sua vaga na próxima turma"}
                {step === 2 && "Complete seu pagamento"}
                {step === 3 && "Você está oficialmente inscrito!"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-black/30 p-3 rounded-xl backdrop-blur-sm"
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