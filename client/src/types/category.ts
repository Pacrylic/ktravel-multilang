export interface CategorySection {
  heading: string;
  text: string;
}

export interface CategoryContent {
  overview: string;
  sections: CategorySection[];
}

export interface Category {
  id: number;
  title: string;
  subtitle: string;
  content: CategoryContent;
}

export interface ContentData {
  categories: Category[];
}

export const categoryIcons: Record<number, string> = {
  1: '✈️',
  2: '🎫',
  3: '🏔️',
  4: '🚇',
  5: '🌏',
  6: '📶',
  7: '🚨',
  8: '🗣️',
  9: '💱',
  10: '🍜',
  11: '📡',
  12: '🛍️',
  13: '🌤️',
  14: '🎎',
  15: '🍽️',
  16: '🏨',
};
