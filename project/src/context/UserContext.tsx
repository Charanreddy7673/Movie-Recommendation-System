import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { getUserProfile, updateUserProfile } from '../services/userService';

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  toggleFavorite: (movieId: number) => Promise<void>;
  toggleWatchlist: (movieId: number) => Promise<void>;
  rateMovie: (movieId: number, rating: number) => Promise<void>;
  updatePreferences: (genreIds: number[]) => Promise<void>;
  isInFavorites: (movieId: number) => boolean;
  isInWatchlist: (movieId: number) => boolean;
  getUserRating: (movieId: number) => number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await getUserProfile();
        setUser(userData);
      } catch (err) {
        setError('Failed to load user profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const saveUserChanges = async (updatedUser: User) => {
    try {
      await updateUserProfile(updatedUser);
      setUser(updatedUser);
    } catch (err) {
      setError('Failed to update user profile');
      console.error(err);
      throw err;
    }
  };

  const toggleFavorite = async (movieId: number) => {
    if (!user) return;

    const updatedUser = { ...user };
    if (updatedUser.favorites.includes(movieId)) {
      updatedUser.favorites = updatedUser.favorites.filter(id => id !== movieId);
    } else {
      updatedUser.favorites = [...updatedUser.favorites, movieId];
    }

    await saveUserChanges(updatedUser);
  };

  const toggleWatchlist = async (movieId: number) => {
    if (!user) return;

    const updatedUser = { ...user };
    if (updatedUser.watchlist.includes(movieId)) {
      updatedUser.watchlist = updatedUser.watchlist.filter(id => id !== movieId);
    } else {
      updatedUser.watchlist = [...updatedUser.watchlist, movieId];
    }

    await saveUserChanges(updatedUser);
  };

  const rateMovie = async (movieId: number, rating: number) => {
    if (!user) return;

    const updatedUser = { 
      ...user,
      ratings: {
        ...user.ratings,
        [movieId]: rating
      }
    };

    await saveUserChanges(updatedUser);
  };

  const updatePreferences = async (genreIds: number[]) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        genres: genreIds
      }
    };

    await saveUserChanges(updatedUser);
  };

  const isInFavorites = (movieId: number): boolean => {
    return user ? user.favorites.includes(movieId) : false;
  };

  const isInWatchlist = (movieId: number): boolean => {
    return user ? user.watchlist.includes(movieId) : false;
  };

  const getUserRating = (movieId: number): number => {
    return user ? user.ratings[movieId] || 0 : 0;
  };

  const value = {
    user,
    loading,
    error,
    toggleFavorite,
    toggleWatchlist,
    rateMovie,
    updatePreferences,
    isInFavorites,
    isInWatchlist,
    getUserRating
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};