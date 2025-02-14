import React from 'react';
import { 
  Paper, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Box,
  Button,
  Stack
} from '@mui/material';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Asistente Virtual con LLM",
      description: "Sistema inteligente que aprende y mejora con cada interacción",
      icon: <HeadsetMicIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      title: "Procesamiento de Voz",
      description: "Transcripción automática y respuestas por voz natural",
      icon: <RecordVoiceOverIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      title: "Gestión Automática",
      description: "Resolución instantánea de consultas frecuentes",
      icon: <AutorenewIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      title: "Sistema de Tickets",
      description: "Seguimiento y gestión de incidencias automatizado",
      icon: <ConfirmationNumberIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    }
  ];

  return (
    <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
      <Stack spacing={4}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" color="primary" gutterBottom fontWeight="bold">
            VOZY Asistente Virtual
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Sistema Inteligente de Atención al Cliente
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                height: '100%',
                bgcolor: 'background.default',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}>
                <CardContent>
                  <Stack spacing={2} alignItems="center">
                    {feature.icon}
                    <Typography variant="h6" color="secondary">
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary" textAlign="center">
                      {feature.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="contained" 
            color="secondary"
            size="large"
            onClick={() => navigate('/transcribe')}
            startIcon={<HeadsetMicIcon />}
          >
            Iniciar Asistente Virtual
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

export default Home;
