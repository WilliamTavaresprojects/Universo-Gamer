import React, { useState } from "react";
import { Search, Compass, Cpu, CheckSquare, Rocket, BarChart3 } from "lucide-react";

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: "01",
      title: "Descobrimos seu negócio",
      icon: Search,
      short: "Imersão completa no seu nicho, objetivos, público-alvo e concorrentes.",
      long: "Realizamos uma reunião de briefing para mapear detalhadamente o seu modelo de negócios. Entendemos as dores dos seus clientes e traçamos as melhores estratégias para capturar a atenção deles logo nos primeiros segundos de navegação."
    },
    {
      num: "02",
      title: "Planejamos e Criamos",
      icon: Compass,
      short: "Definição do mapa do site, wireframes e protótipo de alta fidelidade.",
      long: "Nossos designers criam a identidade visual do site tela por tela utilizando o Figma. Você valida toda a experiência estética, fluxo de cliques e estrutura de copywriting antes de iniciarmos qualquer linha de código."
    },
    {
      num: "03",
      title: "Desenvolvemos",
      icon: Cpu,
      short: "Programação limpa com React, Tailwind CSS e TypeScript de ponta.",
      long: "Nossos desenvolvedores transformam o design aprovado em código super otimizado. Aplicamos as melhores práticas globais de performance, indexação técnica para SEO, segurança HTTPS avançada e layouts 100% responsivos."
    },
    {
      num: "04",
      title: "Testamos tudo",
      icon: CheckSquare,
      short: "Testes exaustivos em celulares, computadores, tablets e navegadores.",
      long: "Submetemos o projeto a testes rigorosos de usabilidade, compatibilidade de navegadores, velocidade de carregamento (Lighthouse superior a 95) e correção de possíveis bugs para assegurar uma navegação impecável."
    },
    {
      num: "05",
      title: "Publicamos",
      icon: Rocket,
      short: "Configuração de domínio, hospedagem Cloud Run premium e SSL.",
      long: "Colocamos o seu site no ar de forma totalmente segura. Configuramos as tags de rastreamento do Google Analytics, Tag Manager, e Pixel do Meta, deixando sua plataforma pronta para receber visitantes e campanhas de anúncios."
    },
    {
      num: "06",
      title: "Acompanhamos",
      icon: BarChart3,
      short: "Suporte prioritário e relatórios de métricas pós-lançamento.",
      long: "Após o lançamento oficial, monitoramos o comportamento dos usuários em tempo real. Fornecemos suporte técnico dedicado e relatórios de melhorias contínuas para ajudar sua empresa a escalar vendas constantemente."
    }
  ];

  return (
    <section id="processo" className="py-20 bg-neutral-150 dark:bg-[#061528] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-mono font-bold tracking-widest uppercase text-neon-blue">
            Nossa Metodologia ágil
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-neutral-900 dark:text-white">
            Como criamos o seu sucesso digital?
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            Seguimos um processo transparente e validado pelas maiores agências de tecnologia para entregar qualidade máxima e cumprimento rigoroso de prazos.
          </p>
        </div>

        {/* Interactive Steps Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Step selectors list */}
          <div className="lg:col-span-6 space-y-3">
            {steps.map((st, idx) => {
              const IconComponent = st.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-2xl flex items-center gap-4 border transition-all duration-300 cursor-pointer ${
                    activeStep === idx
                      ? "bg-white dark:bg-dark-bg border-neon-blue shadow-[0_4px_25px_rgba(0,174,239,0.15)] scale-[1.01]"
                      : "bg-transparent border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-mono font-bold text-sm transition-colors duration-300 ${
                    activeStep === idx 
                      ? "bg-neon-blue text-white" 
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                  }`}>
                    {st.num}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-display font-bold text-base transition-colors ${
                      activeStep === idx ? "text-neon-blue" : "text-neutral-900 dark:text-white"
                    }`}>
                      {st.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {st.short}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Focused Active Step Detail Card */}
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent blur-3xl rounded-3xl" />
            
            <div className="relative glass-panel rounded-3xl p-8 md:p-10 border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-dark-bg/85 shadow-xl min-h-[380px] flex flex-col justify-between">
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-extrabold text-5xl md:text-6xl text-neon-blue/20">
                    {steps[activeStep].num}
                  </span>
                  
                  {/* Floating active icon */}
                  <div className="p-4 rounded-2xl bg-neon-blue/15 text-neon-blue">
                    {React.createElement(steps[activeStep].icon, { size: 28 })}
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-white">
                  {steps[activeStep].title}
                </h3>
                
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {steps[activeStep].long}
                </p>
              </div>

              {/* Step indicator bars */}
              <div className="flex gap-2.5 pt-8 border-t border-neutral-150 dark:border-neutral-850 mt-6">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeStep ? "bg-neon-blue w-8" : "bg-neutral-200 dark:bg-neutral-800"
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
