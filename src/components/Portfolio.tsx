import React, { useState } from "react";
import { ExternalLink, X, Eye, Code } from "lucide-react";
import { PortfolioItem } from "../types";

interface PortfolioProps {
  portfolio: PortfolioItem[];
}

export default function Portfolio({ portfolio }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<string>("Todos");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Derive unique categories from active portfolio items
  const categories = ["Todos", ...Array.from(new Set(portfolio.map((item) => item.category)))];

  // Filter items
  const filteredItems = activeFilter === "Todos"
    ? portfolio
    : portfolio.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-neutral-50 dark:bg-[#020617]/65 relative border-t border-b border-neutral-150 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <p className="text-xs font-mono font-bold tracking-widest uppercase text-neon-blue">
            Cases de Sucesso
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-neutral-900 dark:text-white">
            Nosso Portfólio de Alta Performance
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            Explore alguns de nossos trabalhos mais recentes desenvolvidos para empresas de diversos nichos focarem em conversão e crescimento.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? "bg-neon-blue text-white shadow-md shadow-neon-blue/20"
                  : "bg-white dark:bg-dark-bg/60 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-850"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-dark-bg/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden aspect-video bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setSelectedProject(item)}
                    className="p-3 bg-neon-blue text-white rounded-full hover:scale-110 transition-transform shadow-lg cursor-pointer"
                    title="Ver detalhes do projeto"
                  >
                    <Eye size={20} />
                  </button>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-white text-neutral-900 rounded-full hover:scale-110 transition-transform shadow-lg"
                      title="Visitar site"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Text metadata */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-neon-blue px-2.5 py-1 rounded-full bg-neon-blue/10">
                      {item.category}
                    </span>
                    {item.completedYear && (
                      <span className="text-[10px] font-mono text-neutral-400">
                        {item.completedYear}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-900 dark:text-white mb-2 group-hover:text-neon-blue transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Tech Badges & CTA */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                    {item.tech.length > 3 && (
                      <span className="text-[10px] font-mono text-neutral-400">
                        +{item.tech.length - 3}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(item)}
                    className="text-xs font-bold text-neon-blue flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Ver Projeto</span>
                    <Eye size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Details Modal Overlay */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-3xl rounded-[32px] overflow-hidden bg-white dark:bg-[#020617] border border-neutral-200 dark:border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
              
              {/* Header Image Cover */}
              <div className="relative aspect-video w-full bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-neon-blue px-2.5 py-1 rounded-full bg-neon-blue/10">
                      {selectedProject.category}
                    </span>
                    {selectedProject.completedYear && (
                      <span className="text-xs font-mono text-neutral-400">
                        Entregue em {selectedProject.completedYear}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="space-y-4 text-neutral-600 dark:text-neutral-300">
                  <p className="text-sm sm:text-base leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <Code size={13} />
                      <span>Tecnologias Utilizadas</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((t, idx) => (
                        <span key={idx} className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-3 py-1 rounded-lg">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer Action Button */}
                <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-neutral-400">Gostou desse resultado para a sua empresa?</span>
                  
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-semibold rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      Fechar
                    </button>
                    <a
                      href={`https://api.whatsapp.com/send?phone=5511999999999&text=${encodeURIComponent(`Olá Universo On-line! Vi o case do *${selectedProject.title}* no portfólio e gostaria de um site semelhante para minha empresa.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-center text-white bg-neon-blue hover:bg-neon-blue/90 rounded-xl shadow-lg shadow-neon-blue/25"
                    >
                      Solicitar Semelhante
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
