export type CategoryType = 
  | 'all'
  | 'nature'
  | 'animals'
  | 'landscapes'
  | 'people'
  | 'cars'
  | 'art'
  | 'abstract'
  | 'ocean'
  | 'mountains'
  | 'food'
  | 'architecture'
  | 'space'
  | 'flowers';

export interface PictureItem {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  categoryLabel: string;
  photographer: string;
  photographerHandle: string;
  location: string;
  resolution: string;
  camera: string;
  date: string;
  imageUrl: string;
  thumbUrl: string;
  downloadUrl: string;
  aspectRatio?: string;
  tags: string[];
  featured?: boolean;
}

export interface CategoryInfo {
  id: CategoryType;
  label: string;
  description: string;
  coverImage: string;
  itemCount: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info';
}
