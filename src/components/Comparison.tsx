import React from "react";
import { Check, X, Shield, Award } from "lucide-react";

export default function Comparison() {
  const comparisonItems = [
    {
      feature: "Design do Projeto",
      standard: "Uso de templates prontos, genéricos e copiados.",
      universo: "Design 100% autoral, sob medida para a sua marca.",
    },
    {
      feature: "Velocidade de Carregamento",
      standard: "Lento, pesado e com pontuação ruim no Lighthouse.",
      universo: "Páginas otimizadas que carregam em menos de 2s.",
    },
    {
      feature: "Foco em Conversão (UI/UX)",
      standard: "Apenas layouts bonitos sem técnicas de vendas.",
      universo: "Gatilhos de conversão e jornadas para WhatsApp.",
    },
    {
      feature: "Otimização Google (SEO)",
      standard: "SEO básico ou nenhum, sem sitemap técnico.",
      universo: "Indexação impecável, Schema.org e meta tags completas.",
    },
    {
      feature: "Conformidade LGPD",
      standard: "Totalmente fora das leis de proteção de dados.",
      universo: "Políticas, cookies ativos e consentimento inclusos.",
    },
    {
      feature: "Suporte Técnico",
      standard: "Sem suporte ou demora de dias para responder.",
      universo: "Suporte via WhatsApp, ágil e documentado.",
    },
    {
      feature: "Hospedagem inclusa",
      standard: "Hospedagens baratas, instáveis e lentas.",
      universo: "Servidores premium em nuvem com SSL vitalício.",
    },
  ];

  return (
    <section id="diferenciais" className="py-20 bg-white dark:bg-[#081B33] relative overflow-hidden border-t border-neutral-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-mono font-bold tracking-widest uppercase text-neon-blue">
            Nossos Diferenciais
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-neutral-900 dark:text-white">
            Universo On-line vs Outros do Mercado
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            Veja em detalhes o porquê de grandes empresas confiarem o desenvolvimento de suas plataformas digitais à nossa equipe.
          </p>
        </div>

        {/* Matrix Container */}
        <div className="overflow-x-auto rounded-3xl border border-neutral-200/40 dark:border-white/10 shadow-2xl bg-neutral-50 dark:bg-[#081B33]/40 backdrop-blur-md">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-neutral-200/30 dark:border-white/10 bg-neutral-150/50 dark:bg-black/30">
                <th className="p-6 text-sm font-bold text-neutral-500 dark:text-neutral-400 font-mono tracking-wider">RECURSOS & ENTREGAS</th>
                <th className="p-6 text-sm font-bold text-neutral-500 dark:text-neutral-400 font-mono tracking-wider">AGÊNCIAS / FREELANCERS COMUNS</th>
                <th className="p-6 text-sm font-bold text-neon-blue font-mono tracking-wider bg-neon-blue/5">UNIVERSO ON-LINE (PREMIUM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/40 dark:divide-white/5">
              {comparisonItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-150/20 dark:hover:bg-[#00AEEF]/5 transition-colors">
                  {/* Feature Label */}
                  <td className="p-6 font-display font-bold text-neutral-900 dark:text-white text-sm sm:text-base">
                    {item.feature}
                  </td>
                  
                  {/* Competitors cell */}
                  <td className="p-6 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-start gap-2.5">
                      <div className="p-0.5 rounded bg-red-500/10 text-red-500 mt-0.5">
                        <X size={14} />
                      </div>
                      <span>{item.standard}</span>
                    </div>
                  </td>
                  
                  {/* Universo cell */}
                  <td className="p-6 text-xs sm:text-sm text-neutral-950 dark:text-neutral-100 bg-neon-blue/5 font-semibold">
                    <div className="flex items-start gap-2.5">
                      <div className="p-0.5 rounded bg-emerald-500/15 text-emerald-500 mt-0.5">
                        <Check size={14} />
                      </div>
                      <span className="text-neutral-900 dark:text-white">{item.universo}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quality assurance footer inside comparison section */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-[#081B33] to-blue-900 text-white shadow-lg border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-neon-blue/5 pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-neon-blue/20 rounded-xl text-neon-blue shrink-0 shadow-[0_0_15px_rgba(0,174,239,0.25)]">
              <Shield size={24} />
            </div>
            <div>
              <h4 className="font-display font-bold text-base">Garantia Contratual Universo On-line</h4>
              <p className="text-xs text-neutral-300">Todos os projetos possuem garantia de estabilidade e suporte técnico de 90 dias incluso.</p>
            </div>
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20uma%20reuni%C3%A3o%20com%20um%20especialista%20da%20Universo%20On-line."
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-neon-blue hover:bg-neon-blue/90 rounded-xl text-xs font-bold transition-all text-center shrink-0 relative z-10 shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:shadow-[0_0_25px_rgba(0,174,239,0.55)]"
          >
            Falar com Especialista
          </a>
        </div>

      </div>
    </section>
  );
}
