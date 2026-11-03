export interface Ingredient {
  id: string;
  name: string;
  gujarati: string;
  hindi?: string;
  description: string;
  aroma: string;
  role: string;
  region: string;
  image: string;
}

export interface Dish {
  id: string;
  name: string;
  gujarati: string;
  tagline: string;
  description: string;
  pairingNote: string;
  spiceLevel: string;
  image: string;
}

export interface BrandPillar {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface NutritionFact {
  label: string;
  value: string;
  dailyValue?: string;
}

export interface ProductDetails {
  title: string;
  gujaratiTitle: string;
  tagline: string;
  netWeight: string;
  description: string;
  ingredients: string[];
  howToUse: string;
  storage: string;
  fssaiStatus: string;
  barcode: string;
  nutrition: NutritionFact[];
  packagingTypes: {
    id: 'pouch' | 'box';
    name: string;
    description: string;
    badge: string;
  }[];
}

