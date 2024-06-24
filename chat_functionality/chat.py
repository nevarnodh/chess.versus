from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models import db, ChatMessage

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/chat/send', methods=['POST'])
@login_required
def send_message():
    data = request.get_json()
    message = ChatMessage(user_id=current_user.id, game_id=data['game_id'], content=data['content'])
    db.session.add(message)
    db.session.commit()
    return jsonify({'message': 'Message sent successfully.'})

@chat_bp.route('/chat/<game_id>', methods=['GET'])
@login_required
def get_messages(game_id):
    messages = ChatMessage.query.filter_by(game_id=game_id).all()
    return jsonify([msg.to_dict() for msg in messages])

# Add this blueprint to your main app
app.register_blueprint(chat_bp, url_prefix='/api')

