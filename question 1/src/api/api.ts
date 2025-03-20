import { User, Post } from '../types';
import { getTopUsers, getTrendingPosts, getFeedPosts } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Get top users by post count
  getTopUsers: async (): Promise<User[]> => {
    await delay(500); // Simulate network delay
    return getTopUsers(5);
  },
  
  // Get trending posts (posts with most comments)
  getTrendingPosts: async (): Promise<Post[]> => {
    await delay(700); // Simulate network delay
    return getTrendingPosts();
  },
  
  // Get feed posts (newest posts)
  getFeedPosts: async (): Promise<Post[]> => {
    await delay(600); // Simulate network delay
    return getFeedPosts();
  }
};
