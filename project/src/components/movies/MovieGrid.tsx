import React from 'react';
import { Movie } from '../../types';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  emptyMessage?: string;
  loading?: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  title,
  emptyMessage = 'No movies found',
  loading = false,
}) => {
  return (
    <div className="my-8">
      {title && <h2 className="text-2xl font-display font-semibold mb-6">{title}</h2>}
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-background-light rounded-lg overflow-hidden animate-pulse">
              <div className="w-full h-64 bg-gray-700"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-text-secondary text-lg mb-4">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};