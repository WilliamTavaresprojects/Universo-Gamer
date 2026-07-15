import React, { useState } from "react";
import { Laptop, ArrowRight, MessageSquare, Sparkles, CheckCircle } from "lucide-react";

interface HeroProps {
  onOpenAi: () => void;
}

export default function Hero({ onOpenAi }: HeroProps) {
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [businessSegment, setBusinessSegment] = useState<string>("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userPhone) return;

    const segmentText = businessSegment ? `\n*Segmento/Comércio:* ${businessSegment}` : "";
    const text = `Olá Universo On-line! Solicitei uma análise profissional do meu comércio através do site:\n\n*Nome:* ${userName}\n*WhatsApp:* ${userPhone}${segmentText}\n\nGostaria de entender como a Universo On-line pode me ajudar a atrair mais clientes e alavancar meu negócio.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5511999999999&text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:py-28 bg-white dark:bg-[#020617]">
      {/* Background glow spots */}
      <div className="glow-spot w-96 h-96 bg-neon-blue/20 top-10 left-[-100px]" />
      <div className="glow-spot w-96 h-96 bg-cyan-400/10 bottom-10 right-[-100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info Columns */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-blue-900/10 dark:bg-neon-blue/10 text-neon-blue border border-neon-blue/20 shadow-[0_0_15px_rgba(0,174,239,0.15)]">
              <Sparkles size={12} className="animate-pulse text-neon-blue" />
              <span className="font-mono uppercase tracking-wider text-[10px]">Agência Premium de Tecnologia & Design</span>
            </div>
            
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-neutral-900 dark:text-white">
              Seu Negócio Merece um Site que <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-cyan-400 to-white">Gera Resultados.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
              Na <span className="font-bold text-neutral-900 dark:text-white">Universo On-line</span> desenvolvemos sites profissionais, landing pages e sistemas personalizados que transformam visitantes comuns em clientes pagantes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#portfolio"
                className="w-full sm:w-auto px-8 py-4 font-semibold text-center text-white rounded-xl bg-neon-blue hover:bg-neon-blue/90 shadow-[0_0_20px_rgba(0,174,239,0.35)] hover:shadow-[0_0_30px_rgba(0,174,239,0.55)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Ver Nossos Projetos
              </a>
              <button
                onClick={onOpenAi}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 font-semibold text-neutral-800 dark:text-neutral-100 bg-white/50 dark:bg-white/5 border border-neutral-200/60 dark:border-white/10 backdrop-blur-md rounded-xl hover:bg-neutral-50 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                <MessageSquare size={18} className="text-neon-blue" />
                <span>Conversar com IA</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-neutral-200/50 dark:border-neutral-800/50 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-display font-extrabold text-neutral-900 dark:text-white">100%</p>
                <p className="text-xs text-neutral-500">Exclusivo</p>
              </div>
              <div>
                <p className="text-2xl font-display font-extrabold text-neutral-900 dark:text-white">&lt; 2s</p>
                <p className="text-xs text-neutral-500">Carregamento</p>
              </div>
              <div>
                <p className="text-2xl font-display font-extrabold text-neutral-900 dark:text-white">SEO</p>
                <p className="text-xs text-neutral-500">Otimizado Google</p>
              </div>
            </div>
          </div>

          {/* Clean lead collection card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/20 to-transparent blur-2xl rounded-3xl" />
            
            <div className="relative glass-panel dark:bg-[#020617]/60 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200/50 dark:border-white/10 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-neon-blue/10 text-neon-blue shadow-[0_0_15px_rgba(0,174,239,0.1)]">
                  <Laptop size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white">Impulsione seu Comércio</h3>
                  <p className="text-xs text-neutral-500">Solicite uma análise de presença digital gratuita</p>
                </div>
              </div>

              {/* Lead Form */}
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-1">Seu Nome</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: William Tavares"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,174,239,0.2)]"
                  />
                </div>
                
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-1">Seu WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: (11) 99999-9999"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,174,239,0.2)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-1">Segmento do seu Comércio</label>
                  <input
                    type="text"
                    placeholder="Ex: Loja de Roupas, Restaurante, Mercantil..."
                    value={businessSegment}
                    onChange={(e) => setBusinessSegment(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,174,239,0.2)]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 font-semibold text-white bg-gradient-to-r from-neon-blue to-cyan-500 rounded-xl hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,174,239,0.25)] hover:shadow-[0_0_25px_rgba(0,174,239,0.4)] cursor-pointer"
                >
                  <span>Solicitar Análise por WhatsApp</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
