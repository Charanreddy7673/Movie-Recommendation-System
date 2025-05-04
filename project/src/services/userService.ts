import { User } from '../types';
import userData from '../data/user.json';

// In a real application, these would be actual API calls
// For demo purposes, we're using local data with simulated API delays

export const getUserProfile = async (): Promise<User> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // In a real app:
    // const response = await axios.get('/api/user/profile');
    // return response.data;
    
    // For demo, return mock user data
    return userData as User;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (user: User): Promise<User> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app:
    // const response = await axios.put('/api/user/profile', user);
    // return response.data;
    
    // For demo, just return the updated user
    // In a real app, this would save to the backend
    return user;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};