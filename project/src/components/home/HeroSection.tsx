import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';
import { Movie } from '../../types';
import { Button } from '../common/Button';
import { useMovies } from '../../context/MovieContext';
import { cn } from '../../utils/cn';

export const HeroSection: React.FC = () => {
  const { trending } = useMovies();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const navigate = useNavigate();
  
  const currentMovie = trending[currentIndex];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % trending.length);
        setIsChanging(false);
      }, 500);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [trending.length]);
  
  if (!currentMovie) {
    return (
      <div className="relative w-full h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-12 bg-background-light rounded w-64 mb-4"></div>
          <div className="h-6 bg-background-light rounded w-96"></div>
        </div>
      </div>
    );
  }
  
  const releaseYear = currentMovie.release_date 
    ? new Date(currentMovie.release_date).getFullYear() 
    : '';
  
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <img
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          alt={currentMovie.title}
          className={cn(
            "w-full h-full object-cover object-center transition-opacity",
            isChanging ? "opacity-0" : "opacity-100"
          )}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/1920x1080?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full pt-20 flex items-center relative z-10">
        <div className="max-w-2xl animate-slide-up">
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 transition-opacity duration-500",
              isChanging ? "opacity-0" : "opacity-100"
            )}
          >
            {currentMovie.title}
          </h1>
          
          {releaseYear && (
            <div className="mb-4 text-lg text-text-secondary">
              {releaseYear}
            </div>
          )}
          
          <p 
            className={cn(
              "text-lg text-text-secondary mb-8 line-clamp-3 md:line-clamp-none transition-opacity duration-500",
              isChanging ? "opacity-0" : "opacity-100"
            )}
          >
            {currentMovie.overview}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Play className="w-5 h-5" />}
              onClick={() => navigate(`/movie/${currentMovie.id}`)}
              className="transition-transform hover:scale-105"
            >
              Watch Details
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => navigate('/discover')}
              className="transition-transform hover:scale-105"
            >
              Discover More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
        {trending.slice(0, 5).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-primary w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => {
              setIsChanging(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsChanging(false);
              }, 500);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};