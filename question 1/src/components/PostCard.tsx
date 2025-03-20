import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Avatar, CardHeader, Chip, IconButton } from '@mui/material';
import { ChatBubbleOutline, Favorite, Share } from '@mui/icons-material';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Format the timestamp
  const formatTimestamp = (timestamp: string | Date): string => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  // Extract hashtags from content
  const extractHashtags = (content: string): string[] => {
    const hashtagRegex = /#(\w+)/g;
    const matches = content.match(hashtagRegex);
    return matches ? matches : [];
  };

  const hashtags = extractHashtags(post.content);
  const contentWithoutHashtags = post.content.replace(/#\w+/g, '').trim();

  return (
    <Card sx={{ mb: 3, maxWidth: '100%', borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        avatar={
          <Avatar 
            src={post.userAvatar} 
            alt={post.username}
            sx={{ width: 50, height: 50, border: '2px solid #1976d2' }}
          />
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            @{post.username}
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {formatTimestamp(post.timestamp)}
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
          {contentWithoutHashtags}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {hashtags.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              size="small" 
              color="primary" 
              variant="outlined"
              sx={{ borderRadius: 1 }}
            />
          ))}
        </Box>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ 
          maxHeight: 500,
          objectFit: 'cover',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)'
          }
        }}
        image={post.image}
        alt="Post image"
      />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="primary" aria-label="like post">
            <Favorite />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <ChatBubbleOutline sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" fontWeight="bold">
              {post.commentsCount} comments
            </Typography>
          </Box>
        </Box>
        <IconButton color="primary" aria-label="share post">
          <Share />
        </IconButton>
      </Box>
    </Card>
  );
};

export default PostCard;
