import React from 'react';
import { User, Edit, Film, Activity } from 'lucide-react';
import { User as UserType } from '../../types';
import { Button } from '../common/Button';

interface ProfileHeaderProps {
  user: UserType;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  // Calculate some stats for the profile
  const favoriteCount = user.favorites.length;
  const watchlistCount = user.watchlist.length;
  const ratingCount = Object.keys(user.ratings).length;
  
  return (
    <div className="bg-background-light rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-background rounded-full flex items-center justify-center">
            <User className="w-12 h-12 md:w-16 md:h-16 text-text-secondary" />
          </div>
          <button 
            className="absolute bottom-0 right-0 bg-primary p-2 rounded-full hover:bg-primary-hover transition-colors"
            aria-label="Edit profile picture"
          >
            <Edit className="w-4 h-4 text-white" />
          </button>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-display font-bold">{user.name}</h1>
          <p className="text-text-secondary mb-4">{user.email}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
            <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-lg">
              <Film className="w-5 h-5 text-primary" />
              <div>
                <div className="font-semibold">{favoriteCount}</div>
                <div className="text-sm text-text-secondary">Favorites</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-lg">
              <Activity className="w-5 h-5 text-accent" />
              <div>
                <div className="font-semibold">{watchlistCount}</div>
                <div className="text-sm text-text-secondary">Watchlist</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-secondary">
                <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <div>
                <div className="font-semibold">{ratingCount}</div>
                <div className="text-sm text-text-secondary">Ratings</div>
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm" leftIcon={<Edit className="w-4 h-4" />}>
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};