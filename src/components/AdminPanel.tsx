import React, { useState } from "react";
import { 
  X, Lock, LayoutDashboard, Globe, FileText, 
  MessageSquare, DollarSign, Database, Plus, Trash2, 
  Check, Save, Eye, Settings, HelpCircle, BarChart, Smile,
  Upload, Image as ImageIcon
} from "lucide-react";
import { AppContent, Service, PortfolioItem, Testimonial, Plan, FAQItem, Stat } from "../types";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  content: AppContent;
  onSaveContent: (updated: AppContent) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  content,
  onSaveContent,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
}: AdminPanelProps) {
  // Login Fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState<"services" | "portfolio" | "testimonials" | "plans" | "faqs" | "stats" | "seo">("services");

  // Temporary editing state for creation
  const [tempService, setTempService] = useState<Omit<Service, "id">>({ title: "", description: "", iconName: "Globe", category: "Sites", featured: false });
  const [tempPortfolio, setTempPortfolio] = useState<Omit<PortfolioItem, "id">>({ title: "", description: "", category: "Landing Pages", image: "", tech: [], link: "", completedYear: "2026" });
  const [tempFaq, setTempFaq] = useState<Omit<FAQItem, "id">>({ question: "", answer: "", category: "Geral" });
  const [tempTechInput, setTempTechInput] = useState("");

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userLower = username.trim().toLowerCase();
    if ((userLower === "empwilliamtavares@gmail.com" || userLower === "admin") && password === "universogamer123@") {
      setIsAdminLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Credenciais inválidas! Verifique suas credenciais de acesso.");
    }
  };

  // Content Operations
  const handleSaveService = (id: string, updated: Partial<Service>) => {
    const updatedServices = content.services.map((s) => (s.id === id ? { ...s, ...updated } : s));
    onSaveContent({ ...content, services: updatedServices });
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempService.title || !tempService.description) return;
    const newService: Service = { ...tempService, id: `srv-${Date.now()}` };
    onSaveContent({ ...content, services: [...content.services, newService] });
    setTempService({ title: "", description: "", iconName: "Globe", category: "Sites", featured: false });
  };

  const handleDeleteService = (id: string) => {
    onSaveContent({ ...content, services: content.services.filter((s) => s.id !== id) });
  };

  const handleSavePortfolio = (id: string, updated: Partial<PortfolioItem>) => {
    const updatedPortfolio = content.portfolio.map((p) => (p.id === id ? { ...p, ...updated } : p));
    onSaveContent({ ...content, portfolio: updatedPortfolio });
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempPortfolio.title || !tempPortfolio.description) return;
    const techs = tempTechInput.split(",").map((t) => t.trim()).filter(Boolean);
    const newPort: PortfolioItem = { ...tempPortfolio, id: `port-${Date.now()}`, tech: techs };
    onSaveContent({ ...content, portfolio: [...content.portfolio, newPort] });
    setTempPortfolio({ title: "", description: "", category: "Landing Pages", image: "", tech: [], link: "", completedYear: "2026" });
    setTempTechInput("");
  };

  const handleDeletePortfolio = (id: string) => {
    onSaveContent({ ...content, portfolio: content.portfolio.filter((p) => p.id !== id) });
  };

  const handleSaveTestimonial = (id: string, updated: Partial<Testimonial>) => {
    const updatedTestimonials = content.testimonials.map((t) => (t.id === id ? { ...t, ...updated } : t));
    onSaveContent({ ...content, testimonials: updatedTestimonials });
  };

  const handleDeleteTestimonial = (id: string) => {
    onSaveContent({ ...content, testimonials: content.testimonials.filter((t) => t.id !== id) });
  };

  const handleSavePlan = (id: string, updated: Partial<Plan>) => {
    const updatedPlans = content.plans.map((p) => (p.id === id ? { ...p, ...updated } : p));
    onSaveContent({ ...content, plans: updatedPlans });
  };

  const handleSaveFaq = (id: string, updated: Partial<FAQItem>) => {
    const updatedFaqs = content.faqs.map((f) => (f.id === id ? { ...f, ...updated } : f));
    onSaveContent({ ...content, faqs: updatedFaqs });
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempFaq.question || !tempFaq.answer) return;
    const newFaq: FAQItem = { ...tempFaq, id: `faq-${Date.now()}` };
    onSaveContent({ ...content, faqs: [...content.faqs, newFaq] });
    setTempFaq({ question: "", answer: "", category: "Geral" });
  };

  const handleDeleteFaq = (id: string) => {
    onSaveContent({ ...content, faqs: content.faqs.filter((f) => f.id !== id) });
  };

  const handleSaveStat = (id: string, updated: Partial<Stat>) => {
    const updatedStats = content.stats.map((st) => (st.id === id ? { ...st, ...updated } : st));
    onSaveContent({ ...content, stats: updatedStats });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[85vh] rounded-3xl overflow-hidden bg-white dark:bg-[#07111e] border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col">
        
        {/* Header bar */}
        <div className="p-5 border-b border-neutral-150 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-neon-blue/15 text-neon-blue flex items-center justify-center animate-pulse">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <span>Painel Administrativo Universo CMS</span>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">v1.2.0</span>
              </h3>
              <p className="text-xs text-neutral-400">Edite todos os textos, serviços, portfólio e depoimentos em tempo real</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {!isAdminLoggedIn ? (
          /* Login Mode */
          <div className="flex-1 flex items-center justify-center bg-neutral-50/50 dark:bg-neutral-950/20 p-6">
            <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-[#020617] border border-neutral-200 dark:border-neutral-850 shadow-2xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-neon-blue/15 text-neon-blue flex items-center justify-center mx-auto mb-3">
                  <Lock size={22} />
                </div>
                <h4 className="font-display font-bold text-lg text-neutral-900 dark:text-white">Acesso Restrito</h4>
                <p className="text-xs text-neutral-500">Faça login com as credenciais administrativas para editar o site.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-neutral-400 mb-1">Usuário</label>
                  <input
                    type="text"
                    required
                    placeholder="empwilliamtavares@gmail.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-mono tracking-wider text-neutral-400 mb-1">Senha</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white"
                  />
                </div>

                {loginError && (
                  <p className="text-xs text-red-500 font-semibold">{loginError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-neon-blue hover:bg-neon-blue/90 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-lg shadow-neon-blue/20"
                >
                  Entrar no Console CMS
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Logged In Dashboard console grid */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar console navigation */}
            <div className="w-full md:w-60 border-r border-neutral-150 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/10 p-4 flex flex-row md:flex-col gap-1 overflow-x-auto shrink-0 md:overflow-x-visible">
              <button
                onClick={() => setActiveTab("services")}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "services" ? "bg-neon-blue text-white shadow-md shadow-neon-blue/15" : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80"
                }`}
              >
                <Globe size={16} />
                <span>Serviços</span>
              </button>

              <button
                onClick={() => setActiveTab("portfolio")}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "portfolio" ? "bg-neon-blue text-white shadow-md shadow-neon-blue/15" : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80"
                }`}
              >
                <FileText size={16} />
                <span>Portfólio</span>
              </button>

              <button
                onClick={() => setActiveTab("testimonials")}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "testimonials" ? "bg-neon-blue text-white shadow-md shadow-neon-blue/15" : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80"
                }`}
              >
                <Smile size={16} />
                <span>Depoimentos</span>
              </button>

              <button
                onClick={() => setActiveTab("plans")}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "plans" ? "bg-neon-blue text-white shadow-md shadow-neon-blue/15" : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80"
                }`}
              >
                <DollarSign size={16} />
                <span>Planos</span>
              </button>

              <button
                onClick={() => setActiveTab("faqs")}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "faqs" ? "bg-neon-blue text-white shadow-md shadow-neon-blue/15" : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80"
                }`}
              >
                <HelpCircle size={16} />
                <span>FAQs Accordion</span>
              </button>

              <button
                onClick={() => setActiveTab("stats")}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "stats" ? "bg-neon-blue text-white shadow-md shadow-neon-blue/15" : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80"
                }`}
              >
                <BarChart size={16} />
                <span>Estatísticas</span>
              </button>

              <button
                onClick={() => setIsAdminLoggedIn(false)}
                className="flex items-center gap-2.5 px-4 py-3 mt-auto rounded-xl text-xs sm:text-sm font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <Lock size={16} />
                <span>Bloquear Console</span>
              </button>
            </div>

            {/* Editing workspace container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Tab: Services console */}
              {activeTab === "services" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-extrabold text-lg text-neutral-900 dark:text-white">Gerenciar Catálogo de Serviços</h4>
                    <span className="text-xs text-neutral-400 font-mono">{content.services.length} Serviços Cadastrados</span>
                  </div>

                  {/* Add Service Block Form */}
                  <form onSubmit={handleAddService} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/60 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-4">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Título do Serviço</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Consultoria Técnica"
                        value={tempService.title}
                        onChange={(e) => setTempService({ ...tempService, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Ícone Lucide</label>
                      <select
                        value={tempService.iconName}
                        onChange={(e) => setTempService({ ...tempService, iconName: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-950 dark:text-neutral-200"
                      >
                        <option value="Globe">Globe (Globo)</option>
                        <option value="FileText">FileText (Landing Page)</option>
                        <option value="Cpu">Cpu (Sistemas)</option>
                        <option value="ShoppingBag">ShoppingBag (Loja)</option>
                        <option value="MessageSquare">MessageSquare (Chatbot)</option>
                        <option value="TrendingUp">TrendingUp (SEO)</option>
                        <option value="Server">Server (Hospedagem)</option>
                        <option value="LifeBuoy">LifeBuoy (Suporte)</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Categoria</label>
                      <input
                        type="text"
                        required
                        placeholder="Sites, Sistemas, Automação"
                        value={tempService.category}
                        onChange={(e) => setTempService({ ...tempService, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="w-full py-2 bg-neon-blue hover:bg-neon-blue/90 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>Adicionar</span>
                      </button>
                    </div>
                    <div className="md:col-span-12">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Descrição Detalhada</label>
                      <input
                        type="text"
                        required
                        placeholder="Descreva o que está incluso no escopo de entrega desse serviço de forma premium..."
                        value={tempService.description}
                        onChange={(e) => setTempService({ ...tempService, description: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                      />
                    </div>
                  </form>

                  {/* List & Edit existing services */}
                  <div className="space-y-4">
                    {content.services.map((srv) => (
                      <div
                        key={srv.id}
                        className="p-4 rounded-xl border border-neutral-150 dark:border-neutral-800 bg-white dark:bg-neutral-900/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex-1 space-y-2 w-full">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={srv.title}
                              onChange={(e) => handleSaveService(srv.id, { title: e.target.value })}
                              className="font-display font-bold text-sm bg-transparent border-b border-transparent focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white w-full max-w-xs"
                            />
                            <span className="text-[10px] font-mono text-neutral-400">ID: {srv.id}</span>
                          </div>
                          
                          <input
                            type="text"
                            value={srv.description}
                            onChange={(e) => handleSaveService(srv.id, { description: e.target.value })}
                            className="text-xs text-neutral-500 dark:text-neutral-400 bg-transparent border-b border-transparent focus:border-neon-blue focus:outline-none w-full"
                          />
                        </div>

                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0 cursor-pointer self-end sm:self-center"
                          title="Excluir Serviço"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Portfolio Console */}
              {activeTab === "portfolio" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-extrabold text-lg text-neutral-900 dark:text-white">Gerenciar Cases do Portfólio</h4>
                    <span className="text-xs text-neutral-400 font-mono">{content.portfolio.length} Trabalhos</span>
                  </div>

                  {/* Add Portfolio item Form */}
                  <form onSubmit={handleAddPortfolio} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/60 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-4">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Título do Projeto</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Clínica OdontoPremium"
                        value={tempPortfolio.title}
                        onChange={(e) => setTempPortfolio({ ...tempPortfolio, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Upload da Imagem do Projeto</label>
                      <div className="relative group/upload">
                        {tempPortfolio.image ? (
                          <div className="relative h-20 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-center justify-center">
                            <img 
                              src={tempPortfolio.image} 
                              alt="Pré-visualização" 
                              className="h-full w-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/upload:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-200">
                              <label className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded cursor-pointer transition-colors text-[10px] font-semibold flex items-center gap-1">
                                <Upload size={12} />
                                <span>Alterar</span>
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      if (file.size > 2 * 1024 * 1024) {
                                        alert("Imagem muito grande! O tamanho máximo permitido é 2MB.");
                                        return;
                                      }
                                      const reader = new FileReader();
                                      reader.onload = (ev) => {
                                        if (ev.target?.result) {
                                          setTempPortfolio({ ...tempPortfolio, image: ev.target.result as string });
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => setTempPortfolio({ ...tempPortfolio, image: "" })}
                                className="p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded transition-colors text-[10px] font-semibold flex items-center gap-1"
                              >
                                <Trash2 size={12} />
                                <span>Remover</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.add("border-neon-blue", "bg-neon-blue/5");
                            }}
                            onDragLeave={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.remove("border-neon-blue", "bg-neon-blue/5");
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.remove("border-neon-blue", "bg-neon-blue/5");
                              const file = e.dataTransfer.files?.[0];
                              if (file && file.type.startsWith("image/")) {
                                if (file.size > 2 * 1024 * 1024) {
                                  alert("Imagem muito grande! O tamanho máximo permitido é 2MB.");
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  if (ev.target?.result) {
                                    setTempPortfolio({ ...tempPortfolio, image: ev.target.result as string });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            onClick={() => {
                              document.getElementById("portfolio-file-upload")?.click();
                            }}
                            className="flex flex-col items-center justify-center h-20 border border-dashed border-neutral-300 dark:border-neutral-800 hover:border-neon-blue dark:hover:border-neon-blue rounded-xl bg-white dark:bg-neutral-900/40 cursor-pointer transition-all duration-200"
                          >
                            <Upload className="w-4 h-4 text-neutral-400 group-hover/upload:text-neon-blue transition-colors mb-0.5" />
                            <span className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-400">
                              Arraste ou clique para enviar
                            </span>
                            <span className="text-[8px] text-neutral-450 dark:text-neutral-500 mt-0.5">
                              PNG, JPG, WEBP (Máx 2MB)
                            </span>
                            <input
                              id="portfolio-file-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (file.size > 2 * 1024 * 1024) {
                                    alert("Imagem muito grande! O tamanho máximo permitido é 2MB.");
                                    return;
                                  }
                                  const reader = new FileReader();
                                  reader.onload = (ev) => {
                                    if (ev.target?.result) {
                                      setTempPortfolio({ ...tempPortfolio, image: ev.target.result as string });
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Categoria</label>
                      <select
                        value={tempPortfolio.category}
                        onChange={(e) => setTempPortfolio({ ...tempPortfolio, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-950 dark:text-neutral-200"
                      >
                        <option value="Landing Pages">Landing Pages</option>
                        <option value="Sistemas Web">Sistemas Web</option>
                        <option value="Lojas Virtuais">Lojas Virtuais</option>
                        <option value="Desenvolvimento de Sites">Desenvolvimento de Sites</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-8">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Tecnologias (Separadas por vírgula)</label>
                      <input
                        type="text"
                        placeholder="Ex: React, Tailwind CSS, TypeScript, SEO"
                        value={tempTechInput}
                        onChange={(e) => setTempTechInput(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Ano de Entrega</label>
                      <input
                        type="text"
                        placeholder="2026"
                        value={tempPortfolio.completedYear}
                        onChange={(e) => setTempPortfolio({ ...tempPortfolio, completedYear: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="w-full py-2 bg-neon-blue hover:bg-neon-blue/90 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>Adicionar</span>
                      </button>
                    </div>

                    <div className="md:col-span-12">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Resumo do Case</label>
                      <input
                        type="text"
                        required
                        placeholder="Descreva as dores resolvidas e o resultado comercial gerado por esse projeto..."
                        value={tempPortfolio.description}
                        onChange={(e) => setTempPortfolio({ ...tempPortfolio, description: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                      />
                    </div>
                  </form>

                  {/* List and edit current Portfolio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {content.portfolio.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-xl border border-neutral-150 dark:border-neutral-800 bg-white dark:bg-neutral-900/20 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => handleSavePortfolio(p.id, { title: e.target.value })}
                            className="font-display font-bold text-sm bg-transparent border-b border-transparent focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white"
                          />
                          <button
                            onClick={() => handleDeletePortfolio(p.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex gap-3">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 shrink-0 group/portimg flex items-center justify-center">
                            {p.image ? (
                              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={20} className="text-neutral-400" />
                            )}
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/portimg:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-[8px] text-white font-bold text-center p-1">
                              <Upload size={12} className="mb-0.5" />
                              <span>Alterar</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.size > 2 * 1024 * 1024) {
                                      alert("Imagem muito grande! O tamanho máximo permitido é 2MB.");
                                      return;
                                    }
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      if (ev.target?.result) {
                                        handleSavePortfolio(p.id, { image: ev.target.result as string });
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <textarea
                              rows={2}
                              value={p.description}
                              onChange={(e) => handleSavePortfolio(p.id, { description: e.target.value })}
                              className="text-xs text-neutral-500 dark:text-neutral-400 bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-lg p-2 resize-none w-full h-16"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Testimonials Console */}
              {activeTab === "testimonials" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-extrabold text-lg text-neutral-900 dark:text-white">Gerenciar Depoimentos de Clientes</h4>
                    <span className="text-xs text-neutral-400 font-mono">{content.testimonials.length} Avaliações</span>
                  </div>

                  <div className="space-y-4">
                    {content.testimonials.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 rounded-xl border border-neutral-150 dark:border-neutral-800 bg-white dark:bg-neutral-900/20 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={t.name}
                              onChange={(e) => handleSaveTestimonial(t.id, { name: e.target.value })}
                              className="font-display font-bold text-sm bg-transparent border-b border-transparent focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white"
                            />
                            <span className="text-xs text-neutral-400">({t.company})</span>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <textarea
                          rows={2}
                          value={t.comment}
                          onChange={(e) => handleSaveTestimonial(t.id, { comment: e.target.value })}
                          className="text-xs text-neutral-500 dark:text-neutral-400 bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-lg p-2 resize-none w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Plans Console */}
              {activeTab === "plans" && (
                <div className="space-y-6">
                  <h4 className="font-display font-extrabold text-lg text-neutral-900 dark:text-white">Edição dos Planos de Investimento</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {content.plans.map((p) => (
                      <div
                        key={p.id}
                        className="p-5 rounded-2xl border border-neutral-150 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 space-y-4"
                      >
                        <div>
                          <h5 className="font-bold text-sm text-neutral-400 uppercase tracking-widest">{p.name}</h5>
                          <p className="text-xs text-neutral-500">{p.description}</p>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-neutral-400 mb-1">Preço de Referência (R$)</label>
                          <input
                            type="text"
                            value={p.price}
                            onChange={(e) => handleSavePlan(p.id, { price: e.target.value })}
                            className="w-full px-3 py-2 text-sm font-bold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: FAQs Console */}
              {activeTab === "faqs" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-extrabold text-lg text-neutral-900 dark:text-white">Gerenciar Perguntas Accordion</h4>
                    <span className="text-xs text-neutral-400 font-mono">{content.faqs.length} FAQs Ativas</span>
                  </div>

                  {/* Add FAQ Form */}
                  <form onSubmit={handleAddFaq} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/60 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-8">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Pergunta</label>
                      <input
                        type="text"
                        required
                        placeholder="Digite a dúvida frequente..."
                        value={tempFaq.question}
                        onChange={(e) => setTempFaq({ ...tempFaq, question: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Categoria</label>
                      <input
                        type="text"
                        placeholder="Ex: Suporte, Custos"
                        value={tempFaq.category}
                        onChange={(e) => setTempFaq({ ...tempFaq, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="w-full py-2 bg-neon-blue hover:bg-neon-blue/90 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>Adicionar</span>
                      </button>
                    </div>

                    <div className="md:col-span-12">
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">Resposta Completa</label>
                      <input
                        type="text"
                        required
                        placeholder="Explique detalhadamente a resposta de forma profissional..."
                        value={tempFaq.answer}
                        onChange={(e) => setTempFaq({ ...tempFaq, answer: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                      />
                    </div>
                  </form>

                  {/* FAQ editing list */}
                  <div className="space-y-4">
                    {content.faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="p-4 rounded-xl border border-neutral-150 dark:border-neutral-800 bg-white dark:bg-neutral-900/20 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => handleSaveFaq(faq.id, { question: e.target.value })}
                            className="font-display font-bold text-sm bg-transparent border-b border-transparent focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white w-full"
                          />
                          <button
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => handleSaveFaq(faq.id, { answer: e.target.value })}
                          className="text-xs text-neutral-500 dark:text-neutral-400 bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-lg p-2 resize-none w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Stats */}
              {activeTab === "stats" && (
                <div className="space-y-6">
                  <h4 className="font-display font-extrabold text-lg text-neutral-900 dark:text-white">Gerenciar Métricas Estatísticas</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.stats.map((st) => (
                      <div
                        key={st.id}
                        className="p-4 rounded-xl border border-neutral-150 dark:border-neutral-800 bg-white dark:bg-neutral-900/20 grid grid-cols-2 gap-4"
                      >
                        <div>
                          <label className="block text-[10px] font-mono text-neutral-400 mb-1">Métrica (Label)</label>
                          <input
                            type="text"
                            value={st.label}
                            onChange={(e) => handleSaveStat(st.id, { label: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[10px] font-mono text-neutral-400 mb-1">Valor (Número)</label>
                          <input
                            type="number"
                            value={st.value}
                            onChange={(e) => handleSaveStat(st.id, { value: Number(e.target.value) })}
                            className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
