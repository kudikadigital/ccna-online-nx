import Image from "next/image";

export function Instructors() {
  return (
    <section
      id="instrutores"
      className="py-24 bg-white px-4 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">
            Especialistas que guiam você
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-500 font-medium uppercase tracking-widest text-sm">
            Experiência de mercado e certificações internacionais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="group flex flex-col md:flex-row items-center gap-8 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-blue-600 rounded-full scale-105 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden relative z-10">
                <Image
                  src="/img/ladislau.jpg"
                  alt="Ladislau Pereira"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg z-20">
                CISCO
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-slate-900 mb-1">
                Ladislau Pereira
              </h3>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-4">
                Cisco CCNA & CCNP Specialist
              </p>
              <p className="text-slate-600 leading-relaxed text-sm">
                Especialista em infraestrutura, roteamento e switching com
                domínio avançado em GNS3, automação de redes e sistemas SOAR.
                Focado em preparar alunos para desafios reais de arquitetura de
                redes.
              </p>
            </div>
          </div>

          <div className="group flex flex-col md:flex-row items-center gap-8 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-blue-600 rounded-full scale-105 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden relative z-10">
                <Image
                  src="/img/osvaldo.jpg"
                  alt="Osvaldo Amadeu"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg z-20">
                CISCO
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-slate-900 mb-1">
                Osvaldo Amadeu
              </h3>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-4">
                Eng. de Telecomunicações | Instrutor CCNA
              </p>
              <p className="text-slate-600 leading-relaxed text-sm">
                Instrutor certificado CCNA e HCIA. Especialista em
                dimensionamento de redes móveis e segurança eletrónica, trazendo
                uma visão multidisciplinar para a formação técnica em
                telecomunicações.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Aulas ministradas por quem vive a tecnologia no dia a dia.
          </p>
        </div>
      </div>
    </section>
  );
}
