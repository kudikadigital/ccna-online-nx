import { prisma } from "@/lib/prisma";
import { Phone } from "lucide-react";
import { DeleteLeadButton } from "@/components/DeleteLeadButton";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex min-h-screen bg-[#0a0c10] text-slate-300">
      {/* Sidebar aqui (recomendo extrair para um componente layout) */}
      
      <main className="flex-1 ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
            Gestão de <span className="text-blue-600">Leads</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2">Base completa de potenciais alunos</p>
        </header>

        <div className="bg-[#0d1117] border border-slate-800 rounded-[2rem] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800">
                <th className="px-8 py-4">Nome</th>
                <th className="px-8 py-4">Whatsapp</th>
                <th className="px-8 py-4">Perfil</th>
                <th className="px-8 py-4">Objetivo</th>
                <th className="px-8 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-blue-600/5 transition-colors">
                  <td className="px-8 py-5">
                    <p className="text-white font-bold text-sm">{lead.nome}</p>
                    <p className="text-[10px] text-slate-500 font-mono italic">{lead.email}</p>
                  </td>
                  <td className="px-8 py-5 font-mono text-xs">{lead.whatsapp}</td>
                  <td className="px-8 py-5">
                    <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold uppercase text-slate-400">
                      {lead.perfil || "N/A"}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-xs text-slate-500 max-w-xs truncate">
                    {lead.objetivo}
                  </td>
                  <td className="px-8 py-5 text-right flex justify-end gap-2">
                    <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`} className="p-2 bg-green-600/10 text-green-500 rounded-lg"><Phone size={14}/></a>
                    <DeleteLeadButton id={String(lead.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}