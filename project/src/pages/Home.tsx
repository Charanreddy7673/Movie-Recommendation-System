import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { GenreShowcase } from '../components/home/GenreShowcase';
import { MovieGrid } from '../components/movies/MovieGrid';
import { useMovies } from '../context/MovieContext';

export const Home: React.FC = () => {
  const { movies, trending, genres, loading } = useMovies();
  
  // Get top rated movies
  const topRated = [...movies]
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 10);
  
  return (
    <div className="pt-16">
      <HeroSection />
      
      <div className="container mx-auto px-4">
        <MovieGrid 
          title="Trending Now" 
          movies={trending}
          loading={loading}
        />
        
        {genres.length > 0 && <GenreShowcase genres={genres} />}
        
        <MovieGrid 
          title="Top Rated" 
          movies={topRated}
          loading={loading}
        />
      </div>
    </div>
  );
};