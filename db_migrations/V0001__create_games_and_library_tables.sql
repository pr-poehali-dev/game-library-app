CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  rawg_id INTEGER UNIQUE,
  title VARCHAR(500) NOT NULL,
  title_ru VARCHAR(500),
  slug VARCHAR(500),
  description TEXT,
  description_ru TEXT,
  cover_image TEXT,
  background_image TEXT,
  release_date DATE,
  rating DECIMAL(3,2),
  rating_count INTEGER DEFAULT 0,
  metacritic INTEGER,
  platforms TEXT[],
  genres TEXT[],
  developers TEXT[],
  publishers TEXT[],
  price DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_games_title ON games(title);
CREATE INDEX IF NOT EXISTS idx_games_platforms ON games USING GIN(platforms);
CREATE INDEX IF NOT EXISTS idx_games_genres ON games USING GIN(genres);
CREATE INDEX IF NOT EXISTS idx_games_rating ON games(rating DESC);

CREATE TABLE IF NOT EXISTS user_library (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  game_id INTEGER NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, game_id)
);

CREATE INDEX IF NOT EXISTS idx_user_library_user ON user_library(user_id);