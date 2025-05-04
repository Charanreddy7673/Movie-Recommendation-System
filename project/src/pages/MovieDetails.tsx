import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '../types';
import { MovieHero } from '../components/movies/MovieHero';
import { MovieGrid } from '../components/movies/MovieGrid';
import { StarRating } from '../components/common/StarRating';
import { useMovies } from '../context/MovieContext';
import { useUser } from '../context/UserContext';

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovieById, getRecommendations } = useMovies();
  const { rateMovie, getUserRating } = useUser();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const movieId = parseInt(id);
        const movieData = await getMovieById(movieId);
        
        if (movieData) {
          setMovie(movieData);
          
          // Get user's rating for this movie
          const rating = getUserRating(movieId);
          setUserRating(rating);
          
          // Get recommendations
          const recommendationsData = await getRecommendations(movieId);
          setRecommendations(recommendationsData);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, getMovieById, getRecommendations, getUserRating]);
  
  const handleRateMovie = async (rating: number) => {
    if (!movie) return;
    
    try {
      await rateMovie(movie.id, rating);
      setUserRating(rating);
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };
  
  if (loading || !movie) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="animate-pulse">
          <div className="w-full h-96 bg-background-light"></div>
          <div className="container mx-auto px-4 mt-8">
            <div className="h-10 bg-background-light rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-background-light rounded w-1/2 mb-8"></div>
            <div className="h-32 bg-background-light rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-16 min-h-screen">
      <MovieHero movie={movie} />
      
      <div className="container mx-auto px-4 py-8">
        {/* User rating section */}
        <div className="bg-background-light rounded-lg p-6 mb-8">
          <h3 className="text-xl font-display font-semibold mb-4">Rate this Movie</h3>
          <div className="flex items-center">
            <StarRating 
              rating={userRating} 
              size="lg" 
              interactive={true}
              onRatingChange={handleRateMovie}
              className="mr-4"
            />
            <span className="text-lg font-medium">
              {userRating > 0 ? `Your rating: ${userRating.toFixed(1)}` : 'Not rated yet'}
            </span>
          </div>
        </div>
        
        {/* Recommendations */}
        {recommendations.length > 0 && (
          <MovieGrid 
            title="You May Also Like" 
            movies={recommendations}
            emptyMessage="No recommendations found"
          />
        )}
      </div>
    </div>
  );
};