from flask import Blueprint, request, jsonify
from app.models.incident import Incident
from app.database import db

check_status_bp = Blueprint('check_status', __name__)

@check_status_bp.route('/status', methods=['GET'])
def check_status():
    incident_id = request.args.get('incident_id')
    incident = db.session.get(Incident, incident_id)
    if incident:
        return jsonify({"status": incident.status})
    return jsonify({"error": "Incident not found"}), 404
