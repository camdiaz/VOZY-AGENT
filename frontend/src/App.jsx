import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme/theme';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh'
        }}>
          <Navbar />
          <Box sx={{ 
            display: 'flex', 
            flex: 1,
            position: 'relative',
            pt: { xs: 7, md: 0 }
          }}>
            <Sidebar />
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1,
                p: 3,
                transition: 'margin 0.3s ease',
                bgcolor: 'background.default'
              }}
            >
              <AppRoutes />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
