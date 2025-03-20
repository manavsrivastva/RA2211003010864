export interface User {
  id: number;
  username: string;
  name: string;
  avatar: string;
  postCount: number;
}

export interface Post {
  id: number;
  userId: number;
  username: string;
  userAvatar: string;
  content: string;
  image: string;
  commentsCount: number;
  timestamp: string | Date;
}
