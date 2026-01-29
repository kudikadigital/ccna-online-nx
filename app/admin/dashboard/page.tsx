// app/admin/dashboard/page.tsx
import { DeleteLeadButton } from "@/components/DeleteLeadButton";
import LogoutBtn from "@/components/ui/Logout";
import { prisma } from "@/lib/prisma";
import {
  Users,
  LayoutDashboard,
  TrendingUp,
  Wallet,
  ExternalLink,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react";

export const dynamic = "force-dynamic";

// 1. Interface atualizada com os campos CORRETOS
interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: string;
  description?: string;
}

interface Lead {
  id: number;
  nome: string;
  email: string;
  whatsapp: string;
  plano: string; // ← Nome CORRETO do campo (não é "pagamento")
  perfil: string | null;
  objetivo: string | null;
  experiencia: string | null;
  profissao: string | null;
  empresa: string | null;
  cargo: string | null;
  status: string;
  paymentId: string | null;
  paymentStatus: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Componente Card
function Card({ title, value, icon, trend, description }: CardProps) {
  return (
    <div className="bg-[#0d1117] border border-slate-800 p-6 rounded-[2rem] shadow-sm hover:border-blue-500/50 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-[#161b22] rounded-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter bg-slate-800/50 px-2 py-1 rounded-md">
          {trend}
        </span>
      </div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
        {title}
      </p>
      <p className="text-4xl font-black text-white tracking-tighter italic">
        {value}
      </p>
      {description && (
        <p className="text-slate-500 text-xs mt-2">{description}</p>
      )}
    </div>
  );
}

// 3. Componente Principal ATUALIZADO
export default async function AdminDashboard() {
  // Buscar dados com os campos CORRETOS
  const [leads, stats] = await Promise.all([
    prisma.lead.findMany({ 
      orderBy: { createdAt: "desc" },
      take: 50 // Limitar para performance
    }) as Promise<Lead[]>,
    
    // Estatísticas em uma única query
    prisma.lead.aggregate({
      _count: {
        _all: true,
      },
      _sum: {
        id: true, // Placeholder, você pode adicionar campos numéricos se tiver
      },
    }),
  ]);

  // Calcular estatísticas manualmente (mais flexível)
  const totalLeads = leads.length;
  const totalVista = leads.filter(lead => lead.plano === "vista").length;
  const totalParcelado = leads.filter(lead => lead.plano === "parcelado").length;
  const totalPendente = leads.filter(lead => lead.plano === "pendente").length;
  const totalConfirmados = leads.filter(lead => lead.status === "confirmado").length;
  const totalPendentesPagamento = leads.filter(lead => lead.status === "lead").length;

  // Agrupar por perfil
  const perfis = leads.reduce((acc, lead) => {
    const perfil = lead.perfil || "não informado";
    acc[perfil] = (acc[perfil] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Perfil mais comum
  const perfilMaisComum = Object.entries(perfis).sort((a, b) => b[1] - a[1])[0] || ["nenhum", 0];

  return (
    <div className="flex min-h-screen bg-[#0a0c10] text-slate-300">
      <aside className="w-64 border-r border-slate-800 bg-[#0d1117] flex flex-col fixed h-full">
        <div className="p-6">
          <div className="flex items-center gap-3 text-white mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <span className="font-black tracking-tighter italic">
              INEFOR ADMIN
            </span>
          </div>
          <nav className="space-y-2">
            <a
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-500 rounded-xl font-bold text-sm"
            >
              <LayoutDashboard size={18} /> Dashboard
            </a>
            <a
              href="/admin/leads"
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-bold text-sm transition-all text-slate-400"
            >
              <Users size={18} /> Todos os Leads
            </a>
            <a
              href="/admin/inscritos"
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-bold text-sm transition-all text-slate-400"
            >
              <CheckCircle size={18} /> Inscritos Confirmados
            </a>
            <a
              href="/admin/pagamentos"
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-bold text-sm transition-all text-slate-400"
            >
              <DollarSign size={18} /> Pagamentos
            </a>
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-slate-800">
          <LogoutBtn />
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-end mb-10">
          <div>
            <p className="text-blue-500 font-black text-[10px] uppercase tracking-[0.3em] mb-1">
              Status em Tempo Real
            </p>
            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
              Dashboard <span className="text-blue-600">CCNA Online</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {totalLeads} inscrições • {totalConfirmados} confirmados
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              Última Atualização
            </p>
            <p className="text-white font-mono text-sm">
              {new Date().toLocaleTimeString("pt-PT")}
            </p>
          </div>
        </header>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card
            title="Total Inscritos"
            value={totalLeads}
            icon={<Users className="text-blue-500" size={20} />}
            trend="Todos os Leads"
            description={`${totalConfirmados} confirmados`}
          />
          
          <Card
            title="À Vista"
            value={totalVista}
            icon={<DollarSign className="text-green-500" size={20} />}
            trend={`${((totalVista / totalLeads || 0) * 100).toFixed(0)}% dos inscritos`}
            description="20% de desconto"
          />
          
          <Card
            title="Parcelado"
            value={totalParcelado}
            icon={<Wallet className="text-amber-500" size={20} />}
            trend="2 parcelas"
            description="Mais escolhido"
          />
          
          <Card
            title="Pendentes"
            value={totalPendente}
            icon={<Clock className="text-yellow-500" size={20} />}
            trend="Sem plano definido"
            description="Step 1 concluído"
          />
        </div>

        {/* Segunda linha de cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card
            title="Confirmados"
            value={totalConfirmados}
            icon={<CheckCircle className="text-green-500" size={20} />}
            trend="Pagamento processado"
            description="Inscrição garantida"
          />
          
          <Card
            title="Pend. Pagamento"
            value={totalPendentesPagamento}
            icon={<Clock className="text-yellow-500" size={20} />}
            trend="Aguardando pagamento"
            description="Step 2 pendente"
          />
          
          <Card
            title="Perfil Mais Comum"
            value={perfilMaisComum[1]}
            icon={<User className="text-purple-500" size={20} />}
            trend={perfilMaisComum[0]}
            description="Perfil predominante"
          />
        </div>

        {/* Tabela de Leads Recentes */}
        <section className="bg-[#0d1117] border border-slate-800 rounded-[2rem] overflow-hidden mb-10">
          <div className="p-6 border-b border-slate-800 bg-[#161b22]/30 flex justify-between items-center">
            <h2 className="text-white font-black uppercase italic text-sm tracking-tight flex items-center gap-2">
              <Users size={16} className="text-blue-500" /> Candidaturas Recentes
              <span className="text-slate-500 text-xs font-normal ml-2">
                ({leads.length} total)
              </span>
            </h2>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition-colors">
                Todos
              </button>
              <button className="text-xs px-3 py-1 bg-slate-800 text-slate-400 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors">
                Confirmados
              </button>
              <button className="text-xs px-3 py-1 bg-slate-800 text-slate-400 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors">
                Pendentes
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800">
                  <th className="px-8 py-4">Candidato</th>
                  <th className="px-8 py-4">Contato</th>
                  <th className="px-8 py-4">Perfil</th>
                  <th className="px-8 py-4">Plano</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Data</th>
                  <th className="px-8 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-12 text-center">
                      <Users className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                      <p className="text-slate-500">Nenhuma inscrição encontrada</p>
                      <p className="text-slate-600 text-sm mt-2">
                        As inscrições aparecerão aqui automaticamente
                      </p>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-blue-600/5 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <p className="text-white font-bold text-sm">
                          {lead.nome}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono uppercase">
                          {lead.email}
                        </p>
                      </td>
                      
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <Phone size={12} className="text-slate-500" />
                          <span className="text-xs text-slate-300 font-mono">
                            {lead.whatsapp}
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900/30 text-blue-400">
                          {lead.perfil || "Não informado"}
                        </span>
                      </td>
                      
                      <td className="px-8 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            lead.plano === "vista" 
                              ? "text-green-500 bg-green-500/10" 
                              : lead.plano === "parcelado"
                              ? "text-blue-500 bg-blue-500/10"
                              : "text-yellow-500 bg-yellow-500/10"
                          }`}
                        >
                          {lead.plano === "vista" ? "À Vista" : 
                           lead.plano === "parcelado" ? "Parcelado" : 
                           "Pendente"}
                        </span>
                      </td>
                      
                      <td className="px-8 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            lead.status === "confirmado" 
                              ? "text-green-500 bg-green-500/10" 
                              : "text-yellow-500 bg-yellow-500/10"
                          }`}
                        >
                          {lead.status === "confirmado" ? "Confirmado" : "Lead"}
                        </span>
                      </td>
                      
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-slate-500" />
                          <span className="text-xs text-slate-400 font-bold">
                            {new Date(lead.createdAt).toLocaleDateString("pt-PT")}
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <a
                            href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white rounded-lg border border-green-600/30 transition-all"
                            title="Contatar via WhatsApp"
                          >
                            <Phone size={14} />
                          </a>
                          <a
                            href={`mailto:${lead.email}`}
                            className="p-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg border border-blue-600/30 transition-all"
                            title="Enviar email"
                          >
                            <Mail size={14} />
                          </a>
                          <DeleteLeadButton id={String(lead.id)} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Paginação/Footer da tabela */}
          {leads.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-[#161b22]/30 flex justify-between items-center">
              <p className="text-slate-500 text-xs">
                Mostrando {Math.min(leads.length, 50)} de {totalLeads} inscrições
              </p>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1 bg-slate-800 text-slate-400 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Anterior
                </button>
                <button className="text-xs px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition-colors">
                  Próxima
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Resumo por Perfil */}
        <section className="bg-[#0d1117] border border-slate-800 rounded-[2rem] p-6">
          <h3 className="text-white font-black uppercase italic text-sm tracking-tight mb-6 flex items-center gap-2">
            <User size={16} className="text-purple-500" /> Distribuição por Perfil
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(perfis).map(([perfil, count]) => (
              <div key={perfil} className="bg-[#161b22] p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300 font-semibold capitalize">
                    {perfil}
                  </span>
                  <span className="text-lg font-black text-white">
                    {count}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(count / totalLeads) * 100}%` }}
                  ></div>
                </div>
                <p className="text-slate-500 text-xs mt-2">
                  {((count / totalLeads) * 100).toFixed(1)}% do total
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}