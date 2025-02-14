import React, { useState, useEffect } from 'react';
import { 
  Paper,
  Typography,
  Box,
  Stack,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
  Fade
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { keyframes } from '@mui/system';
import AudioRecorder from '../components/AudioRecorder';
import apiService from '../services/api';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(203, 252, 0, 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(203, 252, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(203, 252, 0, 0);
  }
`;

const recordingAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

function AgentView() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [audioPlayer, setAudioPlayer] = useState({ isPlaying: false, audio: null });
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const handleAudioInput = async (audioBlob) => {
    setIsProcessing(true);
    const newMessage = {
      id: Date.now(),
      type: 'user',
      status: 'processing',
      content: 'Procesando audio...',
      timestamp: new Date()
    };

    setConversation(prev => [...prev, newMessage]);

    try {
      const response = await apiService.processAudioMessage(audioBlob);
      
      // Actualizar mensaje del usuario con transcripción
      setConversation(prev => prev.map(msg => 
        msg.id === newMessage.id ? {
          ...msg,
          status: 'complete',
          content: response.transcription,
          audioBlob
        } : msg
      ));

      // Agregar respuesta del bot
      setConversation(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        content: response.botResponse,
        audioUrl: response.audioResponse,
        ticketNumber: response.ticketNumber,
        timestamp: new Date()
      }]);

      if (response.audioResponse) {
        playAudio(response.audioResponse);
      }
    } catch (error) {
      setConversation(prev => prev.map(msg => 
        msg.id === newMessage.id ? {
          ...msg,
          status: 'error',
          content: 'Error al procesar el audio'
        } : msg
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudio = (audioUrl) => {
    if (audioPlayer.audio) {
      audioPlayer.audio.pause();
    }
    const audio = new Audio(audioUrl);
    audio.onended = () => setAudioPlayer(prev => ({ ...prev, isPlaying: false }));
    audio.play();
    setAudioPlayer({ audio, isPlaying: true });
  };

  const renderMessage = (message) => (
    <Fade in key={message.id}>
      <Box sx={{ 
        mb: 2,
        display: 'flex',
        justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
      }}>
        <Paper sx={{ 
          p: 2,
          maxWidth: '70%',
          bgcolor: message.type === 'user' ? 'primary.main' : 'secondary.main',
          color: 'white'
        }}>
          <Typography>{message.content}</Typography>
          
          {message.audioUrl && (
            <IconButton 
              size="small" 
              onClick={() => playAudio(message.audioUrl)}
              sx={{ color: 'white', mt: 1 }}
            >
              {audioPlayer.isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          )}

          {message.ticketNumber && (
            <Chip
              label={`Ticket #${message.ticketNumber}`}
              size="small"
              sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.2)' }}
            />
          )}

          <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.7 }}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </Typography>
        </Paper>
      </Box>
    </Fade>
  );

  return (
    <Paper elevation={4} sx={{ 
      p: { xs: 2, sm: 4 }, 
      minHeight: '80vh',
      position: 'relative',
      borderRadius: 4,
      bgcolor: 'background.paper'
    }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Asistente Virtual
      </Typography>

      <Box sx={{ 
        my: 4, 
        minHeight: '50vh', 
        maxHeight: '60vh',
        overflow: 'auto',
        px: 2
      }}>
        {conversation.map(renderMessage)}
      </Box>

      <Box sx={{ 
        position: 'sticky', 
        bottom: 0,
        left: 0,
        right: 0,
        py: 3,
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(8px)',
      }}>
        <AudioRecorder 
          onAudioReady={handleAudioInput}
          isProcessing={isProcessing}
        />
      </Box>
    </Paper>
  );
}

export default AgentView;
