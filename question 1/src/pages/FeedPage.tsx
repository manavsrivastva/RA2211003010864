import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, Button, TextField, InputAdornment, Grid } from '@mui/material';
import { Refresh, Search } from '@mui/icons-material';
import { api } from '../api/api';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const postsPerPage = 5;

  const fetchFeedPosts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const data = await api.getFeedPosts();
      setPosts(data);
      
      if (isRefresh) {
        // Keep the same number of displayed posts on refresh
        setDisplayedPosts(data.slice(0, page * postsPerPage));
      } else {
        setDisplayedPosts(data.slice(0, postsPerPage));
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to load feed posts. Please try again later.');
      console.error('Error fetching feed posts:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, postsPerPage]);

  useEffect(() => {
    fetchFeedPosts();
    
    // Set up auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      fetchFeedPosts(true);
    }, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [fetchFeedPosts]);

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

  const loadMorePosts = () => {
    const nextPage = page + 1;
    const nextPosts = posts.slice(0, nextPage * postsPerPage);
    setDisplayedPosts(nextPosts);
    setPage(nextPage);
  };

  const handleRefresh = () => {
    fetchFeedPosts(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            Feed
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Latest posts from all users
          </Typography>
        </div>
        <Button 
          variant="outlined" 
          onClick={handleRefresh}
          disabled={refreshing}
          startIcon={refreshing ? <Refresh /> : null}
        >
          {refreshing ? 'Refreshing...' : 'Refresh Feed'}
        </Button>
      </Box>

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
        <Loading />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {filteredPosts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" color="text.secondary">
                {searchTerm ? 'No posts match your search criteria' : 'No posts available'}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredPosts.slice(0, page * postsPerPage).map((post) => (
                <Grid item xs={12} key={post.id}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
          )}
          {filteredPosts.length > page * postsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 5 }}>
              <Button 
                variant="contained" 
                onClick={loadMorePosts}
                size="large"
              >
                Load More
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default FeedPage;
