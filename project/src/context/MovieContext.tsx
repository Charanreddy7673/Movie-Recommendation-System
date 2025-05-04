import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie, MovieFilter, Genre } from '../types';
import { fetchMovies, fetchGenres, fetchMovie, fetchRecommendations } from '../services/movieService';

interface MovieContextType {
  movies: Movie[];
  trending: Movie[];
  loading: boolean;
  error: string | null;
  genres: Genre[];
  getMovieById: (id: number) => Promise<Movie | null>;
  getRecommendations: (movieId: number) => Promise<Movie[]>;
  filterMovies: (filters: MovieFilter) => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        const [moviesData, genresData] = await Promise.all([
          fetchMovies(),
          fetchGenres()
        ]);
        
        setMovies(moviesData);
        // Sort by popularity for trending
        const trendingMovies = [...moviesData]
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 10);
        setTrending(trendingMovies);
        setGenres(genresData);
      } catch (err) {
        setError('Failed to load movie data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const getMovieById = async (id: number): Promise<Movie | null> => {
    try {
      return await fetchMovie(id);
    } catch (err) {
      setError('Failed to load movie details');
      console.error(err);
      return null;
    }
  };

  const getRecommendations = async (movieId: number): Promise<Movie[]> => {
    try {
      return await fetchRecommendations(movieId);
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const filterMovies = async (filters: MovieFilter): Promise<void> => {
    try {
      setLoading(true);
      // In a real app, we would call the API with filters
      // For this demo, we'll filter the client-side data
      let filteredMovies = [...movies];

      if (filters.genre) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.genres.some(genre => genre.id === filters.genre)
        );
      }

      if (filters.year) {
        filteredMovies = filteredMovies.filter(movie => {
          const releaseYear = new Date(movie.release_date).getFullYear();
          return releaseYear === filters.year;
        });
      }

      if (filters.rating) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.vote_average >= filters.rating
        );
      }

      if (filters.sort) {
        filteredMovies.sort((a, b) => {
          switch (filters.sort) {
            case 'popularity':
              return b.popularity - a.popularity;
            case 'rating':
              return b.vote_average - a.vote_average;
            case 'release_date':
              return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
            default:
              return 0;
          }
        });
      }

      setMovies(filteredMovies);
    } catch (err) {
      setError('Failed to filter movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query: string): Promise<void> => {
    try {
      setLoading(true);
      // In a real app, we would call a search API
      // For this demo, we'll search the client-side data
      if (!query.trim()) {
        // Reset to all movies if query is empty
        const moviesData = await fetchMovies();
        setMovies(moviesData);
        return;
      }

      const lowerQuery = query.toLowerCase();
      const searchResults = movies.filter(movie => 
        movie.title.toLowerCase().includes(lowerQuery) || 
        movie.overview.toLowerCase().includes(lowerQuery)
      );

      setMovies(searchResults);
    } catch (err) {
      setError('Failed to search movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    movies,
    trending,
    loading,
    error,
    genres,
    getMovieById,
    getRecommendations,
    filterMovies,
    searchMovies
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};