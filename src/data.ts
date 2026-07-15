import { AppContent } from "./types";

export const initialContent: AppContent = {
  services: [
    {
      id: "srv-1",
      title: "Desenvolvimento de Sites",
      description: "Criação de sites corporativos de alto padrão, ultra rápidos, focados em gerar autoridade e vendas.",
      iconName: "Globe",
      category: "Sites",
      featured: true
    },
    {
      id: "srv-2",
      title: "Landing Pages",
      description: "Páginas de alta conversão estruturadas com copywriting estratégico para anúncios em Google Ads e Meta Ads.",
      iconName: "FileText",
      category: "Sites",
      featured: true
    },
    {
      id: "srv-3",
      title: "Sistemas Web Customizados",
      description: "Desenvolvimento de plataformas completas, portais de membros, SaaS, e sistemas internos automatizados.",
      iconName: "Cpu",
      category: "Sistemas",
      featured: true
    },
    {
      id: "srv-4",
      title: "Lojas Virtuais (E-commerce)",
      description: "Lojas dinâmicas e seguras, focadas em alta performance com integração de meios de pagamento e estoque.",
      iconName: "ShoppingBag",
      category: "Sistemas"
    },
    {
      id: "srv-5",
      title: "Automação & Chatbots",
      description: "Integração do ChatGPT/Gemini para automatizar seu atendimento ao cliente no WhatsApp e site 24 horas por dia.",
      iconName: "MessageSquare",
      category: "Automação",
      featured: true
    },
    {
      id: "srv-6",
      title: "SEO Otimizado",
      description: "Otimização técnica completa para colocar sua empresa na primeira página do Google organicamente.",
      iconName: "TrendingUp",
      category: "SEO"
    }
  ],
  portfolio: [
    {
      id: "port-1",
      title: "Clínica OdontoPremium",
      description: "Landing Page de alta conversão para clínica odontológica focada em implantes e estética, gerando mais de 150 leads no primeiro mês.",
      category: "Landing Pages",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600",
      tech: ["React", "Tailwind CSS", "SEO", "WhatsApp Integration"],
      link: "https://odontopremium.com.br",
      completedYear: "2025"
    },
    {
      id: "port-2",
      title: "SaaS PrimeFinance",
      description: "Sistema web moderno de gestão financeira para pequenos e médios negócios com gráficos interativos e relatórios inteligentes.",
      category: "Sistemas Web",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
      tech: ["React", "TypeScript", "Node.js", "D3.js", "Tailwind CSS"],
      link: "https://primefinance.com.br",
      completedYear: "2025"
    },
    {
      id: "port-3",
      title: "E-commerce GlowCosmetics",
      description: "Loja virtual premium no ramo de maquiagens e bem-estar, com checkout transparente e excelente experiência mobile.",
      category: "Lojas Virtuais",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600",
      tech: ["Vite", "Express", "Stripe API", "Tailwind CSS"],
      link: "https://glowcosmetics.com",
      completedYear: "2026"
    },
    {
      id: "port-4",
      title: "Advocacia Souza & Silva",
      description: "Site institucional corporativo de alta sofisticação com design minimalista, transmitindo autoridade e credibilidade.",
      category: "Desenvolvimento de Sites",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600",
      tech: ["Vite", "Tailwind CSS", "SEO", "Google Analytics"],
      link: "https://souzaesilvaadv.com.br",
      completedYear: "2026"
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Dr. Roberto Martins",
      company: "Clínica Martins",
      role: "Diretor Clínico",
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150",
      comment: "A Universo On-line superou todas as expectativas. A landing page que criaram para nós aumentou os agendamentos via WhatsApp em mais de 120%. Atendimento de altíssimo nível!",
      rating: 5
    },
    {
      id: "test-2",
      name: "Mariana Costa",
      company: "Glow Cosmetics",
      role: "Fundadora & CEO",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
      comment: "Estávamos inseguros com as vendas online. O e-commerce desenvolvido pela Universo On-line é extremamente veloz, fácil de navegar e o checkout deles é perfeito. Recomendo muito!",
      rating: 5
    },
    {
      id: "test-3",
      name: "Arthur Valente",
      company: "PrimeFinance SaaS",
      role: "Co-fundador",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      comment: "Precisávamos de um painel de controle dinâmico para o nosso sistema e a agência entregou uma obra de arte. Código limpo, componentizado, extremamente veloz e com design incrível.",
      rating: 5
    }
  ],
  plans: [
    {
      id: "plan-1",
      name: "Plano Essencial",
      price: "997",
      period: "taxa única",
      description: "A melhor escolha para profissionais liberais, autônomos e startups validarem sua presença digital.",
      features: [
        "Landing page de alta conversão",
        "Design exclusivo e responsivo",
        "Botão de WhatsApp flutuante",
        "SEO On-Page básico",
        "Hospedagem inclusa por 1 ano",
        "Certificado de Segurança SSL",
        "Prazo de entrega: até 7 dias"
      ],
      ctaText: "Quero Meu Site"
    },
    {
      id: "plan-2",
      name: "Plano Profissional",
      price: "2.497",
      period: "taxa única",
      badge: "Mais Vendido",
      description: "Ideal para empresas consolidadas que querem autoridade de mercado e blog de conteúdo.",
      features: [
        "Site institucional com até 5 páginas",
        "Blog integrado com CMS fácil",
        "Formulários de contato avançados",
        "SEO Técnico avançado",
        "Integração com Google Analytics",
        "Otimização extrema de velocidade",
        "Hospedagem premium por 1 ano",
        "Suporte preferencial por 90 dias",
        "Prazo de entrega: até 15 dias"
      ],
      ctaText: "Falar com Especialista"
    },
    {
      id: "plan-3",
      name: "Plano Premium",
      price: "4.997",
      period: "A partir de",
      description: "Projetos robustos de sistemas web, e-commerce ou soluções com inteligência artificial sob medida.",
      features: [
        "Lojas Virtuais ou Sistemas Web completos",
        "Integração avançada com APIs externas",
        "Chatbot Inteligente com IA integrado",
        "Painel de Administração completo",
        "Banco de dados robusto",
        "Estratégia completa de conversão",
        "Hospedagem escalável especializada",
        "Suporte premium vitalício",
        "Prazo de entrega: personalizado"
      ],
      ctaText: "Receber Proposta"
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "Quanto tempo leva para o meu site ficar pronto?",
      answer: "O tempo de desenvolvimento varia de acordo com o plano escolhido. Landing Pages do Plano Essencial costumam ficar prontas em até 7 dias úteis. Projetos corporativos maiores levam entre 15 e 20 dias, enquanto sistemas web customizados são definidos sob cronograma específico.",
      category: "Prazos"
    },
    {
      id: "faq-2",
      question: "O meu site vai aparecer na primeira página do Google?",
      answer: "Sim! Desenvolvemos todos os nossos projetos seguindo as diretrizes de SEO mais rígidas do Google (Core Web Vitals excelentes, semântica HTML, meta tags, sitemap, robots.txt). No entanto, o rankeamento orgânico depende também da concorrência e da estratégia de conteúdo continuada, que orientamos em nossos relatórios de entrega.",
      category: "SEO"
    },
    {
      id: "faq-3",
      question: "Existe alguma taxa de manutenção mensal?",
      answer: "Não cobramos taxas de manutenção obrigatórias. O site é 100% seu. Após a entrega, você só terá os custos de renovação anual do seu domínio (cerca de R$ 40/ano) e da hospedagem de dados. Oferecemos planos opcionais de suporte e manutenção continuada para empresas que desejam focar 100% nas vendas enquanto nós cuidamos do técnico.",
      category: "Custos"
    },
    {
      id: "faq-4",
      question: "Eu mesmo vou conseguir editar as informações do meu site?",
      answer: "Sim, absolutamente! Integramos painéis administrativos (CMS) intuitivos em nossos projetos. Você poderá alterar imagens, textos de serviços, postagens de blog e FAQs sem precisar de conhecimento técnico ou linhas de código adicionais.",
      category: "CMS"
    },
    {
      id: "faq-5",
      question: "Quais são as formas de pagamento?",
      answer: "Oferecemos condições facilitadas de pagamento. Aceitamos Pix, transferência bancária ou parcelamento em até 12x no Cartão de Crédito. Iniciamos a produção do projeto após a confirmação da entrada combinada no contrato de prestação de serviços.",
      category: "Financeiro"
    },
    {
      id: "faq-6",
      question: "Vocês dão suporte após a entrega do site?",
      answer: "Sim! Todos os nossos projetos possuem garantia contratual de suporte técnico contra qualquer falha ou erro. O suporte preferencial cobre desde auxílio com e-mails corporativos até orientações de edição de conteúdo via painel administrativo.",
      category: "Suporte"
    }
  ],
  stats: [
    {
      id: "stat-1",
      label: "Projetos Entregues",
      value: 120,
      suffix: "+",
      iconName: "Code"
    },
    {
      id: "stat-2",
      label: "Clientes Satisfeitos",
      value: 95,
      suffix: "%",
      iconName: "Smile"
    },
    {
      id: "stat-3",
      label: "Linhas de Código",
      value: 80,
      suffix: "K+",
      iconName: "Terminal"
    },
    {
      id: "stat-4",
      label: "Anos de Experiência",
      value: 6,
      suffix: "+",
      iconName: "Award"
    }
  ]
};
