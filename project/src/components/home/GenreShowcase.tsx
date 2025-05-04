import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Genre } from '../../types';
import { cn } from '../../utils/cn';

interface GenreShowcaseProps {
  genres: Genre[];
}

export const GenreShowcase: React.FC<GenreShowcaseProps> = ({ genres }) => {
  const navigate = useNavigate();
  
  // Get a subset of genres to display
  const displayGenres = genres.slice(0, 6);
  
  // Define color classes for different genres to make them visually distinct
  const colorClasses = [
    'from-red-700/80 to-red-900/80', // Action
    'from-purple-700/80 to-purple-900/80', // Sci-Fi
    'from-blue-700/80 to-blue-900/80', // Drama
    'from-green-700/80 to-green-900/80', // Comedy
    'from-yellow-700/80 to-yellow-900/80', // Adventure
    'from-pink-700/80 to-pink-900/80', // Romance
  ];
  
  // Define background images for each genre
  const genreBackgrounds = {
    Action: 'https://images.pexels.com/photos/1787236/pexels-photo-1787236.jpeg',
    Adventure: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg',
    Animation: 'https://images.pexels.com/photos/3227984/pexels-photo-3227984.jpeg',
    Comedy: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
    Crime: 'https://images.pexels.com/photos/923681/pexels-photo-923681.jpeg',
    Documentary: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg',
    Drama: 'https://images.pexels.com/photos/2774546/pexels-photo-2774546.jpeg',
    Family: 'https://images.pexels.com/photos/1212805/pexels-photo-1212805.jpeg',
    Fantasy: 'https://images.pexels.com/photos/10901818/pexels-photo-10901818.jpeg',
    History: 'https://images.pexels.com/photos/39562/the-ball-stadion-football-the-pitch-39562.jpeg',
    Horror: 'https://images.pexels.com/photos/8059552/pexels-photo-8059552.jpeg',
    Music: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    Mystery: 'https://images.pexels.com/photos/1040473/pexels-photo-1040473.jpeg',
    Romance: 'https://images.pexels.com/photos/5468438/pexels-photo-5468438.jpeg',
    'Science Fiction': 'https://images.pexels.com/photos/4413170/pexels-photo-4413170.jpeg',
    'TV Movie': 'https://images.pexels.com/photos/5999880/pexels-photo-5999880.jpeg',
    Thriller: 'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg',
    War: 'https://images.pexels.com/photos/1911601/pexels-photo-1911601.jpeg',
    Western: 'https://images.pexels.com/photos/4471279/pexels-photo-4471279.jpeg',
  };
  
  const handleGenreClick = (genreId: number) => {
    navigate(`/discover?genre=${genreId}`);
  };
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Explore by Genre</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {displayGenres.map((genre, index) => {
            const backgroundImage = genreBackgrounds[genre.name as keyof typeof genreBackgrounds] || 'https://images.pexels.com/photos/6447217/pexels-photo-6447217.jpeg';
            
            return (
              <div 
                key={genre.id}
                className="relative h-40 md:h-48 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg"
                onClick={() => handleGenreClick(genre.id)}
              >
                <img 
                  src={backgroundImage}
                  alt={genre.name}
                  className="w-full h-full object-cover"
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  colorClasses[index % colorClasses.length]
                )}></div>
                <div className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition-colors duration-300">
                  <h3 className="text-2xl font-display font-bold text-white">{genre.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};