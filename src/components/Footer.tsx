import React from "react";
import { Laptop, Phone, Mail, Instagram, Facebook, Linkedin, ArrowUp } from "lucide-react";
import TransparentLogo from "./TransparentLogo";

interface FooterProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export default function Footer({ onOpenAdmin, isAdminLoggedIn }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-900 pt-16 pb-8 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="glow-spot w-72 h-72 bg-neon-blue/10 bottom-[-100px] left-[-50px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <a href="#" className="flex items-center group">
              <TransparentLogo
                src="https://i.ibb.co/9znFG8K/IMG-1986.png"
                alt="Universo On-line Logo"
                className="h-20 sm:h-24 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                darkMode={true}
              />
            </a>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Desenvolvemos sistemas, sites corporativos de alto padrão e soluções digitais sob medida para transformar as suas ideias em resultados de mercado reais e sustentáveis.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-neutral-900 hover:bg-neon-blue/20 hover:text-neon-blue transition-colors text-neutral-400">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-neutral-900 hover:bg-neon-blue/20 hover:text-neon-blue transition-colors text-neutral-400">
                <Facebook size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-neutral-900 hover:bg-neon-blue/20 hover:text-neon-blue transition-colors text-neutral-400">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-neon-blue font-mono">Links Rápidos</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#beneficios" className="hover:text-neon-blue transition-colors">O Que Agregamos</a></li>
              <li><a href="#portfolio" className="hover:text-neon-blue transition-colors">Portfólio & Cases</a></li>
              <li><a href="#servicos" className="hover:text-neon-blue transition-colors">Nossos Serviços</a></li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-neon-blue font-mono">Serviços Premium</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><span className="hover:text-white transition-colors">Criação de Landing Pages</span></li>
              <li><span className="hover:text-white transition-colors">Sites Institucionais Otimizados</span></li>
              <li><span className="hover:text-white transition-colors">Desenvolvimento de SaaS</span></li>
              <li><span className="hover:text-white transition-colors">Plataformas E-commerce completas</span></li>
              <li><span className="hover:text-white transition-colors">Chatbots e Automações de IA</span></li>
              <li><span className="hover:text-white transition-colors">Otimização Técnica de SEO</span></li>
            </ul>
          </div>

          {/* Contact and address */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-neon-blue font-mono">Contato Direto</h4>
            <ul className="space-y-3.5 text-xs text-neutral-400">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-neon-blue shrink-0 mt-0.5" />
                <a href="https://api.whatsapp.com/send?phone=5511999999999" target="_blank" rel="noreferrer" className="hover:text-white">
                  +55 (11) 99999-9999 (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-neon-blue shrink-0 mt-0.5" />
                <a href="mailto:contato@universoonline.tech" className="hover:text-white">
                  contato@universoonline.tech
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <span>© {currentYear} Universo On-line. Todos os direitos reservados.</span>
            <span className="text-neutral-700">|</span>
            <button className="hover:text-neutral-300">Política de Privacidade</button>
            <span className="text-neutral-700">|</span>
            <button className="hover:text-neutral-300">Termos de Uso</button>
          </div>

          <div className="flex items-center gap-3">
            {/* Simple toggle for admin console */}
            <button
              onClick={onOpenAdmin}
              className={`text-[10px] font-mono px-3 py-1 rounded border transition-colors ${
                isAdminLoggedIn
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              🔐 {isAdminLoggedIn ? "CMS Logado" : "Acesso Restrito"}
            </button>
            
            <button
              onClick={handleScrollTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-colors"
              title="Voltar ao topo"
            >
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
