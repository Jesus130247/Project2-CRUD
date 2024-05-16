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
    users_id  INTEGER,
    server_url TEXT UNIQUE,
    b_color TEXT,
    about TEXT,
    main_image TEXT,
    text_color TEXT
);

CREATE TABLE content_for_servers (
    content_id SERIAL PRIMARY KEY,
    content TEXT,
    serverCode_id INTEGER,
    image_url TEXT,
    title TEXT,
    user_id INTEGER,
    user_name TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (serverCode_id) REFERENCES servers (serverCode_id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT,
    user_id INTEGER NOT NULL,
    server_id INTEGER NOT NULL,
    post_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (server_id) REFERENCES servers (serverCode_id) ON DELETE CASCADE
);


CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    vote INTEGER,
    who_voted INTEGER,
    contents_id INTEGER,
    server_name TEXT,
    UNIQUE(who_voted, contents_id),
    FOREIGN KEY (who_voted) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (server_id) REFERENCES servers (serverCode_id) ON DELETE CASCADE
);

CREATE TABLE favourites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    favourite TEXT
);

-- psql to select everything, using join... cut out last part to dodge users
`
SELECT * FROM votes 
FULL OUTER JOIN comments 
ON votes.who_voted = comments.user_id
FULL OUTER JOIN content_for_servers 
ON comments.user_id = content_for_servers.user_id
FULL OUTER JOIN servers
ON content_for_servers.serverCode_id = servers.servercode_id
WHERE server.name = 'server 1';
`
`
FULL OUTER JOIN users
ON servers.users_id = users.id;

`


-- new PSQL (once updated in render, add to the correct location)

-- done since last commmit:
-- vote buttons work
-- make it so up/down voting stays after refresh
-- make it so a user can only up/down vote once
-- made it so you can replace your vote
-- deleting and editing servers -> only for user that created server

-- #working on:
-- favourites
-- favicon
-- style everything

-- #extra if i have time
-- make it so users can comment on comments of posts
-- making it so that users can only edit/delete a post on a server or the server itself if they are "admin" of that server
-- make it so that users can add friends 
-- make it so that users upload images, and not urls (takes adjusting the form in personal_server.ejs)
-- make it so that content on servers can only be edited by the user that uploaded it, and by admin users

