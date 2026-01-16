import { prisma } from "@/lib/prisma";
import { Users, ExternalLink, Calendar } from "lucide-react";

export const dynamic = "force-dynamic"; // Garante que os dados sejam sempre frescos

export default async function AdminDash() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-900">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tight italic">
            Dashboard <span className="text-blue-600">Leads</span>
          </h1>
          <p className="text-slate-500 font-medium">Controlo de Inscrições CCNAv7</p>
        </header>

        {/* Card de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <Users size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Inscritos</p>
                <p className="text-3xl font-black tracking-tighter">{leads.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Leads */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest">
                  <th className="px-8 py-5">Candidato</th>
                  <th className="px-8 py-5">Pagamento</th>
                  <th className="px-8 py-5">Data</th>
                  <th className="px-8 py-5 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-900">{lead.nome}</div>
                      <div className="text-xs text-slate-500 font-medium">{lead.email}</div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        lead.pagamento === 'vista' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {lead.pagamento}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-tight">
                        <Calendar size={12} />
                        {new Date(lead.createdAt).toLocaleDateString('pt-PT')}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <a 
                        href={`https://wa.me/244${lead.whatsapp.replace(/\s/g, '')}`} 
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-slate-900/10 active:scale-95"
                      >
                        Contactar <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {leads.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-sm italic">
              Nenhum lead recebido até ao momento.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}