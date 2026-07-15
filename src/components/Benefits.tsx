import React from "react";
import {
  Palette,
  Zap,
  Search,
  Smartphone,
  ShieldCheck,
  MessageSquare,
  Share2,
  Server,
  LayoutDashboard,
  BarChart3,
  LineChart,
} from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Design Exclusivo",
      description: "Sites projetados do zero pela nossa equipe de UI/UX, sem templates prontos ou copiados do mercado.",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Alta Performance",
      description: "Otimização absoluta para carregar em menos de 2 segundos. Notas acima de 95 no Google Lighthouse.",
      icon: Zap,
      color: "from-amber-400 to-orange-500",
    },
    {
      title: "SEO Otimizado",
      description: "Estruturação técnica impecável para que sua empresa conquiste as primeiras posições das pesquisas orgânicas.",
      icon: Search,
      color: "from-emerald-400 to-teal-500",
    },
    {
      title: "100% Responsivo",
      description: "Ajuste milimétrico para celulares, tablets, notebooks, desktops e Smart TVs de forma integrada.",
      icon: Smartphone,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Segurança Avançada",
      description: "Certificado SSL ativo, firewalls contra ataques de força bruta, e conformidade rigorosa com a LGPD.",
      icon: ShieldCheck,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Integração WhatsApp",
      description: "Direcionamento automático para canais de venda e atendentes comerciais de forma estratégica.",
      icon: MessageSquare,
      color: "from-green-400 to-emerald-600",
    },
    {
      title: "Mídias Sociais",
      description: "Links, feeds integrados, compartilhamento ágil e pixel do Meta/TikTok instalado para suas campanhas.",
      icon: Share2,
      color: "from-sky-400 to-blue-600",
    },
    {
      title: "Hospedagem Premium",
      description: "Servidores rápidos localizados em containers Cloud Run dedicados com alta tolerância a falhas.",
      icon: Server,
      color: "from-neutral-700 to-neutral-900",
    },
    {
      title: "Painel Administrativo",
      description: "Painel intuitivo e exclusivo para que você mesmo altere textos, blogs e imagens com total autonomia.",
      icon: LayoutDashboard,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Google Analytics",
      description: "Saiba exatamente quem está acessando o seu site, as páginas mais visitadas e de onde vêm seus clientes.",
      icon: BarChart3,
      color: "from-amber-500 to-yellow-600",
    },
    {
      title: "Search Console",
      description: "Monitoramento de indexação, cliques de termos de busca, erros de navegação e saúde do site direto no Google.",
      icon: LineChart,
      color: "from-red-400 to-orange-600",
    },
  ];

  return (
    <section id="beneficios" className="py-20 bg-neutral-50 dark:bg-[#020617]/65 relative border-t border-neutral-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-mono font-bold tracking-widest uppercase text-neon-blue">
            O que agregamos ao seu comércio
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-neutral-900 dark:text-white">
            Como Nossos Serviços Impulsionam Seu Negócio?
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            Mais do que um site bonito, desenvolvemos ecossistemas digitais de alto impacto focados em converter visitantes em clientes pagantes e otimizar a presença digital da sua marca.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const IconComponent = b.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-white dark:bg-[#020617]/40 border border-neutral-200/40 dark:border-white/5 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-md"
              >
                {/* Accent bar */}
                <div className={`absolute top-0 left-0 w-full h-1.5 rounded-t-2xl bg-gradient-to-r ${b.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-neutral-100 dark:bg-black/20 text-neutral-800 dark:text-neutral-200 group-hover:bg-neon-blue/10 group-hover:text-neon-blue transition-colors duration-300 shadow-inner">
                  <IconComponent size={22} />
                </div>

                {/* Info */}
                <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white mb-2 group-hover:text-neon-blue transition-colors duration-200">
                  {b.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
