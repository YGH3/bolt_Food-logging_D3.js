export interface FoodEntry {
  id: string;
  name: string;
  weight: number;
  taste: 'sweet' | 'salty' | 'sour' | 'bitter' | 'umami';
  date: Date;
  elasticity: number; // New field for elasticity (0-100)
}