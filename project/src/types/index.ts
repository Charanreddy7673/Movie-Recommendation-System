export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  runtime?: number;
  tagline?: string;
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieFilter {
  genre?: number;
  year?: number;
  rating?: number;
  sort?: 'popularity' | 'rating' | 'release_date';
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: number[];
  watchlist: number[];
  ratings: Record<number, number>; // movieId: rating
  preferences: {
    genres: number[];
  };
}