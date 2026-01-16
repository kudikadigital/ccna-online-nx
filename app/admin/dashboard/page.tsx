"use client";
import { Users, Download, ExternalLink } from "lucide-react";

export default function AdminDash() {
  // Simulando dados que viriam da API
  const leads = [
    { id: 1, nome: "Carlos Manuel", whatsapp: "923000111", email: "carlos@mail.com", plano: "À Vista" },
    { id: 2, nome: "Ana Silva", whatsapp: "912444555", email: "ana.s@mail.com", plano: "Parcelado" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Gestão de Leads</h1>
            <p className="text-slate-500 font-medium">Turma CCNA Online - Fevereiro 2026</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} /> Exportar CSV
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Users size={24}/></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Candidatos</p>
                <p className="text-2xl font-black text-slate-900">{leads.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Candidato</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Contacto</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Plano</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{lead.nome}</p>
                    <p className="text-xs text-slate-500">{lead.email}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{lead.whatsapp}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase italic">
                      {lead.plano}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a 
                      href={`https://wa.me/244${lead.whatsapp}`} 
                      target="_blank" 
                      className="inline-flex items-center gap-1 text-blue-600 font-bold text-xs hover:underline"
                    >
                      WHATSAPP <ExternalLink size={12}/>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}