CREATE DATABASE leddit; -- different database created by RENDER

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password_digest TEXT,
    email TEXT UNIQUE
);

CREATE TABLE servers (
    serverCode_id SERIAL PRIMARY KEY,
    name TEXT,
    users_in TEXT,
    server_url TEXT UNIQUE
);

CREATE TABLE content_for_servers (
    id SERIAL PRIMARY KEY,
    content TEXT,
    serverCode_id INTEGER,
    image_url TEXT
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT,
    user_id INTEGER NOT NULL,
    server_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (server_id) REFERENCES servers (serverCode_id) ON DELETE CASCADE
);

-- new PSQL (once updated in render, add to the correct location)

ALTER TABLE content_for_servers ADD COLUMN user_id TEXT UNIQUE;
ALTER TABLE content_for_servers ADD COLUMN title TEXT;


-- done today:
-- made it so the user who uploads content can be identified. "uploaded by user: example"
-- made it so you can delete posts on servers

-- working on:
-- having more options when creating posts
-- make it so users can comment on posts
-- having more ui options when creating a server
-- make it os users can upvote/downvote

-- deleting and editing servers
-- blocking users from editing, deleting posts without a login. and stopping users from creating/editing/deleting servers without a login.
-- creating favourite servers: quick links to servers you like
-- making it so that users can only edit/delete a post on a server or the server itself if they are "admin" of that server

-- style everything

-- extra if i have time
-- make it so that users can add friends 
-- make it so that users upload images, and not urls (takes adjusting the form in personal_server.ejs)
-- make it so that content on servers can be editing by the user the uploaded it, and by admin users
-- make it so users can comment on comments of posts