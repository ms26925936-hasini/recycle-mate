export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All Categories', icon: '♻️', color: '#2E7D32' },
  { id: 'plastic', label: 'Plastic', icon: '🍶', color: '#1976D2' },
  { id: 'glass', label: 'Glass', icon: '🍾', color: '#00897B' },
  { id: 'paper', label: 'Paper', icon: '📰', color: '#F57C00' },
  { id: 'metal', label: 'Metal', icon: '🥫', color: '#616161' },
  { id: 'ewaste', label: 'E-Waste', icon: '📱', color: '#7B1FA2' },
];