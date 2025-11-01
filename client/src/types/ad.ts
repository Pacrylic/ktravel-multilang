export interface TopSlotAd {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  buttonText: string;
}

export interface BottomBoxAd {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
}

export interface InContentAd {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  price?: string;
  rating?: number;
}
