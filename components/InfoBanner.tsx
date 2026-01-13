import { Calendar, Clock, Zap } from "lucide-react";

export default function InfoBanner() {
  return (
    <section className="relative z-20 -mt-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-blue-600 rounded-3xl md:rounded-full py-8 md:py-5 px-10 shadow-[0_20px_50px_rgba(37,99,235,0.4)] border border-blue-400/30 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
            
            {/* Item: Início */}
            <div className="flex items-center gap-4 group">
              <div className="p-2.5 bg-white/10 rounded-xl group-hover:bg-white/20 transition-all duration-300">
                <Calendar className="h-5 w-5 text-blue-100" />
              </div>
              <div className="flex flex-col">
                <span className="text-blue-200 text-[10px] uppercase font-black tracking-[0.2em] mb-0.5">
                  Início
                </span>
                <span className="text-white font-bold text-sm md:text-base whitespace-nowrap">
                  14 de Fevereiro, 2026
                </span>
              </div>
            </div>

            {/* Separador Desktop */}
            <div className="hidden md:block w-px h-10 bg-blue-400/30"></div>

            {/* Item: Horário */}
            <div className="flex items-center gap-4 group">
              <div className="p-2.5 bg-white/10 rounded-xl group-hover:bg-white/20 transition-all duration-300">
                <Clock className="h-5 w-5 text-blue-100" />
              </div>
              <div className="flex flex-col">
                <span className="text-blue-200 text-[10px] uppercase font-black tracking-[0.2em] mb-0.5">
                  Horário
                </span>
                <span className="text-white font-bold text-sm md:text-base whitespace-nowrap">
                  19:00 - 21:00
                </span>
              </div>
            </div>

            {/* Separador Desktop */}
            <div className="hidden md:block w-px h-10 bg-blue-400/30"></div>

            {/* Item: Duração */}
            <div className="flex items-center gap-4 group">
              <div className="p-2.5 bg-white/10 rounded-xl group-hover:bg-white/20 transition-all duration-300">
                <Zap className="h-5 w-5 text-blue-100" />
              </div>
              <div className="flex flex-col">
                <span className="text-blue-200 text-[10px] uppercase font-black tracking-[0.2em] mb-0.5">
                  Duração
                </span>
                <span className="text-white font-bold text-sm md:text-base whitespace-nowrap">
                  3 Meses Intensivos
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}