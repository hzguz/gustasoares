
import { Translations } from './types';

export const CONTENT: Record<string, Translations> = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
      cta: "Entre em contato"
    },
    hero: {
      tagline: "UX / UI DESIGNER",
      title: "Criando experiências que conectam seu público",
      description: "Desenvolvendo interfaces intuitivas e envolventes, onde cada detalhe transforma a interação do usuário."
    },
    services: {
      subtitle: "/ Serviços",
      title: "Quais trabalhos eu realizo?",
      description: "Soluções em UX que unem estratégia, design e usabilidade para criar experiências digitais centradas no usuário.",
      items: [
        {
          id: 1,
          icon: 'monitor',
          title: "Sites em WordPress",
          description: "Desenvolvo sites completos e responsivos utilizando WordPress, focando em designs modernos e otimizados para SEO."
        },
        {
          id: 2,
          icon: 'code',
          title: "Desenvolvimento de sistemas",
          description: "Especializado na criação de sistemas web complexos e eficientes, utilizando React, Next.js, TypeScript e Node.js."
        },
        {
          id: 3,
          icon: 'layout',
          title: "Criação de Layouts",
          description: "Crio layouts que equilibram estética e funcionalidade. Desde wireframes até protótipos interativos de alta fidelidade."
        },
        {
          id: 4,
          icon: 'search',
          title: "Consultoria UX/UI",
          description: "Consultoria especializada para aprimorar a experiência do usuário, com análises detalhadas e propostas estratégicas."
        }
      ]
    },
    projects: {
      subtitle: "/ Portfólio",
      title: "Projetos selecionados",
      categories: {
        all: "Todos",
        institutional: "Institucional",
        landing: "Landing Pages",
        app: "Aplicativos"
      }
    },
    contact: {
      tagline: "Contato",
      title: "Pronto para começar algo incrível? Fale comigo!",
      description: "Agende uma conversa e compartilhe suas ideias. Transformarei cada detalhe em uma experiência única.",
      orEmail: "Ou envie um e-mail para",
      form: {
        name: "Nome Completo",
        email: "Email",
        company: "Nome da empresa",
        area: "Área do projeto",
        investment: "Investimento estimado",
        message: "Escreva sua mensagem",
        submit: "Enviar mensagem",
        areas: ["UI/UX Design", "Web Design", "Consultoria UX", "Outro"],
        budgets: ["Entre R$ 800 e R$ 1.600", "Entre R$ 2.500 e R$ 5.000", "Entre R$ 10.000 e R$ 30.000", "+ R$ 50 mil"]
      }
    },
    footer: {
      titlePart1: "Vamos criar",
      titlePart2: "o futuro.",
      emailButtonText: "Entre em contato comigo",
      description: "Criando interfaces intuitivas que tornam cada detalhe uma experiência única.",
      navTitle: "Navegação",
      socialTitle: "Social",
      rights: "GustaSoares Studio — Todos os direitos reservados © 2025"
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
      cta: "Get in Touch"
    },
    hero: {
      tagline: "UX / UI DESIGNER",
      title: "Creating experiences that connect your audience",
      description: "Developing intuitive and engaging interfaces, where every detail transforms user interaction."
    },
    services: {
      subtitle: "/ Services",
      title: "What I do",
      description: "UX solutions combining strategy, design, and usability to create user-centric digital experiences.",
      items: [
        {
          id: 1,
          icon: 'monitor',
          title: "WordPress Sites",
          description: "I develop complete and responsive sites using WordPress, focusing on modern designs and SEO optimization."
        },
        {
          id: 2,
          icon: 'code',
          title: "System Development",
          description: "Specialized in creating complex and efficient web systems using React, Next.js, TypeScript, and Node.js."
        },
        {
          id: 3,
          icon: 'layout',
          title: "Layout Creation",
          description: "I create layouts balancing aesthetics and functionality. From wireframes to high-fidelity interactive prototypes."
        },
        {
          id: 4,
          icon: 'search',
          title: "UX/UI Consulting",
          description: "Specialized consulting to enhance user experience, with detailed analysis and strategic proposals."
        }
      ]
    },
    projects: {
      subtitle: "/ Portfolio",
      title: "Selected Projects",
      categories: {
        all: "All",
        institutional: "Institutional",
        landing: "Landing Pages",
        app: "Apps"
      }
    },
    contact: {
      tagline: "Contact",
      title: "Ready to start something amazing? Talk to me!",
      description: "Schedule a chat and share your ideas. I will transform every detail into a unique experience.",
      orEmail: "Or send an email to",
      form: {
        name: "Full Name",
        email: "Email",
        company: "Company Name",
        area: "Project Area",
        investment: "Estimated Investment",
        message: "Write your message",
        submit: "Send Message",
        areas: ["UI/UX Design", "Web Design", "UX Consulting", "Other"],
        budgets: ["$150 - $300", "$500 - $1,000", "$2,000 - $6,000", "+ $10,000"]
      }
    },
    footer: {
      titlePart1: "Let's create",
      titlePart2: "the future.",
      emailButtonText: "Get in touch with me",
      description: "Creating intuitive interfaces that make every detail a unique experience.",
      navTitle: "Navigation",
      socialTitle: "Social",
      rights: "GustaSoares Studio — All rights reserved © 2025"
    }
  }
};

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/gusta-soares/",
  behance: "https://www.behance.net/gustasoares",
  whatsapp: "https://api.whatsapp.com/send?phone=5519993595368",
  email: "contato@gustasoares.com"
};
