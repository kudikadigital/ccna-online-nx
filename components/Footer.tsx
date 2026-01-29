"use client";

import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 px-4 overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-500/5 to-transparent"></div>
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Layout principal - duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Coluna Esquerda - Ainda com dúvidas? */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-8">
              <Mail className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-bold uppercase text-sm tracking-wider">
                Fale Connosco
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Ainda com <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">dúvidas?</span>
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-medium">geral@inefor.ao</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-300 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-medium">+244 923 456 789</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-300 hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-medium">Luanda, Angola</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Redes Sociais e Logo */}
          <div className="flex flex-col items-center lg:items-end justify-between">
            {/* Logo INEFOR */}
            <div className="mb-8 lg:mb-0">
              <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-right">
                INEFOR<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">.</span>
              </h3>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-2 text-right">
                Centro de Formação Tecnológica
              </p>
            </div>

            {/* Redes Sociais */}
            <div className="flex items-center gap-6">
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300 group"
              >
                <div className="w-6 h-6 text-red-400 group-hover:text-red-300">📷</div>
              </a>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-8"></div>

        {/* Rodapé inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Direitos autorais centralizados */}
          <div className="text-center md:text-left order-2 md:order-1">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
              &copy; 2026 INEFOR. Todos os direitos reservados.
            </p>
          </div>
          
          {/* Links centrais */}
          <div className="order-1 md:order-2 flex gap-8">
            <a 
              href="#" 
              className="text-[10px] text-slate-500 font-black uppercase tracking-widest hover:text-slate-300 transition-colors"
            >
              Termos
            </a>
            <a 
              href="#" 
              className="text-[10px] text-slate-500 font-black uppercase tracking-widest hover:text-slate-300 transition-colors"
            >
              Privacidade
            </a>
          </div>
          
          {/* Espaço vazio para balancear layout */}
          <div className="hidden md:block order-3 w-40"></div>
        </div>
      </div>
    </footer>
  );
}