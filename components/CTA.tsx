"use client";

interface CTAProps {
  onOpenModal: () => void;
}

export default function CTA({ onOpenModal }: CTAProps) {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Efeito de Grid de Fundo */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`, 
          backgroundSize: '30px 30px' 
        }}
      ></div>
      
      {/* Luz de Fundo Decorativa */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
          Não fique parado enquanto o <span className="text-blue-500">mercado avança.</span>
        </h2>
        
        <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
          O CCNA é o padrão ouro da indústria. Garanta seu lugar na elite da tecnologia com o suporte do <span className="text-white font-bold tracking-tight">INEFOR.</span>
        </p>
        
        <div className="flex flex-col items-center gap-8">
          <button 
            onClick={onOpenModal}
            className="group relative inline-flex items-center justify-center px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black text-xl rounded-[2rem] transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:-translate-y-1 active:scale-95 uppercase tracking-tighter overflow-hidden"
          >
            <span className="relative z-10">Começar agora com o INEFOR</span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          </button>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                Vagas limitadas para 09 de Fevereiro
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}