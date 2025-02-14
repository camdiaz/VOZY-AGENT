import openai
from app.config import OPENAI_API_KEY

def transcribe_audio(audio_file):
    openai.api_key = OPENAI_API_KEY
    response = openai.Audio.transcribe("whisper-1", audio_file)
    return response['text']
