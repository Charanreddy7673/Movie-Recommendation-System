import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  maxRating = 5,
  size = 'md',
  color = 'text-secondary',
  interactive = false,
  onRatingChange,
  className,
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(rating);
  
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  const handleClick = (index: number) => {
    if (!interactive) return;
    
    const newRating = index === selectedRating ? index - 0.5 : index;
    setSelectedRating(newRating);
    onRatingChange?.(newRating);
  };
  
  const handleMouseEnter = (index: number) => {
    if (!interactive) return;
    setHoverRating(index);
  };
  
  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };
  
  const displayRating = hoverRating || selectedRating || rating;
  
  return (
    <div 
      className={cn('flex items-center gap-1', className)}
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= displayRating;
        const isHalfFilled = !isFilled && starValue - 0.5 <= displayRating;
        
        return (
          <div
            key={index}
            className={cn(
              'transition-transform duration-200 ease-in-out',
              interactive && 'cursor-pointer hover:scale-110',
              isFilled && 'animate-scale-in'
            )}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
          >
            <Star
              className={cn(
                sizes[size],
                isFilled ? color : 'text-gray-600',
                isHalfFilled && 'half-filled'
              )}
              fill={isFilled ? 'currentColor' : (isHalfFilled ? 'url(#half)' : 'none')}
            />
          </div>
        );
      })}
      
      {interactive && (
        <svg width="0" height="0">
          <defs>
            <linearGradient id="half" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="none" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};