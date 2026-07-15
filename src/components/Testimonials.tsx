import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquare, Sparkles } from "lucide-react";
import { Testimonial } from "../types";

interface TestimonialsProps {
  testimonials: Testimonial[];
  onAddTestimonial: (t: Omit<Testimonial, "id">) => void;
}

export default function Testimonials({ testimonials, onAddTestimonial }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Form Fields
  const [newName, setNewName] = useState<string>("");
  const [newCompany, setNewCompany] = useState<string>("");
  const [newRole, setNewRole] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(5);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Autoplay
  useEffect(() => {
    if (showForm) return; // Pause autoplay when submitting form
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length, showForm]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;

    onAddTestimonial({
      name: newName,
      company: newCompany || "Autônomo",
      role: newRole || "Cliente",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150", // placeholder women/men face
      comment: newComment,
      rating: newRating
    });

    // Reset Form
    setNewName("");
    setNewCompany("");
    setNewRole("");
    setNewComment("");
    setNewRating(5);
    setShowForm(false);
    setActiveIndex(testimonials.length); // focus on the newly added review
  };

  const activeReview = testimonials[activeIndex] || testimonials[0];

  return (
    <section className="py-20 bg-white dark:bg-[#020617] relative overflow-hidden border-t border-b border-neutral-150 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Text */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-mono font-bold tracking-widest uppercase text-neon-blue">
              Depoimentos de Parceiros
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-neutral-900 dark:text-white">
              O que dizem nossos clientes?
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
              A verdadeira qualidade da Universo On-line é comprovada pelos resultados tangíveis obtidos pelas marcas e empresas que impulsionamos.
            </p>
          </div>
          <div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-3 rounded-xl border border-neutral-200 dark:border-white/10 text-sm font-semibold bg-white/50 dark:bg-white/5 hover:bg-neutral-50 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer backdrop-blur-md"
            >
              {showForm ? "Ver Depoimentos" : "Escrever Avaliação"}
            </button>
          </div>
        </div>

        {showForm ? (
          /* Form to submit custom review */
          <div className="max-w-2xl mx-auto p-8 rounded-[32px] bg-neutral-50 dark:bg-[#020617]/60 border border-neutral-200 dark:border-white/10 shadow-2xl animate-in fade-in zoom-in-95 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={18} className="text-neon-blue animate-pulse" />
              <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white">Escreva sua Avaliação</h3>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-neutral-400 mb-1">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: William Tavares"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white transition-all duration-300 focus:shadow-[0_0_12px_rgba(0,174,239,0.2)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wider text-neutral-400 mb-1">Sua Empresa</label>
                  <input
                    type="text"
                    placeholder="Ex: Universo On-line"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white transition-all duration-300 focus:shadow-[0_0_12px_rgba(0,174,239,0.2)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-neutral-400 mb-1">Seu Cargo / Função</label>
                  <input
                    type="text"
                    placeholder="Ex: Diretor de Tecnologia"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white transition-all duration-300 focus:shadow-[0_0_12px_rgba(0,174,239,0.2)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wider text-neutral-400 mb-1">Avaliação por Estrelas</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-4 py-3 text-sm bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:border-neon-blue focus:outline-none text-neutral-950 dark:text-neutral-200 transition-all duration-300"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (Excelente)</option>
                    <option value={4}>⭐⭐⭐⭐ (Muito bom)</option>
                    <option value={3}>⭐⭐⭐ (Regular)</option>
                    <option value={2}>⭐⭐ (Ruim)</option>
                    <option value={1}>⭐ (Péssimo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 mb-1">Seu Feedback / Comentário *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Conte-nos como foi sua experiência em desenvolver seu projeto com nossa agência..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white resize-none transition-all duration-300 focus:shadow-[0_0_12px_rgba(0,174,239,0.2)]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-neon-blue hover:bg-neon-blue/90 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(0,174,239,0.25)] hover:shadow-[0_0_25px_rgba(0,174,239,0.45)]"
              >
                Enviar Avaliação
              </button>
            </form>
          </div>
        ) : (
          /* Slider Display */
          <div className="relative max-w-4xl mx-auto">
            {activeReview && (
              <div className="glass-panel dark:bg-[#020617]/60 rounded-[32px] p-8 sm:p-12 border border-neutral-150 dark:border-white/10 shadow-2xl text-center space-y-6 animate-in fade-in duration-300 relative overflow-hidden backdrop-blur-xl">
                
                {/* Large double quotes accent */}
                <div className="absolute top-6 left-6 text-neon-blue/10 dark:text-neon-blue/5">
                  <MessageSquare size={120} />
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1">
                  {Array.from({ length: activeReview.rating }).map((_, idx) => (
                    <Star key={idx} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-base sm:text-xl md:text-2xl font-light italic text-neutral-800 dark:text-neutral-200 leading-relaxed relative z-10">
                  "{activeReview.comment}"
                </p>

                {/* Profile Meta info */}
                <div className="flex flex-col items-center gap-3 pt-4">
                  <img
                    src={activeReview.avatar}
                    alt={activeReview.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full border-2 border-neon-blue object-cover shadow-md"
                  />
                  <div>
                    <h4 className="font-display font-bold text-base text-neutral-900 dark:text-white">
                      {activeReview.name}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      {activeReview.role} • <span className="text-neon-blue font-semibold">{activeReview.company}</span>
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-850 transition-colors cursor-pointer"
                title="Depoimento Anterior"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeIndex ? "bg-neon-blue w-6" : "bg-neutral-200 dark:bg-neutral-800 w-2"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-850 transition-colors cursor-pointer"
                title="Próximo Depoimento"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
