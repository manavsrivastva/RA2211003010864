import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import Navbar from './components/Navbar';
import TopUsersPage from './pages/TopUsersPage';
import TrendingPostsPage from './pages/TrendingPostsPage';
import FeedPage from './pages/FeedPage';
import ErrorBoundary from './components/ErrorBoundary';

// Create a theme
function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Create a theme based on the dark mode state
  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#dc004e',
        },
        background: {
          default: darkMode ? '#121212' : '#f5f5f5',
          paper: darkMode ? '#1e1e1e' : '#ffffff',
        },
      },
      typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ].join(','),
      },
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
            },
          },
        },
      },
    }),
  [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
              <Routes>
                <Route path="/" element={<TopUsersPage />} />
                <Route path="/trending" element={<TrendingPostsPage />} />
                <Route path="/feed" element={<FeedPage />} />
              </Routes>
            </Container>
            <Box 
              component="footer" 
              sx={{ 
                py: 3, 
                bgcolor: 'background.paper', 
                textAlign: 'center',
                borderTop: '1px solid',
                borderColor: 'divider'
              }}
            >
              Social Media Analytics &copy; {new Date().getFullYear()}
            </Box>
          </Box>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
