import React, { useState, useEffect } from 'react';
import { 
  Box, 
  IconButton, 
  CircularProgress, 
  Typography,
  useTheme 
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { keyframes } from '@mui/system';

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

const AudioRecorder = ({ onAudioReady, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        onAudioReady(audioBlob);
        setRecordingTime(0);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>
      <Box sx={{ 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {isRecording && (
          <Box sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: `${pulseAnimation} 2s infinite`
          }}/>
        )}
        
        <IconButton
          color="primary"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          sx={{
            width: { xs: 64, sm: 72 },
            height: { xs: 64, sm: 72 },
            bgcolor: isRecording ? 'error.main' : 'primary.main',
            color: 'background.paper',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: isRecording ? 'error.dark' : 'primary.dark',
              transform: 'scale(1.1)',
            },
            animation: isRecording ? `${pulseAnimation} 1.5s infinite` : 'none',
            boxShadow: `0 0 20px ${isRecording ? 
              theme.palette.error.main : theme.palette.primary.main}40`,
            '&.Mui-disabled': {
              bgcolor: 'action.disabledBackground',
            }
          }}
        >
          {isProcessing ? (
            <CircularProgress 
              size={32}
              thickness={5}
              sx={{ color: 'background.paper' }}
            />
          ) : isRecording ? (
            <StopIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}/>
          ) : (
            <MicIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}/>
          )}
        </IconButton>
      </Box>

      {isRecording && (
        <Typography 
          variant="caption" 
          color="error.main"
          sx={{ 
            animation: `${pulseAnimation} 2s infinite`,
            fontSize: '0.9rem',
            fontWeight: 500
          }}
        >
          {formatTime(recordingTime)}
        </Typography>
      )}

      <Typography 
        variant="body2" 
        color={isRecording ? 'error.main' : 'text.secondary'}
        sx={{ 
          fontSize: { xs: '0.8rem', sm: '0.9rem' },
          fontWeight: 500
        }}
      >
        {isProcessing ? 'Procesando...' : 
         isRecording ? 'Grabando' : 
         'Presiona para hablar'}
      </Typography>
    </Box>
  );
};

export default AudioRecorder;
