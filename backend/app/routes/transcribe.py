from flask import Blueprint, request, jsonify
from app.services.whisper_service import transcribe_audio

transcribe_bp = Blueprint('transcribe', __name__)

@transcribe_bp.route('/transcribe', methods=['POST'])
def transcribe():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['file']
    text = transcribe_audio(file)
    return jsonify({"transcription": text})
