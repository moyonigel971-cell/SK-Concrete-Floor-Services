export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  specs: {
    concreteGrade: string;
    thicknessOrSpan: string;
    cureTime: string;
    reinforcement: string;
  };
  suitableFor: string[];
  imageUrl: string;
}

export interface ProjectMedia {
  id: string;
  title: string;
  category: 'slabs' | 'stairs' | 'foundations' | 'decking' | 'videos';
  type: 'video' | 'image';
  src: string;
  description: string;
  location: string;
  highlight: string;
}

export interface QuoteFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  suburb: string;
  serviceType: string;
  estimatedArea: string;
  projectStage: string;
  notes: string;
}

export interface ClientReview {
  id: string;
  author: string;
  role: string;
  companyOrSuburb: string;
  serviceType: string;
  rating: number;
  quote: string;
  date: string;
  source: 'Client Project' | 'Submitted Review';
}

