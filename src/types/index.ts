export interface NavItem {
  name: string;
  href: string;
  isNew?: boolean;
  badge?: string;
}

export interface Product {
  id: string;
  name: string;
  collection: string;
  category: 'faucets' | 'showers' | 'sanitaryware' | 'bathtubs' | 'accessories' | 'bath-seth' | 'kitchen' | 'valves' | 'allieds' | string;
  finish: string;
  price?: string;
  image: string;
  tag?: string;
  description: string;
  specs: {
    material: string;
    flowRate?: string;
    warranty: string;
    installation: string;
  };
}

export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  description: string;
  year: string;
}

export interface Dealer {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  experienceCentre: boolean;
}

export interface Catalogue {
  id: string;
  title: string;
  edition: string;
  pages: number;
  size: string;
  coverImage: string;
  pdfUrl: string;
  category: string;
}
