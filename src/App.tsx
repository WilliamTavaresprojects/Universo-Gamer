import React, { useState, useEffect } from "react";
import { MessageSquare, ArrowRight, Sparkles, Laptop, ShieldAlert } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import AiAssistant from "./components/AiAssistant";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";
import MouseTrail from "./components/MouseTrail";

import { initialContent } from "./data";
import { AppContent, Testimonial } from "./types";

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("universo-theme");
    if (saved) {
      return saved === "dark";
    }
    // Default to true (dark mode) for a premium, high-tech immersive look
    return true;
  });

  // Dynamic CMS Content state
  const [content, setContent] = useState<AppContent>(() => {
    const saved = localStorage.getItem("universo-content");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Error reading cached local storage, falling back to initial data:", err);
      }
    }
    return initialContent;
  });

  // Drawers & Security authentication states
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Sync theme changes with DOM document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("universo-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("universo-theme", "light");
    }
  }, [darkMode]);

  const handleSaveContent = (updated: AppContent) => {
    setContent(updated);
    localStorage.setItem("universo-content", JSON.stringify(updated));
  };

  const handleAddTestimonial = (newReview: Omit<Testimonial, "id">) => {
    const added: Testimonial = {
      ...newReview,
      id: `test-${Date.now()}`
    };
    const updatedTestimonials = [...content.testimonials, added];
    handleSaveContent({
      ...content,
      testimonials: updatedTestimonials
    });
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white text-neutral-900 dark:bg-dark-bg dark:text-neutral-100 relative overflow-hidden">
      
      {/* Interactive mouse and drag-trail effect */}
      <MouseTrail />
      
      {/* Immersive UI Ambient Background Glow Elements */}
      <div className="absolute top-[5%] right-[-5%] w-[600px] h-[600px] bg-neon-blue/10 dark:bg-neon-blue/8 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 dark:bg-blue-900/15 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-500/5 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[25%] left-[5%] w-[2px] h-[500px] glow-line-vertical opacity-30 pointer-events-none z-0" />
      <div className="absolute bottom-[30%] right-[5%] w-[2px] h-[600px] glow-line-vertical opacity-30 pointer-events-none z-0" />

      {/* 1. Header Navigation */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAi={() => setIsAiOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* 2. Hero Section */}
      <Hero onOpenAi={() => setIsAiOpen(true)} />

      {/* 3. High-Performance Benefits Grid ("O que agregamos") */}
      <Benefits />

      {/* 4. Dynamic Filterable Case Portfolio ("Trabalhos desenvolvidos") */}
      <Portfolio portfolio={content.portfolio} />

      {/* 5. Dynamic Services Catalog ("Nossos serviços") */}
      <Services services={content.services} onOpenAi={() => setIsAiOpen(true)} />

      {/* 6. Ticking Statistics Banner */}
      <Stats stats={content.stats} />

      {/* 7. Testimonials Carousel with manual review form */}
      <Testimonials
        testimonials={content.testimonials}
        onAddTestimonial={handleAddTestimonial}
      />

      {/* 12. Elegant Conversion CTA Block */}
      <section className="py-20 relative overflow-hidden bg-neutral-950 text-white">
        {/* Glow ambient background spot */}
        <div className="glow-spot w-96 h-96 bg-neon-blue/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
            <Sparkles size={12} className="animate-pulse" />
            <span>Propostas Rápidas e Descomplicadas</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            Vamos construir o próximo <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-cyan-400">sucesso digital</span> da sua empresa?
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Entre em contato com nossa equipe agora mesmo e receba um diagnóstico técnico gratuito com proposta comercial personalizada em poucas horas.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <a
              href="https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1%20Universo%20On-line!%20Gostaria%20de%20receber%20um%20diagn%C3%B3stico%20e%20or%C3%A7amento%20para%20o%20site%20da%20minha%20empresa."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 font-bold text-center text-white bg-neon-blue hover:bg-neon-blue/90 rounded-xl transition-all shadow-lg shadow-neon-blue/35 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Falar com um Especialista</span>
              <ArrowRight size={16} />
            </a>

            <button
              onClick={() => setIsAiOpen(true)}
              className="w-full sm:w-auto px-8 py-4 font-bold text-center bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} className="text-neon-blue" />
              <span>Simular com o Consultor IA</span>
            </button>
          </div>
        </div>
      </section>

      {/* 13. Sticky WhatsApp Floating Button */}
      <a
        href="https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20um%20especialista%20da%20Universo%20On-line."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center animate-bounce"
        title="Falar no WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-6 h-6 fill-white"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 496l133.9-35.1c32.7 17.8 69.3 27.2 106.8 27.2 122.4 0 222-99.6 222-222 0-59.3-23.2-115-65.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-79.8 20.9 21.3-77.8-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>

      {/* 14. Slide-out Intelligent Assistant Drawer */}
      <AiAssistant
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />

      {/* 15. Administrative CMS Control Center Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        content={content}
        onSaveContent={handleSaveContent}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
      />

      {/* 16. Footer and brand credit links */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

    </div>
  );
}
