import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Container } from '@mui/material';
import { api } from '../api/api';
import { User } from '../types';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';

const TopUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchTopUsers = async () => {
      setLoading(true);
      try {
        const data = await api.getTopUsers();
        // Ensure we only display the top 5 users
        setUsers(data.slice(0, 5));
        setFilteredUsers(data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching top users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Top Users
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Users with the highest number of posts
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users by name or username..."
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
      ) : (
        <>
          {filteredUsers.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" color="text.secondary">
                {searchTerm ? 'No users match your search criteria' : 'No users available'}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredUsers.map((user, index) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <UserCard user={user} rank={index + 1} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default TopUsersPage;
