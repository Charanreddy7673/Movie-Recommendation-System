import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { FavoritesList } from '../components/profile/FavoritesList';
import { WatchList } from '../components/profile/WatchList';
import { useUser } from '../context/UserContext';
import { useMovies } from '../context/MovieContext';

export const Profile: React.FC = () => {
  const { user, loading: userLoading } = useUser();
  const { movies, loading: moviesLoading } = useMovies();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    if (!user || !movies.length) return;
    
    // Filter movies to get user's favorites
    const favorites = movies.filter(movie => user.favorites.includes(movie.id));
    setFavoriteMovies(favorites);
    
    // Filter movies to get user's watchlist
    const watchlist = movies.filter(movie => user.watchlist.includes(movie.id));
    setWatchlistMovies(watchlist);
  }, [user, movies]);
  
  if (userLoading) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="animate-pulse bg-background-light rounded-lg h-40 mb-8"></div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="bg-background-light rounded-lg p-8 text-center">
            <h2 className="text-2xl font-display font-semibold mb-4">User not found</h2>
            <p className="text-text-secondary">
              There was an error loading your profile. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4">
        <ProfileHeader user={user} />
        
        <FavoritesList 
          movies={favoriteMovies}
          loading={moviesLoading}
        />
        
        <WatchList 
          movies={watchlistMovies}
          loading={moviesLoading}
        />
      </div>
    </div>
  );
};