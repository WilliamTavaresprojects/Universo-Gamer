import React, { useState, useRef, useEffect } from "react";
import { MessageSquareCode, Send, X, Bot, User, Sparkles, SendToBack, FileSpreadsheet } from "lucide-react";

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiAssistant({ isOpen, onClose }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Olá! Sou o **Consultor Inteligente** da Universo On-line. 🚀

Estou aqui para entender o seu negócio e ajudar a planejar seu próximo site, landing page ou sistema sob medida! 

Para começarmos, me conte: **Qual é o nicho da sua empresa e o que você gostaria de construir hoje?**`
    }
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollChat = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollChat();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || userInput;
    if (!textToSend.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    if (!customText) setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      
      if (response.ok && data.text) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      } else {
        throw new Error(data.error || "Ocorreu um erro no assistente de IA.");
      }
    } catch (err: any) {
      console.error("AI Assistant request error:", err);
      // Friendly offline fallback response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Tive um probleminha para me conectar aos servidores em tempo real, mas já posso adiantar sobre os nossos planos excelentes! 
          
- **Landing Page Essencial (R$ 997)**: Perfeito para conversões imediatas.
- **Site Corporativo Profissional (R$ 2.497)**: Solução com blog e SEO avançado.
- **Sistemas Web Premium (R$ 4.997+)**: Sistemas de gestão e automações completas.

Gostaria de agendar um orçamento personalizado com nosso especialista humano pelo WhatsApp? Escreva seu WhatsApp aqui ou clique no botão de orçamento!`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Qual plano me atende melhor?",
    "Quero simular uma Landing Page",
    "Qual o prazo médio de entrega?",
    "Quais as formas de pagamento?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md h-full bg-white dark:bg-[#020617] border-l border-neutral-200 dark:border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Chat Drawer Header */}
        <div className="p-4 border-b border-neutral-150 dark:border-white/5 flex items-center justify-between bg-neutral-50 dark:bg-black/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-neon-blue/15 text-neon-blue flex items-center justify-center shadow-inner">
              <MessageSquareCode size={18} />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-sm text-neutral-900 dark:text-white flex items-center gap-1">
                <span>Consultor IA</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </h3>
              <p className="text-[10px] text-neutral-400 font-mono">Universo On-line Brain</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="p-3.5 rounded-2xl bg-blue-950/80 dark:bg-[#00D2FF]/10 text-white border border-neon-blue/20 flex gap-2 text-xs relative overflow-hidden backdrop-blur-md">
            <Sparkles size={16} className="text-neon-blue shrink-0 animate-pulse mt-0.5" />
            <p><strong>Dica Premium:</strong> Peça à IA para formatar uma estimativa de projeto baseado no seu modelo de negócios!</p>
          </div>

          {messages.map((m, idx) => {
            const isBot = m.role === "assistant";
            return (
              <div
                key={idx}
                className={`flex gap-2.5 max-w-[85%] ${isBot ? "" : "ml-auto flex-row-reverse"}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isBot ? "bg-neon-blue/15 text-neon-blue" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                }`}>
                  {isBot ? <Bot size={16} /> : <User size={16} />}
                </div>

                {/* Message Bubble */}
                <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isBot
                    ? "bg-neutral-50 dark:bg-[#020617]/60 text-neutral-800 dark:text-neutral-200 border border-neutral-150 dark:border-white/5"
                    : "bg-neon-blue text-white shadow-lg shadow-neon-blue/15"
                }`}>
                  {/* Handle markdown bold formatting nicely */}
                  <div className="whitespace-pre-wrap">
                    {m.content.split("\n").map((line, lIdx) => {
                      // Process bold text representation (**bold**)
                      const parts = line.split(/\*\*([^*]+)\*\*/g);
                      return (
                        <p key={lIdx} className="mb-1 last:mb-0">
                          {parts.map((p, pIdx) => (pIdx % 2 === 1 ? <strong key={pIdx} className="font-extrabold text-neon-blue dark:text-cyan-400">{p}</strong> : p))}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading bubble */}
          {isLoading && (
            <div className="flex gap-2.5 max-w-[80%]">
              <div className="w-8 h-8 rounded-lg bg-neon-blue/15 text-neon-blue flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900/60 text-neutral-400 flex items-center gap-1.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat input footer */}
        <div className="p-4 border-t border-neutral-150 dark:border-white/5 bg-neutral-50 dark:bg-black/30 space-y-3">
          
          {/* Quick suggestions tabs */}
          {messages.length < 5 && (
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(undefined, qp)}
                  className="px-2.5 py-1 text-[10px] font-medium rounded-lg bg-white hover:bg-neutral-100 dark:bg-[#020617]/50 dark:hover:bg-black/50 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-white/5 transition-all cursor-pointer"
                >
                  {qp}
                </button>
              ))}
            </div>
          )}

          {/* Input text form */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Pergunte sobre orçamento, prazos..."
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl focus:border-neon-blue focus:outline-none text-neutral-900 dark:text-white transition-all duration-300 focus:shadow-[0_0_12px_rgba(0,174,239,0.2)]"
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="p-3 rounded-xl bg-neon-blue hover:bg-neon-blue/95 text-white disabled:opacity-40 transition-all cursor-pointer shadow-md shadow-neon-blue/15 flex items-center justify-center shrink-0"
            >
              <Send size={16} />
            </button>
          </form>

          {/* Custom Proposal generation helper */}
          <div className="pt-2 border-t border-neutral-200/50 dark:border-neutral-800/50 flex justify-between items-center text-[10px] text-neutral-400 font-mono">
            <span>Powered by Gemini 3.5</span>
            <a
              href="https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1%20Universo%20On-line!%20Estava%20conversando%20com%20seu%20assistente%20de%20IA%20e%20gostaria%20de%20receber%20um%20or%C3%A7amento."
              target="_blank"
              rel="noreferrer"
              className="text-neon-blue hover:underline flex items-center gap-1 font-sans font-semibold"
            >
              <FileSpreadsheet size={10} />
              <span>Enviar Proposta Humana</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
