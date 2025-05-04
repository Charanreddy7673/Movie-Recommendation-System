import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieFilter } from '../types';
import { FilterPanel } from '../components/discover/FilterPanel';
import { MovieGrid } from '../components/movies/MovieGrid';
import { useMovies } from '../context/MovieContext';

export const Discover: React.FC = () => {
  const { movies, genres, loading, filterMovies } = useMovies();
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const fetchMovies = async () => {
      const filters: MovieFilter = {};
      
      const genreParam = searchParams.get('genre');
      if (genreParam) {
        filters.genre = parseInt(genreParam);
      }
      
      const yearParam = searchParams.get('year');
      if (yearParam) {
        filters.year = parseInt(yearParam);
      }
      
      const ratingParam = searchParams.get('rating');
      if (ratingParam) {
        filters.rating = parseInt(ratingParam);
      }
      
      const sortParam = searchParams.get('sort') as MovieFilter['sort'];
      if (sortParam) {
        filters.sort = sortParam;
      }
      
      await filterMovies(filters);
    };
    
    fetchMovies();
  }, [searchParams, filterMovies]);
  
  const handleFilter = (filters: MovieFilter) => {
    const newParams = new URLSearchParams();
    
    if (filters.genre) {
      newParams.set('genre', filters.genre.toString());
    }
    
    if (filters.year) {
      newParams.set('year', filters.year.toString());
    }
    
    if (filters.rating) {
      newParams.set('rating', filters.rating.toString());
    }
    
    if (filters.sort) {
      newParams.set('sort', filters.sort);
    }
    
    setSearchParams(newParams);
  };
  
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4">
        <FilterPanel genres={genres} onFilter={handleFilter} />
        
        <MovieGrid 
          movies={movies}
          loading={loading}
          emptyMessage="No movies match your filters"
        />
      </div>
    </div>
  );
};