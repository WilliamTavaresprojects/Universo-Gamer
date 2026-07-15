import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API endpoint for AI assistant ("IA para Atendimento")
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    
    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    // Attempt to get Gemini client
    let ai;
    try {
      ai = getGeminiClient();
    } catch (e: any) {
      console.warn("Gemini client initialization warning (continuing with simulated AI responses if key is not configured):", e.message);
      // Fallback response for offline or unconfigured environments
      return res.json({ 
        text: `Olá! Sou o assistente de orçamentos virtuais da **Universo On-line**. 

Atualmente o servidor está em modo de simulação, mas posso ajudar! Com base em nosso portfólio premium:
- **Plano Essencial (R$ 997)**: Landing Pages ultra rápidas e de alta conversão.
- **Plano Profissional (R$ 2.497)**: Site completo de até 5 páginas com SEO, formulários e blog.
- **Plano Premium (R$ 4.997+)**: Sistemas Web, integrados com APIs, CRM e áreas logadas sob medida.

Qual dessas soluções seria a ideal para expandir o faturamento da sua empresa hoje?`
      });
    }

    const systemInstruction = `
Você é o Assistente Virtual Inteligente da **Universo On-line**, uma agência premium de desenvolvimento de sites, landing pages e sistemas web.
Seu objetivo é encantar o cliente, tirar dúvidas sobre os nossos serviços e ajudá-lo a escolher a melhor solução digital para o seu negócio.

### Nossos Serviços Principais:
- **Desenvolvimento de Sites**: Sites modernos, corporativos, ultra rápidos e otimizados para conversão.
- **Landing Pages**: Focadas em lançamentos, campanhas de tráfego pago e captação de leads.
- **Sistemas Web Personalizados**: Plataformas completas, CRMs, painéis de controle, SaaS e portais de membros.
- **Lojas Virtuais (E-commerce)**: Lojas completas com carrinho de compras, gateway de pagamentos e painel administrativo.
- **Automação Empresarial & Chatbots**: Robôs de atendimento, integrações com WhatsApp e ferramentas de produtividade.

### Nossos Planos de Referência:
1. **Plano Essencial**: Ideal para novos negócios. Landing page de alta conversão, design exclusivo, integrado ao WhatsApp, SEO básico, velocidade extrema. (A partir de R$ 997,00)
2. **Plano Profissional**: Perfeito para empresas consolidadas. Site institucional completo (até 5 páginas), blog integrado, SEO avançado, painel de administração básico, relatórios. (A partir de R$ 2.497,00)
3. **Plano Premium**: Solução completa e exclusiva. Sistema personalizado, e-commerce, CRM customizado, integrações ilimitadas e design totalmente sob medida. (A partir de R$ 4.997,00)

### Suas Diretrizes de Resposta:
- Seja extremamente simpático, corporativo, premium, polido e focado em vendas.
- Responda em português brasileiro (PT-BR).
- Sempre procure entender o nicho de mercado do cliente (ex: advocacia, clínica médica, loja física, e-commerce, infoprodutor).
- Ajude-o a escolher o melhor plano e forneça insights de como um site de alta conversão pode aumentar o faturamento dele.
- Quando adequado, resuma as ideias em tópicos elegantes com emojis profissionais.
- Termine convidando o cliente a clicar no botão de "Gerar Proposta PDF" ou "Falar com Especialista" para finalizar o atendimento pelo WhatsApp oficial.
- Mantenha respostas fluidas, de leitura fácil e focadas em converter o visitante.
`;

    // Map messages history to Gemini contents format
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    // Generate response using gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API server-side error:", error);
    res.status(500).json({ 
      error: "Ocorreu um erro ao processar sua solicitação com o assistente inteligente.",
      details: error.message 
    });
  }
});

// Serve static assets and Vite server setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
