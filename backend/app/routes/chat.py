from flask import Blueprint, request, jsonify
from app.services.llm_service import get_llm_response

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get('message')
    response = get_llm_response(user_input)
    return jsonify({"response": response})
