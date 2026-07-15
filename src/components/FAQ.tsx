import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, MessageSquare } from "lucide-react";
import { FAQItem } from "../types";

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("Todos");

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Derive unique categories from FAQs
  const categories = ["Todos", ...Array.from(new Set(faqs.map((f) => f.category)))];

  // Filter FAQs based on tab and search term
  const filteredFaqs = faqs.filter((faq) => {
    const matchesTab = activeTab === "Todos" || faq.category === activeTab;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 bg-white dark:bg-[#020617] relative overflow-hidden border-t border-b border-neutral-150 dark:border-white/5">
      <div className="glow-spot w-80 h-80 bg-neon-blue/10 top-1/2 left-[-100px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <p className="text-xs font-mono font-bold tracking-widest uppercase text-neon-blue">
            Dúvidas Frequentes
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-neutral-900 dark:text-white">
            Perguntas & Respostas
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-sans">
            Ficou com alguma dúvida? Confira as respostas das perguntas mais frequentes enviadas pelos nossos parceiros antes de iniciar.
          </p>
        </div>

        {/* Search Bar & Categories */}
        <div className="space-y-6 mb-10">
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-neutral-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Digite sua dúvida (ex: prazos, suporte)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 text-sm bg-neutral-50 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-2xl focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,174,239,0.2)]"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  activeTab === cat
                    ? "bg-neon-blue text-white shadow-[0_0_12px_rgba(0,174,239,0.3)]"
                    : "bg-neutral-100 dark:bg-black/30 border border-transparent dark:border-white/5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-black/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-neutral-150 dark:border-white/5 bg-neutral-50 dark:bg-[#020617]/40 overflow-hidden transition-all duration-300 backdrop-blur-md"
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-display font-bold text-neutral-900 dark:text-white hover:text-neon-blue dark:hover:text-neon-blue transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base leading-snug">{faq.question}</span>
                    <span className="text-neutral-400 shrink-0">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-white/5 pt-4 animate-in fade-in slide-in-from-top-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center p-8 text-neutral-400 text-sm">
              Nenhuma pergunta encontrada para sua pesquisa.
            </div>
          )}
        </div>

        {/* Interactive FAQ Call */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-neutral-50 dark:bg-[#020617]/50 border border-neutral-150 dark:border-white/10 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-neon-blue/15 text-neon-blue shadow-inner">
              <MessageSquare size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Ainda com dúvidas?</h4>
              <p className="text-[11px] text-neutral-400">Fale com um de nossos consultores agora.</p>
            </div>
          </div>
          
          <a
            href="https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1%20Universo%20On-line!%20Li%20o%20FAQ%20mas%20gostaria%20de%20esclarecer%20algumas%20d%C3%BAvidas%20sobre%20meu%20projeto."
            target="_blank"
            rel="noreferrer"
            className="px-4.5 py-2.5 rounded-xl bg-neon-blue hover:bg-neon-blue/95 text-white text-xs font-bold shadow-md shadow-neon-blue/10 hover:shadow-neon-blue/25 transition-all cursor-pointer text-center whitespace-nowrap"
          >
            Chamar no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
