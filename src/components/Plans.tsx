import React from "react";
import { Check, HelpCircle, ArrowRight } from "lucide-react";
import { Plan } from "../types";

interface PlansProps {
  plans: Plan[];
}

export default function Plans({ plans }: PlansProps) {
  
  // Custom WhatsApp routing per plan selection
  const getWhatsAppPlanLink = (planName: string, planPrice: string) => {
    const text = `Olá Universo On-line! Gostaria de fechar o contrato do *${planName}* (Investimento de R$ ${planPrice}) para minha empresa. Podem me orientar sobre os próximos passos?`;
    return `https://api.whatsapp.com/send?phone=5511999999999&text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="planos" className="py-20 bg-neutral-50 dark:bg-[#081B33]/65 relative border-t border-b border-neutral-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-mono font-bold tracking-widest uppercase text-neon-blue">
            Nossos Planos de Parceria
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-neutral-900 dark:text-white">
            Planos Ajustados ao Seu Crescimento
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            Transparência absoluta. Escolha o plano ideal para a sua empresa expandir no digital, sem custos ocultos e com entrega garantida por contrato.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => {
            const isFeatured = p.badge === "Mais Vendido";
            return (
              <div
                key={p.id}
                className={`relative rounded-3xl flex flex-col justify-between p-8 md:p-10 transition-all duration-300 ${
                  isFeatured
                    ? "bg-gradient-to-b from-[#081B33] to-[#011428] text-white border-2 border-neon-blue shadow-2xl shadow-neon-blue/15 scale-102 z-10 relative overflow-hidden backdrop-blur-xl"
                    : "bg-white dark:bg-[#081B33]/40 border border-neutral-200/40 dark:border-white/5 shadow-sm hover:shadow-xl text-neutral-950 dark:text-neutral-200 backdrop-blur-md"
                }`}
              >
                {/* Popular Badge */}
                {p.badge && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-neon-blue text-white font-extrabold shadow-md">
                    {p.badge}
                  </span>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className={`font-display font-extrabold text-xl ${
                      isFeatured ? "text-white" : "text-neutral-900 dark:text-white"
                    }`}>
                      {p.name}
                    </h3>
                    <p className={`text-xs mt-1.5 leading-relaxed ${
                      isFeatured ? "text-neutral-300" : "text-neutral-500 dark:text-neutral-400"
                    }`}>
                      {p.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 flex items-baseline gap-1">
                    <span className={`text-xs font-mono font-bold ${
                      isFeatured ? "text-neon-blue" : "text-neutral-400"
                    }`}>
                      R$
                    </span>
                    <span className={`text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight ${
                      isFeatured ? "text-white" : "text-neutral-900 dark:text-white"
                    }`}>
                      {p.price}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium ml-1">
                      /{p.period}
                    </span>
                  </div>

                  {/* Features Divider */}
                  <div className="border-t border-neutral-200/50 dark:border-neutral-800/50 pt-6 mb-8">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider mb-4 text-neutral-400">
                      O que está incluso:
                    </p>
                    
                    <ul className="space-y-3">
                      {p.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                          <div className={`p-0.5 rounded-full mt-0.5 shrink-0 ${
                            isFeatured ? "bg-neon-blue/20 text-neon-blue" : "bg-emerald-500/10 text-emerald-500"
                          }`}>
                            <Check size={12} />
                          </div>
                          <span className={isFeatured ? "text-neutral-200" : "text-neutral-600 dark:text-neutral-300"}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Action button */}
                <a
                  href={getWhatsAppPlanLink(p.name, p.price)}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-4 text-center text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                    isFeatured
                      ? "bg-neon-blue hover:bg-neon-blue/90 text-white shadow-lg shadow-neon-blue/35 cursor-pointer"
                      : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 cursor-pointer"
                  }`}
                >
                  <span>{p.ctaText}</span>
                  <ArrowRight size={14} />
                </a>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
