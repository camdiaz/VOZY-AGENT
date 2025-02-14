from flask import Blueprint, request, jsonify
from app.database import db
from app.models.incident import Incident

report_issue_bp = Blueprint('report_issue', __name__)

@report_issue_bp.route('/report', methods=['POST'])
def report_issue():
    data = request.get_json()
    new_incident = Incident(user_id=data['user_id'], description=data['description'])
    db.session.add(new_incident)
    db.session.commit()
    return jsonify({"message": "Incident reported", "incident_id": str(new_incident.id)})
