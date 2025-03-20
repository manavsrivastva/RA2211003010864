import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  useMediaQuery, 
  useTheme, 
  Menu, 
  MenuItem,
  Badge
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, Notifications, DarkMode, LightMode } from '@mui/icons-material';

interface NavbarProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, darkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Social Media Analytics
        </Typography>
        
        {isMobile ? (
          <Box>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem 
                onClick={handleClose} 
                component={Link} 
                to="/"
                selected={isActive('/')}
              >
                Top Users
              </MenuItem>
              <MenuItem 
                onClick={handleClose} 
                component={Link} 
                to="/trending"
                selected={isActive('/trending')}
              >
                Trending Posts
              </MenuItem>
              <MenuItem 
                onClick={handleClose} 
                component={Link} 
                to="/feed"
                selected={isActive('/feed')}
              >
                Feed
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/"
              variant={isActive('/') ? "contained" : "text"}
              sx={{ 
                borderRadius: 2,
                px: 2,
                backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.15)' : 'transparent'
              }}
            >
              Top Users
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/trending"
              variant={isActive('/trending') ? "contained" : "text"}
              sx={{ 
                borderRadius: 2,
                px: 2,
                backgroundColor: isActive('/trending') ? 'rgba(255, 255, 255, 0.15)' : 'transparent'
              }}
            >
              Trending Posts
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/feed"
              variant={isActive('/feed') ? "contained" : "text"}
              sx={{ 
                borderRadius: 2,
                px: 2,
                backgroundColor: isActive('/feed') ? 'rgba(255, 255, 255, 0.15)' : 'transparent'
              }}
            >
              Feed
            </Button>
          </Box>
        )}
        
        <Box sx={{ display: 'flex', ml: 2 }}>
          <IconButton color="inherit" sx={{ ml: 1 }}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={toggleDarkMode} sx={{ ml: 1 }}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
