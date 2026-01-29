"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🔹 Itens do menu
  const menuItems = [
    // { label: "Sobre", href: "info" },
    { label: "Conteúdo", href: "features" },
    { label: "Benefícios", href: "benefits" },
    { label: "Habilidades", href: "skills" },
    { label: "Preço", href: "pricing" },
    { label: "Instrutores", href: "instructors" },
    { label: "FAQ", href: "faq" },
  ];
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsMenuOpen(false);
  };

  // 🔹 Scroll suave
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 p-4 pointer-events-none">
      <div className="container mx-auto max-w-7xl flex justify-between items-center bg-slate-950/80 backdrop-blur-xl border border-slate-800/50 p-3 md:p-4 rounded-3xl shadow-2xl shadow-black/40 pointer-events-auto">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 group focus:outline-none p-1"
          aria-label="Voltar ao topo"
        >
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            I
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-xl tracking-tighter uppercase">
              INEFOR<span className="text-blue-500">.</span>
            </span>
            <span className="text-blue-500 font-bold text-[9px] tracking-[0.2em] uppercase">
              CCNA Online
            </span>
          </div>
        </button>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleScroll(item.href)}
              className="hover:text-blue-400 transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* CTA & Toggle Mobile */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenModal}
            className="hidden sm:block bg-blue-600 text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            Inscrição Aberta
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`
          md:hidden absolute top-24 left-4 right-4 bg-slate-950/95 backdrop-blur-2xl border border-slate-800 p-8 rounded-[2rem] shadow-2xl transition-all duration-300 origin-top
          ${isMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
        `}
      >
        <div className="flex flex-col gap-6 text-center">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleScroll(item.href)}
              className="text-white font-bold text-lg uppercase tracking-widest"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => {
              setIsMenuOpen(false);
              onOpenModal();
            }}
            className="bg-blue-600 text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm"
          >
            Candidatar-se Agora
          </button>
        </div>
      </div>
    </nav>
  );
}
