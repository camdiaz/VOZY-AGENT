from app.database import db
from sqlalchemy.dialects.postgresql import JSONB, UUID
import uuid

class Incident(db.Model):
    __tablename__ = 'incidents'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    status = db.Column(db.String, default='open')
    incident_data = db.Column(JSONB)  # Renamed from metadata
