import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  Collapse,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import apiService from '../services/api';

function HistoryView() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [currentAudio, setCurrentAudio] = useState({ id: null, playing: false });

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const history = await apiService.getConversationHistory();
      setConversations(history);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = (audioUrl, messageId) => {
    if (currentAudio.id === messageId && currentAudio.playing) {
      currentAudio.audio?.pause();
      setCurrentAudio({ id: null, playing: false });
    } else {
      if (currentAudio.audio) {
        currentAudio.audio.pause();
      }
      const audio = new Audio(audioUrl);
      audio.onended = () => setCurrentAudio({ id: null, playing: false });
      audio.play();
      setCurrentAudio({ id: messageId, playing: true, audio });
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.transcription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.ticketNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, minHeight: '80vh' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Historial de Conversaciones
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por transcripción o número de ticket..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2 }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ width: '100%' }}>
          {filteredConversations.map((conv, index) => (
            <React.Fragment key={conv.id}>
              <ListItem
                sx={{
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" color="primary">
                      {new Date(conv.timestamp).toLocaleString()}
                    </Typography>
                    {conv.ticketNumber && (
                      <Chip
                        label={`Ticket #${conv.ticketNumber}`}
                        color="secondary"
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </Box>
                  <IconButton
                    onClick={() => setExpandedId(expandedId === conv.id ? null : conv.id)}
                  >
                    {expandedId === conv.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                <Collapse in={expandedId === conv.id}>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Transcripción:
                    </Typography>
                    <Typography paragraph>{conv.transcription}</Typography>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Respuesta:
                    </Typography>
                    <Typography paragraph>{conv.botResponse}</Typography>

                    {conv.audioUrl && (
                      <IconButton
                        onClick={() => handlePlayAudio(conv.audioUrl, conv.id)}
                        color="primary"
                      >
                        {currentAudio.id === conv.id && currentAudio.playing ? 
                          <PauseIcon /> : <PlayArrowIcon />}
                      </IconButton>
                    )}
                  </Box>
                </Collapse>
              </ListItem>
              {index < filteredConversations.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default HistoryView;
