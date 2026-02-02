import { Sidebar } from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0c10] text-slate-300">
      {/* Sidebar Fixa */}
      <Sidebar />

      {/* Área de Conteúdo Dinâmico */}
      <main className="flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}