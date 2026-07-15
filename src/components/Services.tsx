import React from "react";
import { 
  Globe, FileText, Cpu, ShoppingBag, MessageSquare, 
  TrendingUp, Server, LifeBuoy, Database, Sparkles, 
  Settings, Bot, ArrowRight 
} from "lucide-react";
import { Service } from "../types";

interface ServicesProps {
  services: Service[];
  onOpenAi: () => void;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Globe: Globe,
  FileText: FileText,
  Cpu: Cpu,
  ShoppingBag: ShoppingBag,
  MessageSquare: MessageSquare,
  TrendingUp: TrendingUp,
  Server: Server,
  LifeBuoy: LifeBuoy,
  Database: Database,
  Sparkles: Sparkles,
  Settings: Settings,
  Bot: Bot
};

export default function Services({ services, onOpenAi }: ServicesProps) {
  
  // Format WhatsApp message for a specific service click
  const getWhatsAppServiceLink = (serviceTitle: string) => {
    const text = `Olá Universo On-line! Estou interessado no serviço de *${serviceTitle}* e gostaria de solicitar um orçamento para minha empresa.`;
    return `https://api.whatsapp.com/send?phone=5511999999999&text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="servicos" className="py-20 bg-white dark:bg-[#020617] relative border-t border-neutral-100 dark:border-white/5">
      <div className="glow-spot w-80 h-80 bg-blue-900/10 bottom-20 left-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Text */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-mono font-bold tracking-widest uppercase text-neon-blue">
              Soluções Sob Medida
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-neutral-900 dark:text-white">
              Nossos Serviços Especializados
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
              Criamos ecossistemas digitais robustos e de alto desempenho para transformar a presença online do seu negócio em uma máquina de vendas previsível.
            </p>
          </div>
          <div>
            <button
              onClick={onOpenAi}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neon-blue text-white text-sm font-semibold hover:bg-neon-blue/90 shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:shadow-[0_0_25px_rgba(0,174,239,0.5)] transition-all cursor-pointer"
            >
              <span>Qual solução eu preciso?</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => {
            const IconComp = iconMap[srv.iconName] || Globe;
            return (
              <div
                key={srv.id}
                className="flex flex-col justify-between p-8 rounded-3xl border border-neutral-150 dark:border-white/5 bg-neutral-50 dark:bg-[#020617]/40 hover:bg-white dark:hover:bg-[#020617]/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-900/10 dark:bg-black/20 text-neon-blue group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <IconComp size={24} />
                    </div>
                    {srv.featured && (
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-neon-blue/15 text-neon-blue uppercase tracking-widest">
                        Destaque
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white mb-3">
                    {srv.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    {srv.category}
                  </span>
                  
                  <a
                    href={getWhatsAppServiceLink(srv.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neon-blue group-hover:translate-x-1 transition-transform"
                  >
                    <span>Quero Orçamento</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
