import { Box, Container } from '@mui/material';
import Header from '../Header';
import ChatInterface from '../ChatInterface';

function MainView() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      <Header />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <ChatInterface />
      </Container>
    </Box>
  );
}

export default MainView;
