import React from 'react';
import { Heart } from 'lucide-react';
import { Movie } from '../../types';
import { MovieCard } from '../movies/MovieCard';

interface FavoritesListProps {
  movies: Movie[];
  loading: boolean;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({ movies, loading }) => {
  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2">
          <Heart className="text-primary" fill="currentColor" />
          Your Favorites
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-background-light rounded-lg overflow-hidden animate-pulse">
              <div className="w-full h-64 bg-gray-700"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (movies.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2">
          <Heart className="text-primary" fill="currentColor" />
          Your Favorites
        </h2>
        <div className="bg-background-light rounded-lg p-8 text-center">
          <Heart className="w-12 h-12 text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
          <p className="text-text-secondary">
            Start adding movies to your favorites to see them here.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2">
        <Heart className="text-primary" fill="currentColor" />
        Your Favorites
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};