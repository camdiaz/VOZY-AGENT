import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import ReportIcon from '@mui/icons-material/Report';

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { path: '/', text: 'Home', icon: <HomeIcon /> },
    { path: '/asistente', text: 'Asistente', icon: <ChatIcon  /> },
    { path: '/historial', text: 'Historial', icon: <ReportIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ 
      width: { xs: '100%', sm: 250 }, 
      bgcolor: 'background.paper', 
      height: '100%',
      overflowX: 'hidden'
    }}>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.path} 
            component={Link} 
            to={item.path}
            selected={location.pathname === item.path}
            onClick={isMobile ? handleDrawerToggle : undefined}
            sx={{
              color: 'text.primary',
              textDecoration: 'none',
              '&.Mui-selected': {
                bgcolor: 'background.default',
                '& .MuiListItemIcon-root': {
                  color: 'secondary.main',
                }
              },
              '&:hover': {
                bgcolor: 'background.default',
                '& .MuiListItemIcon-root': {
                  color: 'secondary.main',
                }
              }
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'secondary.main' : 'primary.main' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: location.pathname === item.path ? 600 : 400
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            mr: 2, 
            position: 'fixed',
            top: 12,
            left: 12,
            zIndex: 1200,
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'background.default',
            }
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Box component="nav">
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Mejor rendimiento en móviles
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: { xs: '80%', sm: 250 },
                bgcolor: 'background.paper'
              },
            }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Box
            sx={{
              width: 250,
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
              borderRight: 1,
              borderColor: 'divider',
              height: '100%'
            }}
          >
            {drawerContent}
          </Box>
        )}
      </Box>
    </>
  );
}

export default Sidebar;
