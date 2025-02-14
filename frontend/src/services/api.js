import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api'
});

const apiService = {
  processAudioMessage: async (audioBlob, userId) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('userId', userId);

    const response = await API.post('/asistente', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  getConversationHistory: async (userId) => {
    const response = await API.get(`/historial/${userId}`);
    return response.data;
  },

  playAudioResponse: async (audioUrl) => {
    const audio = new Audio(audioUrl);
    return audio.play();
  }
};

export default apiService;
