import openai
from app.config import OPENAI_API_KEY

def get_llm_response(prompt):
    openai.api_key = OPENAI_API_KEY
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "Eres un asistente útil."},
                  {"role": "user", "content": prompt}]
    )
    return response['choices'][0]['message']['content']
