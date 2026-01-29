"use client";

interface HeroProps {
  onOpenModal: () => void;
}

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section id="/" className="relative bg-slate-900 text-white pt-32 pb-20 px-4 flex items-center overflow-hidden min-h-[80vh]">
      {/* Imagem de Fundo Moderna com Gradiente Escuro */}
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="grad1" cx="30%" cy="10%">
                  <stop offset="0%" style="stop-color:#1e40af;stop-opacity:0.3" />
                  <stop offset="100%" style="stop-color:#1e293b;stop-opacity:0" />
                </radialGradient>
                <radialGradient id="grad2" cx="70%" cy="90%">
                  <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:0.2" />
                  <stop offset="100%" style="stop-color:#1e293b;stop-opacity:0" />
                </radialGradient>
                <filter id="noise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                  <feBlend in="SourceGraphic" mode="multiply" />
                </filter>
              </defs>
              <rect width="100%" height="100%" fill="#0f172a"/>
              <rect width="100%" height="100%" fill="url(%23grad1)"/>
              <rect width="100%" height="100%" fill="url(%23grad2)"/>
              <rect width="100%" height="100%" filter="url(%23noise)" opacity="0.15"/>
            </svg>
          `)}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Efeito Grain Overlay */}
      {/* Imagem de Fundo */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
      linear-gradient(
        rgba(15, 23, 42, 0.75),
        rgba(15, 23, 42, 0.85)
      ),
      url('/bg.jpg')
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Luzes e Reflexos Modernos */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Luz principal azul */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        {/* Luz secundária ciano */}
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>

        {/* Reflexos de grade sutil */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 70%)",
          }}
        ></div>
      </div>

      {/* Zonas escuras para contraste */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900/90 via-transparent to-slate-900/80 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center text-center">
        {/* Badge de Urgência */}
        <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/40 text-blue-300 text-[10px] font-black px-4 py-2 rounded-full mb-8 uppercase tracking-[0.2em] animate-pulse">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Vagas Limitadas
        </div>

        {/* Título Principal */}
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
          CCNA ONLINE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 animate-gradient">
            3 MÓDULOS
          </span>
        </h1>

        {/* Descrição */}
        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl leading-relaxed font-medium backdrop-blur-sm bg-slate-900/30 px-6 py-4 rounded-2xl">
          Pare de adiar sua carreira em Redes. Comece{" "}
          <span className="text-white font-bold underline decoration-blue-500 decoration-2 underline-offset-4">
            AGORA
          </span>{" "}
          com a formação completa de{" "}
          <span className="text-white font-black italic">CCNAv7</span> no
          INEFOR.
        </p>

        {/* Botão de Ação */}
<button
  onClick={onOpenModal}
  className="group relative bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black py-6 px-12 rounded-2xl transition-all duration-300 shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:-translate-y-1 active:scale-95 text-xl uppercase tracking-tighter"
>
  QUERO GARANTIR MINHA VAGA
  <span className="absolute -top-3 -right-3 bg-yellow-400 text-slate-900 text-[10px] px-3 py-1 rounded-lg font-black rotate-12 shadow-xl border-2 border-slate-900 uppercase">
    OFERTA
  </span>
</button>


        {/* Features/Diferenciais */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-slate-700/50 w-full max-w-4xl backdrop-blur-sm bg-slate-900/20 rounded-3xl p-6">
          <div className="flex flex-col items-center group">
            <div className="mb-3 p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300">
              <span className="text-blue-400 font-black uppercase text-xs tracking-[0.2em] group-hover:text-blue-300 transition-colors">
                Aulas
              </span>
            </div>
            <p className="text-slate-300 text-sm font-bold uppercase tracking-tight">
              Ao vivo + gravações
            </p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="mb-3 p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300">
              <span className="text-blue-400 font-black uppercase text-xs tracking-[0.2em] group-hover:text-blue-300 transition-colors">
                Plataforma
              </span>
            </div>
            <p className="text-slate-300 text-sm font-bold uppercase tracking-tight">
              Cisco Networking Academy
            </p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="mb-3 p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300">
              <span className="text-blue-400 font-black uppercase text-xs tracking-[0.2em] group-hover:text-blue-300 transition-colors">
                Certificação
              </span>
            </div>
            <p className="text-slate-300 text-sm font-bold uppercase tracking-tight">
              Oficial da CISCO
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
