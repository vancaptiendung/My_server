CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password_hash TEXT,
  user_role TEXT,
);

CREATE TABLE refresh_tokens (
  id TEXT PRIMARY KEY,
  user_id INTEGER,
  token TEXT,
  expires_at DATETIME,
  revoked INTEGER DEFAULT 0,
  user_agent TEXT,
  ip TEXT
);