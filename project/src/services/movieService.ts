import axios from 'axios';
import { Movie, Genre } from '../types';
import movieData from '../data/movies.json';
import genreData from '../data/genres.json';

// BASE URL for the API
const API_BASE_URL = '/api';

// In a real application, these would be actual API calls
// For demo purposes, we're using local data with simulated API delays

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app:
    // const response = await axios.get(`${API_BASE_URL}/movies`);
    // return response.data;
    
    return movieData as Movie[];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchGenres = async (): Promise<Genre[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app:
    // const response = await axios.get(`${API_BASE_URL}/genres`);
    // return response.data;
    
    return genreData as Genre[];
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const fetchMovie = async (id: number): Promise<Movie | null> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // In a real app:
    // const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
    // return response.data;
    
    const movie = (movieData as Movie[]).find(movie => movie.id === id);
    return movie || null;
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error);
    throw error;
  }
};

export const fetchRecommendations = async (movieId: number): Promise<Movie[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In a real app:
    // const response = await axios.get(`${API_BASE_URL}/movies/${movieId}/recommendations`);
    // return response.data;
    
    // For demo, just return 5 random movies as recommendations
    const movies = movieData as Movie[];
    const filtered = movies.filter(movie => movie.id !== movieId);
    return getRandomElements(filtered, 5);
  } catch (error) {
    console.error(`Error fetching recommendations for movie ${movieId}:`, error);
    throw error;
  }
};

// Helper function to get random elements from an array
function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}