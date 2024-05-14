CREATE DATABASE leddit;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password_digest TEXT,
    email TEXT UNIQUE
);

CREATE TABLE servers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    server_code TEXT,
    server_url TEXT UNIQUE
);

ALTER TABLE servers ADD COLUMN server_url TEXT UNIQUE;
ALTER TABLE servers DROP COLUMN server_url;

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT,
    user_id INTEGER NOT NULL,
    server_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (server_id) REFERENCES servers (id) ON DELETE CASCADE
);

INSERT INTO servers (name, server_code, server_url) VALUES ($1, $2, $3); ['name', `#123`,`/${serverUrl}`]
INSERT INTO users (username, email, password_digest) VALUES ($1, $2, $3); ['username', 'email', 'hashed_password']
INSERT INTO comments (content, user_id, server_id) values ($1, $2, $3); ['TEXT', 'users.id', 'servers.id']