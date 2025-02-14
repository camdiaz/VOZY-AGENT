from flask import Blueprint, jsonify

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return jsonify({
        "status": "running",
        "version": "1.0",
        "available_endpoints": {
            "POST /chat": "Chat with the AI agent",
            "POST /transcribe": "Transcribe audio",
            "POST /report": "Report a new incident",
            "GET /status": "Check incident status"
        }
    })
