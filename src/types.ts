export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
  featured?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tech: string[];
  link?: string;
  completedYear?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  description: string;
  features: string[];
  ctaText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  iconName: string;
}

export interface AppContent {
  services: Service[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  plans: Plan[];
  faqs: FAQItem[];
  stats: Stat[];
}
