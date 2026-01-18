export interface Game {
  id: number;
  title: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  platforms: Platform[];
  genres: string[];
  description: string;
  coverImage: string;
  rating: number;
  price: number;
  inLibrary: boolean;
}

export type Platform = 'PC' | 'Mobile' | 'VR';

export interface FilterState {
  platforms: Platform[];
  genres: string[];
  search: string;
}
