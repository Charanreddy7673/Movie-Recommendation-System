import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Genre, MovieFilter } from '../../types';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

interface FilterPanelProps {
  genres: Genre[];
  onFilter: (filters: MovieFilter) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ genres, onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState<MovieFilter['sort']>('popularity');
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  
  const ratings = [5, 6, 7, 8, 9];
  
  const handleApplyFilters = () => {
    onFilter({
      genre: selectedGenre,
      year: selectedYear,
      rating: selectedRating,
      sort: selectedSort,
    });
    
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };
  
  const handleClearFilters = () => {
    setSelectedGenre(undefined);
    setSelectedYear(undefined);
    setSelectedRating(undefined);
    setSelectedSort('popularity');
    
    onFilter({});
  };
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-display font-semibold">Discover Movies</h2>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Filter className="w-4 h-4" />}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      <div className={cn(
        "bg-background-light rounded-lg p-6 transition-all duration-300",
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden p-0",
        "md:max-h-[2000px] md:opacity-100 md:p-6"
      )}>
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-text-secondary hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Genre Filter */}
          <div>
            <h4 className="font-medium mb-2">Genre</h4>
            <div className="flex flex-wrap gap-2">
              {genres.slice(0, 12).map(genre => (
                <button
                  key={genre.id}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors",
                    selectedGenre === genre.id
                      ? "bg-primary text-white"
                      : "bg-background hover:bg-background-light text-text-secondary"
                  )}
                  onClick={() => setSelectedGenre(selectedGenre === genre.id ? undefined : genre.id)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Year Filter */}
          <div>
            <h4 className="font-medium mb-2">Release Year</h4>
            <div className="flex flex-wrap gap-2">
              {years.slice(0, 8).map(year => (
                <button
                  key={year}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors",
                    selectedYear === year
                      ? "bg-primary text-white"
                      : "bg-background hover:bg-background-light text-text-secondary"
                  )}
                  onClick={() => setSelectedYear(selectedYear === year ? undefined : year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          
          {/* Rating Filter */}
          <div>
            <h4 className="font-medium mb-2">Minimum Rating</h4>
            <div className="flex flex-wrap gap-2">
              {ratings.map(rating => (
                <button
                  key={rating}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors",
                    selectedRating === rating
                      ? "bg-primary text-white"
                      : "bg-background hover:bg-background-light text-text-secondary"
                  )}
                  onClick={() => setSelectedRating(selectedRating === rating ? undefined : rating)}
                >
                  {rating}+ ★
                </button>
              ))}
            </div>
          </div>
          
          {/* Sort By */}
          <div>
            <h4 className="font-medium mb-2">Sort By</h4>
            <div className="flex flex-wrap gap-2">
              <button
                className={cn(
                  "px-3 py-1 rounded-full text-sm transition-colors",
                  selectedSort === 'popularity'
                    ? "bg-primary text-white"
                    : "bg-background hover:bg-background-light text-text-secondary"
                )}
                onClick={() => setSelectedSort('popularity')}
              >
                Popularity
              </button>
              <button
                className={cn(
                  "px-3 py-1 rounded-full text-sm transition-colors",
                  selectedSort === 'rating'
                    ? "bg-primary text-white"
                    : "bg-background hover:bg-background-light text-text-secondary"
                )}
                onClick={() => setSelectedSort('rating')}
              >
                Rating
              </button>
              <button
                className={cn(
                  "px-3 py-1 rounded-full text-sm transition-colors",
                  selectedSort === 'release_date'
                    ? "bg-primary text-white"
                    : "bg-background hover:bg-background-light text-text-secondary"
                )}
                onClick={() => setSelectedSort('release_date')}
              >
                Newest
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mt-6">
          <Button onClick={handleApplyFilters} variant="primary">
            Apply Filters
          </Button>
          <Button onClick={handleClearFilters} variant="outline">
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};