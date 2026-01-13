"use client";

interface HeroProps {
  onOpenModal: () => void;
}

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="relative bg-slate-900 text-white pt-32 pb-20 px-4 flex items-center overflow-hidden min-h-[80vh]">
      {/* Grid de Pontos Decorativo */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      ></div>
      
      {/* Gradiente de Profundidade */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-blue-600/10 via-transparent to-slate-900 pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center text-center">
        {/* Badge de Urgência */}
        <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 text-[10px] font-black px-4 py-2 rounded-full mb-8 uppercase tracking-[0.2em] animate-pulse">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Vagas Limitadas
        </div>

        {/* Título Principal */}
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
          CCNA ONLINE <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600">
            (3 MÓDULOS)
          </span>
        </h1>

        {/* Descrição */}
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed font-medium">
          Pare de adiar sua carreira em Redes. Comece{" "}
          <span className="text-white font-bold underline decoration-blue-500 decoration-2 underline-offset-4">
            AGORA
          </span>{" "}
          com a formação completa de{" "}
          <span className="text-white font-black italic">CCNAv7</span> no INEFOR.
        </p>

        {/* Botão de Ação */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <button
            onClick={onOpenModal}
            className="group relative bg-blue-600 hover:bg-blue-500 text-white font-black py-6 px-12 rounded-2xl transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:-translate-y-1 active:scale-95 text-xl uppercase tracking-tighter"
          >
            QUERO GARANTIR MINHA VAGA
            <span className="absolute -top-3 -right-3 bg-yellow-400 text-slate-900 text-[10px] px-3 py-1 rounded-lg font-black rotate-12 shadow-xl border-2 border-slate-900 uppercase">
              OFERTA
            </span>
          </button>
        </div>

        {/* Features/Diferenciais */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-slate-800/60 w-full max-w-4xl">
          <div className="flex flex-col items-center group">
            <span className="text-blue-500 font-black mb-2 uppercase text-xs tracking-[0.2em] group-hover:text-blue-400 transition-colors">
              Aulas
            </span>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-tight">Ao vivo + gravações</p>
          </div>
          
          <div className="flex flex-col items-center group">
            <span className="text-blue-500 font-black mb-2 uppercase text-xs tracking-[0.2em] group-hover:text-blue-400 transition-colors">
              Plataforma
            </span>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-tight">Cisco Networking Academy</p>
          </div>
          
          <div className="flex flex-col items-center group">
            <span className="text-blue-500 font-black mb-2 uppercase text-xs tracking-[0.2em] group-hover:text-blue-400 transition-colors">
              Certificação
            </span>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-tight">Oficial da CISCO</p>
          </div>
        </div>
      </div>
    </section>
  );
}