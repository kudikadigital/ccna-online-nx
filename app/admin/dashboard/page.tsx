import LogoutBtn from "@/components/ui/Logout";
import { prisma } from "@/lib/prisma";
import { 
  Users, 
  LayoutDashboard, 
  TrendingUp, 
  Wallet,
  ExternalLink,
  Trash2,
  ShieldCheck
} from "lucide-react";

export const dynamic = "force-dynamic";

// 1. Defina a Interface no topo
interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: string;
}

// 2. Defina o sub-componente Card antes do componente principal ou garanta que ele seja uma função nomeada
function Card({ title, value, icon, trend }: CardProps) {
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
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
      <p className="text-4xl font-black text-white tracking-tighter italic">{value}</p>
    </div>
  );
}

// 3. Componente Principal
export default async function AdminDashboard() {
  const [leads, totalVista, totalPrestacoes] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.lead.count({ where: { pagamento: "vista" } }),
    prisma.lead.count({ where: { pagamento: "prestacoes" } }),
  ]);

  return (
    <div className="flex min-h-screen bg-[#0a0c10] text-slate-300">
      <aside className="w-64 border-r border-slate-800 bg-[#0d1117] flex flex-col fixed h-full">
        <div className="p-6">
          <div className="flex items-center gap-3 text-white mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <span className="font-black tracking-tighter italic">INEFOR ADMIN</span>
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-500 rounded-xl font-bold text-sm">
              <LayoutDashboard size={18} /> Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-bold text-sm transition-all text-slate-400">
              <Users size={18} /> Leads
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
            <p className="text-blue-500 font-black text-[10px] uppercase tracking-[0.3em] mb-1">Status em Tempo Real</p>
            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
              Dashboard <span className="text-blue-600">Overview</span>
            </h1>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Live Server</p>
            <p className="text-white font-mono text-sm">{new Date().toLocaleTimeString('pt-PT')}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card title="Total Inscritos" value={leads.length} icon={<Users className="text-blue-500" />} trend="Inscrições Totais" />
          <Card title="Pagamento à Vista" value={totalVista} icon={<TrendingUp className="text-green-500" />} trend={`${((totalVista/leads.length || 0)*100).toFixed(0)}% conversão`} />
          <Card title="Prestações" value={totalPrestacoes} icon={<Wallet className="text-amber-500" />} trend="Parcelamentos" />
        </div>

        <section className="bg-[#0d1117] border border-slate-800 rounded-[2rem] overflow-hidden">
          <div className="p-6 border-b border-slate-800 bg-[#161b22]/30">
            <h2 className="text-white font-black uppercase italic text-sm tracking-tight flex items-center gap-2">
              <Users size={16} className="text-blue-500" /> Candidaturas Recentes
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800">
                  <th className="px-8 py-4">Candidato</th>
                  <th className="px-8 py-4">Pagamento</th>
                  <th className="px-8 py-4">Data</th>
                  <th className="px-8 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-blue-600/5 transition-colors">
                    <td className="px-8 py-5">
                      <p className="text-white font-bold text-sm">{lead.nome}</p>
                      <p className="text-[10px] text-slate-500 font-mono uppercase">{lead.email}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${lead.pagamento === 'vista' ? 'text-green-500 bg-green-500/10' : 'text-blue-500 bg-blue-500/10'}`}>
                        {lead.pagamento}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-xs text-slate-400 font-bold">
                      {new Date(lead.createdAt).toLocaleDateString('pt-PT')}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <a href={`https://wa.me/${lead.whatsapp}`} target="_blank" className="p-2 bg-slate-800 rounded-lg hover:bg-green-600 text-white transition-all">
                          <ExternalLink size={14} />
                        </a>
                        <button className="p-2 bg-slate-800 rounded-lg hover:bg-red-600 text-white transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}