export type Category = 
  | 'all'
  | 'landscapes'
  | 'oceans'
  | 'botanicals'
  | 'wildlife'
  | 'abstract'
  | 'digital';

export interface ExifData {
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  iso?: string;
  shutter?: string;
}

export interface Artwork {
  id: string;
  title: string;
  category: Category;
  categoryLabel: string;
  artist: string;
  artistBio: string;
  location: string;
  year: string;
  medium: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  imageSrc: string;
  dimensions: string;
  curatorStory: string;
  palette: string[];
  exif: ExifData;
  featured?: boolean;
  initialLikes: number;
}

export type FrameStyle = 'oak' | 'black' | 'brass' | 'frameless';
