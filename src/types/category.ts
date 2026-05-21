export interface MajorMini {
  id: number;
  name: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  major: MajorMini;
} 
