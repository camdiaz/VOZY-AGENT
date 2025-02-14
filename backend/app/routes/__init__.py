from flask import Blueprint

main_bp = Blueprint('main', __name__)
transcribe_bp = Blueprint('transcribe', __name__)
chat_bp = Blueprint('chat', __name__)
report_issue_bp = Blueprint('report_issue', __name__)
check_status_bp = Blueprint('check_status', __name__)

from . import main, transcribe, chat, report_issue, check_status

__all__ = ['chat_bp', 'check_status_bp', 'report_issue_bp', 'transcribe_bp']