import React from 'react';
import { Film, Star, Calendar, Clock } from 'lucide-react';
import { Movie } from '../../types';
import { Button } from '../common/Button';
import { StarRating } from '../common/StarRating';
import { useUser } from '../../context/UserContext';

interface MovieHeroProps {
  movie: Movie;
}

export const MovieHero: React.FC<MovieHeroProps> = ({ movie }) => {
  const { toggleWatchlist, isInWatchlist, toggleFavorite, isInFavorites } = useUser();
  const inWatchlist = isInWatchlist(movie.id);
  const inFavorites = isInFavorites(movie.id);

  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'Unknown';

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="relative w-full">
      {/* Backdrop image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if backdrop fails to load
            e.currentTarget.src = 'https://via.placeholder.com/1920x1080?text=No+Backdrop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-24 pt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-lg shadow-xl animate-fade-in"
              onError={(e) => {
                // Fallback if poster fails to load
                e.currentTarget.src = 'https://via.placeholder.com/500x750?text=No+Poster';
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 animate-slide-up">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-2">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-text-secondary text-lg italic mb-4">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
              <div className="flex items-center">
                <Star className="text-secondary w-5 h-5 mr-1" fill="currentColor" />
                <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                <span className="text-text-secondary ml-1">({movie.vote_count} votes)</span>
              </div>

              <div className="flex items-center">
                <Calendar className="text-text-secondary w-5 h-5 mr-1" />
                <span>{releaseYear}</span>
              </div>

              {movie.runtime && (
                <div className="flex items-center">
                  <Clock className="text-text-secondary w-5 h-5 mr-1" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map(genre => (
                <span 
                  key={genre.id} 
                  className="inline-block px-3 py-1 rounded-full bg-background-light text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-display font-semibold mb-2">Overview</h3>
              <p className="text-text-secondary leading-relaxed">{movie.overview}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                variant={inWatchlist ? 'accent' : 'outline'}
                size="lg"
                leftIcon={<Clock className="w-5 h-5" />}
                onClick={() => toggleWatchlist(movie.id)}
              >
                {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </Button>
              <Button 
                variant={inFavorites ? 'primary' : 'outline'}
                size="lg"
                onClick={() => toggleFavorite(movie.id)}
              >
                {inFavorites ? 'Favorited' : 'Add to Favorites'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};