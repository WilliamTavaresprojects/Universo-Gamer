import React, { useState } from "react";
import { Sun, Moon, Menu, X, Lock, MessageSquareCode } from "lucide-react";
import TransparentLogo from "./TransparentLogo";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAdmin: () => void;
  onOpenAi: () => void;
  isAdminLoggedIn: boolean;
}

export default function Header({
  darkMode,
  setDarkMode,
  onOpenAdmin,
  onOpenAi,
  isAdminLoggedIn,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Benefícios", href: "#beneficios" },
    { name: "Trabalhos", href: "#portfolio" },
    { name: "Serviços", href: "#servicos" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b transition-all duration-300 backdrop-blur-xl border-neutral-200/30 dark:border-white/10 bg-white/80 dark:bg-[#020617]/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Logo - Universo On-line */}
        <a href="#" className="flex items-center group">
          <TransparentLogo
            src="https://i.ibb.co/9znFG8K/IMG-1986.png"
            alt="Universo On-line Logo"
            className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-all duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-600 hover:text-neon-blue dark:text-neutral-300 dark:hover:text-neon-blue transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-colors duration-200"
            title="Alterar tema"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* AI Assistant Call */}
          <button
            onClick={onOpenAi}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-neon-blue/10 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/20 transition-all duration-300 shadow-[0_0_10px_rgba(0,174,239,0.1)] hover:shadow-[0_0_15px_rgba(0,174,239,0.2)]"
          >
            <MessageSquareCode size={16} />
            <span>Consultor IA</span>
          </button>

          {/* CMS Admin Button */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono tracking-tight rounded-lg border transition-all duration-300 ${
              isAdminLoggedIn
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700/60"
            }`}
          >
            <Lock size={13} />
            <span>{isAdminLoggedIn ? "CMS Ativo" : "Painel CMS"}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200/20 dark:border-neutral-800/50 bg-white dark:bg-dark-bg px-4 py-6 space-y-4 shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-top-5">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neon-blue dark:hover:text-neon-blue transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/60 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAi();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-lg bg-neon-blue text-white shadow-lg shadow-neon-blue/20"
            >
              <MessageSquareCode size={18} />
              <span>Falar com o Consultor IA</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Lock size={14} />
              <span>{isAdminLoggedIn ? "Dashboard CMS Ativo" : "Acessar Painel CMS"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
