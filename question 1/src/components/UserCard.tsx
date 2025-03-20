import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, LinearProgress, Tooltip } from '@mui/material';
import { User } from '../types';

interface UserCardProps {
  user: User;
  rank: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, rank }) => {
  // Calculate a normalized score for the progress bar (0-100)
  const getProgressValue = (postCount: number): number => {
    // Assuming 100 posts is the maximum reasonable value
    return Math.min(100, (postCount / 100) * 100);
  };

  return (
    <Card sx={{ 
      display: 'flex', 
      mb: 2, 
      height: '120px',
      borderRadius: 2,
      boxShadow: 3,
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: 6
      }
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        pl: 2, 
        width: '60px',
        bgcolor: rank <= 3 ? 'primary.main' : 'grey.500'
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          #{rank}
        </Typography>
      </Box>
      <CardMedia
        component="img"
        sx={{ 
          width: 90, 
          height: 90, 
          borderRadius: '50%', 
          m: 1.5,
          border: '3px solid',
          borderColor: rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? '#cd7f32' : 'primary.main'
        }}
        image={user.avatar}
        alt={user.name}
      />
      <CardContent sx={{ 
        flex: '1 0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        p: 2
      }}>
        <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" color="primary" component="div" sx={{ mb: 1 }}>
          @{user.username}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1, fontWeight: 'bold' }}>
            {user.postCount} posts
          </Typography>
          <Tooltip title={`${user.postCount} posts out of 100`}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={getProgressValue(user.postCount)} 
                sx={{ 
                  height: 8, 
                  borderRadius: 5,
                  bgcolor: 'grey.500',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: rank <= 3 ? 
                      (rank === 1 ? 'gold' : rank === 2 ? 'silver' : '#cd7f32') : 
                      'primary.main'
                  }
                }}
              />
            </Box>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
