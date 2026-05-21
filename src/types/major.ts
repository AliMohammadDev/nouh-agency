export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Major {
  id: number;
  name: string;
  description: string;
  categories: Category[];
}