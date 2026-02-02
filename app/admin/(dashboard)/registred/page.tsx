import { prisma } from "@/lib/prisma";
import { CheckCircle, Briefcase, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function RegisteredPage() {
  const inscritos = await prisma.lead.findMany({
    where: { status: "confirmado" },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="flex min-h-screen bg-[#0a0c10] text-slate-300">
      <main className="flex-1 ml-64 p-8">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
              Alunos <span className="text-green-500">Confirmados</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2">Inscrições com pagamento validado</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-2xl">
            <span className="text-green-500 font-black text-xl">{inscritos.length}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {inscritos.map((aluno) => (
            <div key={aluno.id} className="bg-[#0d1117] border border-slate-800 p-6 rounded-[2rem] flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-black text-lg italic">{aluno.nome}</h3>
                  <p className="text-blue-500 text-xs font-mono uppercase tracking-tighter">{aluno.profissao || "Estudante"}</p>
                </div>
                <CheckCircle className="text-green-500" size={24} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-slate-500" />
                  <span className="text-xs text-slate-400">{aluno.cargo || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-slate-500" />
                  <span className="text-xs text-slate-400">{aluno.empresa || "N/A"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}