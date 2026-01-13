export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <h2 className="text-2xl font-black italic mb-6 uppercase tracking-tighter">
              INEFOR<span className="text-blue-500">.</span>
            </h2>
            <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
              O maior centro de formação tecnológica especializado em soluções Cisco em Angola. Transformando talentos em especialistas.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors uppercase">Cursos</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors uppercase">Certificações</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors uppercase">Empresa</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Localização</h4>
            <p className="text-sm text-slate-400 font-bold uppercase leading-relaxed">
              Luanda, Angola <br />
              Belas, Talatona
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
            &copy; 2026 INEFOR. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
             <span className="text-[10px] text-slate-500 font-black uppercase">Termos</span>
             <span className="text-[10px] text-slate-500 font-black uppercase">Privacidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
}