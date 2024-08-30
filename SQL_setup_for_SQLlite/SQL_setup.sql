-- schema.sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    avatar TEXT DEFAULT 'default_avatar.png'
);

CREATE TABLE games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player1_id INTEGER,
    player2_id INTEGER,
    result TEXT,
    date_played DATETIME DEFAULT CURRENT_TIMESTAMP,
    moves TEXT,  -- Store moves as a JSON string or PGN format
    FOREIGN KEY (player1_id) REFERENCES users(id),
    FOREIGN KEY (player2_id) REFERENCES users(id)
);

