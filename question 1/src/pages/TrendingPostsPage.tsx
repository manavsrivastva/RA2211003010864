import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import { Post } from '../types';
import { api } from '../api/api';

const TrendingPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await api.getTrendingPosts();
        
        // Find the maximum number of comments
        const maxComments = Math.max(...data.map(post => post.commentsCount));
        
        // Filter posts with the maximum number of comments
        const trendingPosts = data.filter(post => post.commentsCount === maxComments);
        
        setPosts(trendingPosts);
        setFilteredPosts(trendingPosts);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(post => 
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Trending Posts
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        Posts with the highest number of comments
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search posts by content or username..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {loading ? (
        <Loading message="Loading trending posts..." />
      ) : (
        <>
          {filteredPosts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" color="text.secondary">
                {searchTerm ? 'No posts match your search criteria' : 'No trending posts available'}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredPosts.map((post) => (
                <Grid item xs={12} key={post.id}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default TrendingPostsPage;
