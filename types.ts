
export type Language = 'pt' | 'en';

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: number;
  icon: 'monitor' | 'code' | 'layout' | 'search';
  title: string;
  description: string;
}

export type BlockType = '1x1-image' | '2x1-image' | 'text-image-left' | 'text-only' | 'gallery-2x2';

export interface ProjectBlock {
  id: string;
  type: BlockType;
  content: {
    image?: string;
    image2?: string;
    images?: string[]; // for gallery
    text?: string;
    title?: string;
  };
}

export interface Project {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string; // Thumbnail for Home
}

export interface ExtendedProject extends Project {
  coverImage: string; // Large banner image
  descriptionShort: string;
  descriptionLong: string;
  tools: string[];
  showLink: boolean;
  link?: string;
  gallery: string[]; // Fallback for old projects
  blocks?: ProjectBlock[]; // New flexible content
}

export interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    cta: string;
  };
  hero: {
    tagline: string;
    title: string;
    description: string;
    scrollIndicator: string;
  };
  services: {
    subtitle: string;
    title: string;
    description: string;
    items: Service[];
  };
  projects: {
    subtitle: string;
    title: string;
    categories: {
      all: string;
      institutional: string;
      landing: string;
      app: string;
    };
  };
  contact: {
    tagline: string;
    title: string;
    description: string;
    orEmail: string;
    form: {
      name: string;
      email: string;
      company: string;
      area: string;
      investment: string;
      message: string;
      submit: string;
      areas: string[];
      budgets: string[];
    };
  };
  footer: {
    titlePart1: string;
    titlePart2: string;
    emailButtonText: string;
    description: string;
    navTitle: string;
    socialTitle: string;
    rights: string;
  };
  aboutPage: {
    hero: {
      tagline: string;
      title: string;
      description: string;
    };
    introduction: {
      titlePrefix: string;
      titleHighlight: string;
    };
    history: {
      title: string;
      description: string;
      image: string;
      highlights: {
        number: string;
        label: string;
      }[];
    };
    methodology: {
      title: string;
      description: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    services: {
      title: string;
      description: string;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
}
