"use client";

import { useState } from "react";
import {
  X,
  ShieldCheck,
  Zap,
  ChevronRight,
  User,
  Briefcase,
  Target,
  Building,
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

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setLeadId(result.leadId);
        toast.success("Lead criado com sucesso!", {
          description: "Agora selecione seu plano de pagamento.",
        });
        setStep(2);
      } else {
        throw new Error("Falha ao criar lead");
      }
    } catch (error) {
      toast.error("Erro ao enviar", {
        description: "Tente novamente em alguns instantes.",
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

  const renderStep1 = () => (
    <form onSubmit={handleStep1Submit} className="relative p-10 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          1
        </div>
        <div>
          <h4 className="font-black uppercase text-blue-500 tracking-widest text-sm">
            Dados Pessoais
          </h4>
          <p className="text-slate-400 text-xs">Informações básicas</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-black uppercase text-blue-500 mb-2 tracking-[0.2em]">
            Nome Completo
          </label>
          <input
            type="text"
            name="nome"
            required
            placeholder="Ex: Manuel dos Santos"
            className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
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
              className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
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
              className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-blue-500 mb-2 tracking-[0.2em] flex items-center gap-2">
            <Target className="h-3 w-3" />
            Objetivo Profissional
          </label>
          <textarea
            name="objetivo"
            rows={2}
            placeholder="Ex: Quero atuar como Técnico de Redes em uma ISP..."
            className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-blue-500 mb-2 tracking-[0.2em] flex items-center gap-2">
              <Briefcase className="h-3 w-3" />
              Profissão Atual
            </label>
            <input
              type="text"
              name="profissao"
              placeholder="Ex: Estudante, Técnico, Analista..."
              className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-blue-500 mb-2 tracking-[0.2em] flex items-center gap-2">
              <Building className="h-3 w-3" />
              Empresa/Instituição
            </label>
            <input
              type="text"
              name="empresa"
              placeholder="Ex: UNI, Telecom, Nenhuma..."
              className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-blue-500 mb-2 tracking-[0.2em]">
            Nível de Experiência em Redes
          </label>
          <select
            name="experiencia"
            className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-white cursor-pointer"
          >
            <option value="">Selecione...</option>
            <option value="nenhuma">Nenhuma (Iniciante)</option>
            <option value="basica">Básica (Conceitos)</option>
            <option value="intermedia">
              Intermediária (Configurações simples)
            </option>
            <option value="avancada">Avançada (Trabalho na área)</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all uppercase tracking-tighter text-xl flex items-center justify-center gap-3"
      >
        {loading ? "Processando..." : "Próximo →"}
      </button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleStep2Submit} className="relative p-10 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          2
        </div>
        <div>
          <h4 className="font-black uppercase text-blue-500 tracking-widest text-sm">
            Plano de Investimento
          </h4>
          <p className="text-slate-400 text-xs">
            Escolha sua forma de pagamento
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="relative">
            <input
              type="radio"
              name="plano"
              value="vista"
              className="hidden peer"
              defaultChecked
            />
            <div className="p-6 bg-slate-900 border-2 border-slate-800 rounded-2xl peer-checked:border-blue-500 peer-checked:bg-blue-900/20 cursor-pointer transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-white">À VISTA</p>
                  <p className="text-2xl font-black text-white mt-2">
                    80.000 AOA
                  </p>
                  <p className="text-green-400 text-sm mt-1">20% OFF</p>
                </div>
                <div className="text-blue-500">
                  <ShieldCheck className="h-8 w-8" />
                </div>
              </div>
              <p className="text-slate-400 text-xs mt-3">
                Pagamento único com desconto
              </p>
            </div>
          </label>

          <label className="relative">
            <input
              type="radio"
              name="plano"
              value="parcelado"
              className="hidden peer"
            />
            <div className="p-6 bg-slate-900 border-2 border-slate-800 rounded-2xl peer-checked:border-blue-500 peer-checked:bg-blue-900/20 cursor-pointer transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-white">2 PARCELAS</p>
                  <p className="text-2xl font-black text-white mt-2">
                    42.000 AOA
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    Total: 84.000 AOA
                  </p>
                </div>
                <div className="text-blue-500">
                  <svg
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" />
                  </svg>
                </div>
              </div>
              <p className="text-slate-400 text-xs mt-3">
                Sem juros, melhor custo-benefício
              </p>
            </div>
          </label>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">
            <strong className="text-white">Incluso:</strong> Acesso à NETACAD,
            Certificado Cisco por módulo, Laboratórios práticos, Suporte e
            Acompanhamento.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all"
        >
          ← Voltar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-6 bg-green-600 hover:bg-green-500 text-white font-black rounded-2xl shadow-xl shadow-green-600/20 transition-all uppercase tracking-tighter text-xl"
        >
          {loading ? "Processando..." : "Confirmar Pagamento"}
        </button>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <div className="relative p-10 text-center space-y-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
          3
        </div>
        <div>
          <h4 className="font-black uppercase text-green-500 tracking-widest text-sm">
            Inscrição Confirmada!
          </h4>
          <p className="text-slate-400 text-xs">
            Parabéns, sua vaga está garantida
          </p>
        </div>
      </div>

      <div className="bg-green-900/20 border-2 border-green-800 rounded-2xl p-8">
        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-black text-white mb-2">
          Bem-vindo ao CCNAv7 Online!
        </h3>
        <p className="text-slate-300">
          Em breve entraremos em contato via WhatsApp com os detalhes de acesso
          à turma.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-900/50 p-4 rounded-2xl">
          <p className="text-sm text-slate-400">
            <strong className="text-white">Próximos passos:</strong>
          </p>
          <ul className="text-left text-slate-300 text-sm space-y-2 mt-2">
            <li>1. Receberá o link do grupo da turma no WhatsApp</li>
            <li>2. Acesso à plataforma NETACAD será liberado</li>
            <li>3. Material didático disponível na primeira aula</li>
            <li>4. Início das aulas: 09/02/2026 às 19:00</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all"
        >
          Fechar
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
        onClick={onClose}
      ></div>

      <div className="relative bg-slate-950 w-full max-w-2xl rounded-[2.5rem] shadow-[0_0_50px_rgba(37,99,235,0.2)] border border-slate-800 overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="relative bg-linear-to-br from-blue-600 to-blue-800 p-10 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full mb-3">
                <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {step === 1 && "Pré-inscrição"}
                  {step === 2 && "Pagamento"}
                  {step === 3 && "Confirmação"}
                </span>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter leading-none italic">
                CCNAv7 ONLINE
                <span className="block text-blue-200">
                  {step === 1 && "Complete seus dados"}
                  {step === 2 && "Escolha seu plano"}
                  {step === 3 && "Inscrição Confirmada!"}
                </span>
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

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
}
