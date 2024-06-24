from flask import Blueprint, jsonify
from models import db, Game

spectator_bp = Blueprint('spectator', __name__)

@spectator_bp.route('/games/active', methods=['GET'])
def get_active_games():
    games = Game.query.filter_by(status='active').all()
    return jsonify([game.to_dict() for game in games])

@spectator_bp.route('/games/<game_id>', methods=['GET'])
def get_game_details(game_id):
    game = Game.query.get(game_id)
    if game:
        return jsonify(game.to_dict())
    return jsonify({'error': 'Game not found'}), 404

# Add this blueprint to your main app
app.register_blueprint(spectator_bp, url_prefix='/api')

