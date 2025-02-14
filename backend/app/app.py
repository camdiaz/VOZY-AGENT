from flask import Flask, jsonify
from .routes import main_bp, transcribe_bp, chat_bp, report_issue_bp, check_status_bp
from .database import db
from .config import DATABASE_URL

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Register Blueprints
app.register_blueprint(main_bp)
app.register_blueprint(transcribe_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(report_issue_bp)
app.register_blueprint(check_status_bp)

@app.route("/")
def home():
    return "Vozy Agent Backend is running!", 200


@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found", "status": 404}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error", "status": 500}), 500

if __name__ == "__main__":
    app.run(debug=True)
