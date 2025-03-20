import { User, Post } from '../types';

// Generate random avatar image URLs
const getRandomAvatar = (): string => {
  const avatarIds = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
  ];
  const randomId = avatarIds[Math.floor(Math.random() * avatarIds.length)];
  return `https://i.pravatar.cc/150?img=${randomId}`;
};

// Generate random post image URLs
const getRandomPostImage = (): string => {
  const imageIds = [
    '237', '238', '239', '240', '241', '242', '243', '244', '245',
    '246', '247', '248', '249', '250', '251', '252', '253', '254'
  ];
  const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
  return `https://picsum.photos/id/${randomId}/800/500`;
};

// Generate mock users
export const generateUsers = (count: number): User[] => {
  const users: User[] = [];
  
  for (let i = 1; i <= count; i++) {
    users.push({
      id: i,
      username: `user${i}`,
      name: `User ${i}`,
      avatar: getRandomAvatar(),
      postCount: Math.floor(Math.random() * 100) + 1,
    });
  }
  
  return users;
};

// Generate mock posts
export const generatePosts = (count: number, users: User[]): Post[] => {
  const posts: Post[] = [];
  const now = new Date();
  
  for (let i = 1; i <= count; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const commentsCount = Math.floor(Math.random() * 50);
    const hoursAgo = Math.floor(Math.random() * 72);
    const timestamp = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
    
    posts.push({
      id: i,
      userId: randomUser.id,
      username: randomUser.username,
      userAvatar: randomUser.avatar,
      content: `This is post #${i} from ${randomUser.name}. #socialmedia #analytics`,
      image: getRandomPostImage(),
      commentsCount,
      timestamp: timestamp.toISOString(),
    });
  }
  
  return posts;
};

// Mock data
const mockUsers = generateUsers(20);
const mockPosts = generatePosts(100, mockUsers);

// Sort users by post count (descending)
export const getTopUsers = (limit: number = 5): User[] => {
  return [...mockUsers]
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, limit);
};

// Sort posts by comments count (descending)
export const getTrendingPosts = (): Post[] => {
  return [...mockPosts]
    .sort((a, b) => b.commentsCount - a.commentsCount)
    .slice(0, 10); // Limit to top 10 trending posts
};

// Sort posts by timestamp (newest first)
export const getFeedPosts = (): Post[] => {
  return [...mockPosts]
    .sort((a, b) => {
      const dateA = typeof a.timestamp === 'string' ? a.timestamp : a.timestamp.toISOString();
      const dateB = typeof b.timestamp === 'string' ? b.timestamp : b.timestamp.toISOString();
      return dateB.localeCompare(dateA);
    });
};

export { mockUsers, mockPosts };
