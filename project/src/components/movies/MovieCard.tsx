import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart } from 'lucide-react';
import { Movie } from '../../types';
import { cn } from '../../utils/cn';
import { useUser } from '../../context/UserContext';
import { Button } from '../common/Button';

interface MovieCardProps {
  movie: Movie;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  className?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  size = 'md',
  showDetails = true,
  className,
}) => {
  const { isInFavorites, isInWatchlist, toggleFavorite, toggleWatchlist } = useUser();
  const isFavorite = isInFavorites(movie.id);
  const isInWatchlistStatus = isInWatchlist(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie.id);
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(movie.id);
  };

  const sizeClasses = {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
  };

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className={cn(
        'movie-card group',
        className
      )}
    >
      <div className={cn('relative w-full', sizeClasses[size])}>
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback image if movie poster fails to load
            e.currentTarget.src = 'https://via.placeholder.com/500x750?text=No+Image';
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {showDetails && (
            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-secondary" fill="currentColor" />
                  <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="text-sm">{releaseYear}</div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={isFavorite ? 'primary' : 'outline'}
                  size="sm"
                  className="flex-1 py-1"
                  onClick={handleFavoriteClick}
                  leftIcon={<Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />}
                >
                  {isFavorite ? 'Favorited' : 'Favorite'}
                </Button>
                <Button
                  variant={isInWatchlistStatus ? 'accent' : 'outline'}
                  size="sm"
                  className="flex-1 py-1"
                  onClick={handleWatchlistClick}
                  leftIcon={<Clock className="w-4 h-4" />}
                >
                  {isInWatchlistStatus ? 'Watchlist' : 'Add to Watchlist'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showDetails && (
        <div className="p-2">
          <h3 className="font-medium line-clamp-1">{movie.title}</h3>
          {movie.genres && movie.genres.length > 0 && (
            <p className="text-text-secondary text-sm line-clamp-1">
              {movie.genres.slice(0, 2).map(genre => genre.name).join(', ')}
            </p>
          )}
        </div>
      )}
    </Link>
  );
};