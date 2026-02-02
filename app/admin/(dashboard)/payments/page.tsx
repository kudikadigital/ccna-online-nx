import { prisma } from "@/lib/prisma";
import { FileText, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  const payments = await prisma.lead.findMany({
    where: { plano: { in: ["vista", "parcelado"] } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex min-h-screen bg-[#0a0c10] text-slate-300">
      <main className="flex-1 ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
            Fluxo de <span className="text-blue-600">Pagamentos</span>
          </h1>
        </header>

        <div className="bg-[#0d1117] border border-slate-800 rounded-[2rem] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800">
                <th className="px-8 py-4">Aluno</th>
                <th className="px-8 py-4">Plano</th>
                <th className="px-8 py-4">ID Transação</th>
                <th className="px-8 py-4">Comprovativo</th>
                <th className="px-8 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-amber-500/5 transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-white">{p.nome}</td>
                  <td className="px-8 py-5 uppercase text-[10px] font-black">
                    <span className={p.plano === "vista" ? "text-green-500" : "text-blue-500"}>
                      {p.plano}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-mono text-[10px] text-slate-500">
                    {p.paymentId || "AGUARDANDO..."}
                  </td>
                  <td className="px-8 py-5">
                    {p.comprovativoUrl ? (
                      <a href={p.comprovativoUrl} target="_blank" className="flex items-center gap-2 text-xs text-blue-400 hover:underline">
                        <FileText size={14}/> PDF/JPG
                      </a>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-amber-500/50">
                        <AlertTriangle size={12}/> Não enviado
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-[10px] font-black uppercase bg-slate-800 px-3 py-1 rounded-lg hover:bg-blue-600 transition-all">
                      Validar
                    </button>
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