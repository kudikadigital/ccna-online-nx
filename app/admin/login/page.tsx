"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica simples de demonstração (Substituir por Auth real)
    if (password === "admin123") {
      router.push("/admin/dash");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
            <ShieldCheck className="text-white h-8 w-8" />
          </div>
          <h1 className="text-white font-black text-2xl uppercase tracking-tighter italic">Admin INEFOR</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Acesso Restrito</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase text-blue-500 mb-2 tracking-[0.2em]">Chave de Acesso</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl uppercase tracking-tighter transition-all">
            Entrar no Painel
          </button>
        </form>
      </div>
    </main>
  );
}