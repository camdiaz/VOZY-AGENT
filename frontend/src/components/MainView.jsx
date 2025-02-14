import React, { useState, useEffect } from 'react';
import { 
  Paper,
  Typography,
  Box,
  CircularProgress 
} from '@mui/material';
import apiServices from '../services/api';

const MainView = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [sessionId] = useState(Date.now().toString());

  const handleAudioInput = async (audioBlob) => {
    setLoading(true);
    
    const userMessage = {
      type: 'user',
      content: 'Procesando audio...',
      timestamp: new Date(),
      audioBlob,
      status: 'processing',
      sessionId
    };
    
    setConversation(prev => [...prev, userMessage]);

    try {
      const transcriptionResponse = await apiServices.transcribeAudio(audioBlob);
      
      if (!transcriptionResponse) {
        throw new Error('No se recibió respuesta del servidor');
      }

      const updatedUserMessage = {
        ...userMessage,
        content: transcriptionResponse.text,
        status: 'completed',
        transcription: transcriptionResponse.text
      };

      // Actualizar mensaje del usuario
      setConversation(prev => 
        prev.map(msg => 
          msg === userMessage ? updatedUserMessage : msg
        )
      );

      // Agregar respuesta del bot
      const botResponse = {
        type: 'bot',
        content: transcriptionResponse.botResponse,
        timestamp: new Date(),
        ticketNumber: transcriptionResponse.ticketNumber,
        sessionId
      };

      // Guardar la conversación
      await apiServices.saveConversation({
        userMessage: updatedUserMessage,
        botResponse,
        sessionId
      });

      setConversation(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error procesando audio:', error);
      setConversation(prev => 
        prev.map(msg => 
          msg === userMessage 
            ? {
                ...msg,
                content: 'Error al procesar el audio. Por favor, intente nuevamente.',
                status: 'error'
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // ... resto del código del componente MainView (renderizado) ...
};

export default MainView;
