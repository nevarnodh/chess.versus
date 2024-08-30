# app.py
from flask import Flask, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chessversus.db'
db = SQLAlchemy(app)

# Define User and Game models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False)
    avatar = db.Column(db.String(150), nullable=False, default='default_avatar.png')

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player1_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    player2_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    result = db.Column(db.String(50))
    date_played = db.Column(db.DateTime, default=db.func.current_timestamp())
    moves = db.Column(db.Text)  # Could store as PGN or JSON

# Routes for registration, login, and game handling
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login failed"})
    session['user_id'] = user.id
    return jsonify({"message": "Login successful"})

@app.route('/game', methods=['POST'])
def create_game():
    data = request.get_json()
    game = Game(player1_id=data['player1_id'], player2_id=data.get('player2_id'), result=data['result'], moves=data['moves'])
    db.session.add(game)
    db.session.commit()
    return jsonify({"message": "Game recorded successfully"})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)

