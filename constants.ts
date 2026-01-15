
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
      description: "Desenvolvendo interfaces intuitivas e envolventes, onde cada detalhe transforma a interação do usuário.",
      scrollIndicator: "Saiba mais"
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
      title: "Pronto para começar algo incrível?",
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
      titlePart2: "o seu futuro.",
      emailButtonText: "Entre em contato comigo",
      description: "Criando interfaces intuitivas que tornam cada detalhe uma experiência única.",
      navTitle: "Navegação",
      socialTitle: "Social",
      rights: "GustaSoares Studio — Todos os direitos reservados © 2025"
    },
    aboutPage: {
      hero: {
        tagline: "SOBRE MIM",
        title: "Muito além do design visual",
        description: "Uma jornada dedicada a resolver problemas complexos através de interfaces intuitivas e funcionais."
      },
      introduction: {
        titlePrefix: "Um pouco sobre",
        titleHighlight: "minha trajetória"
      },
      history: {
        title: "Minha História",
        description: "Com mais de 5 anos de experiência no mercado digital, comecei minha jornada como desenvolvedor front-end, o que me deu uma base técnica sólida. \n\nAo longo do tempo, percebi que o verdadeiro impacto estava na concepção da experiência do usuário, migrando meu foco para UX/UI Design. Hoje, combino lógica e criatividade para entregar produtos que não apenas funcionam, mas encantam.",
        image: "/imgs/profile-photo.webp",
        highlights: [
          { number: "+5", label: "Anos de experiência" },
          { number: "+200", label: "Projetos entregues" },
          { number: "+4", label: "Setores atendidos" }
        ]
      },
      methodology: {
        title: "Como eu trabalho",
        description: "Minha metodologia combina Design Thinking e processos ágeis para garantir entregas assertivas.",
        items: [
          { title: "Imersão", description: "Entendo o negócio, o público e os objetivos do projeto." },
          { title: "Definição", description: "Estruturo a arquitetura da informação e os fluxos de usuário." },
          { title: "Prototipação", description: "Crio wireframes e protótipos de alta fidelidade para validação." },
          { title: "UI Design", description: "Aplico a identidade visual e crio interfaces pixel-perfect." }
        ]
      },
      services: {
        title: "O que posso fazer por você",
        description: "Serviços sob medida para elevar o nível do seu produto digital."
      },
      cta: {
        title: "Vamos tirar sua ideia\noff the ground?",
        description: "Estou pronto para ouvir sobre seu projeto e entender como podemos criar algo único juntos. Mande uma mensagem e vamos conversar.",
        button: "Iniciar Projeto"
      }
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
      description: "Developing intuitive and engaging interfaces, where every detail transforms user interaction.",
      scrollIndicator: "Learn more"
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
      title: "Ready to start something amazing?",
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
    },
    aboutPage: {
      hero: {
        tagline: "ABOUT ME",
        title: "Beyond visual design",
        description: "A journey dedicated to solving complex problems through intuitive and functional interfaces."
      },
      introduction: {
        titlePrefix: "A little about",
        titleHighlight: "my journey"
      },
      history: {
        title: "My Story",
        description: "With over 5 years of experience in the digital market, I started my journey as a front-end developer, which gave me a solid technical foundation.\n\nOver time, I realized that the true impact lay in the design of user experience, shifting my focus to UX/UI Design. Today, I combine logic and creativity to deliver products that not only work but delight.",
        image: "/imgs/profile-photo.webp",
        highlights: [
          { number: "+5", label: "Years of Experience" },
          { number: "+200", label: "Projects Delivered" },
          { number: "+4", label: "Sectors Served" }
        ]
      },
      methodology: {
        title: "How I Work",
        description: "My methodology combines Design Thinking and agile processes to ensure assertive deliveries.",
        items: [
          { title: "Immersion", description: "Understanding the business, audience, and project goals." },
          { title: "Definition", description: "Structuring information architecture and user flows." },
          { title: "Prototyping", description: "Creating wireframes and high-fidelity prototypes for validation." },
          { title: "UI Design", description: "Applying visual identity and creating pixel-perfect interfaces." }
        ]
      },
      services: {
        title: "What I can do for you",
        description: "Tailored services to elevate your digital product."
      },
      cta: {
        title: "Let's get your idea\noff the ground?",
        description: "I'm ready to hear about your project and understand how we can create something unique together. Send me a message and let's talk.",
        button: "Start Project"
      }
    }
  }
};

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/gusta-soares/",
  behance: "https://www.behance.net/gustasoares",
  whatsapp: "https://api.whatsapp.com/send?phone=5519993595368",
  email: "contato@gustasoares.com"
};

// WhatsApp Messages by Context
export const WHATSAPP_PHONE = "5519993595368";

export const WHATSAPP_MESSAGES = {
  footer: "Olá! Vim pelo seu portfólio e gostaria de conversar sobre um projeto.",
  social: "Olá! Encontrei seu perfil e gostaria de saber mais sobre seus serviços.",
  contact: "Olá! Tenho interesse em iniciar um projeto. Podemos conversar?",
  project: (projectName: string) => `Olá! Vi o projeto "${projectName}" no seu portfólio e gostaria de conversar sobre algo similar.`
};

export const getWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedMessage}`;
};
