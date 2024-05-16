-- Seed data for users table
INSERT INTO users (username, password_digest, email) VALUES
('JESUS', '$2b$10$XNCXDWVSERWcXcCyp2OYkusBopVnplqS/fmeu0SdeOnhjnrAp19kO', 'leo@com'),
('user2', '$2b$10$XNCXDWVSERWcXcCyp2OYkusBopVnplqS/fmeu0SdeOnhjnrAp19kO', 'leo@com2'),
('user3', '$2b$10$XNCXDWVSERWcXcCyp2OYkusBopVnplqS/fmeu0SdeOnhjnrAp19kO', 'leo@com3'),
('user4', '$2b$10$XNCXDWVSERWcXcCyp2OYkusBopVnplqS/fmeu0SdeOnhjnrAp19kO', 'leo@com4'),
('user5', '$2b$10$XNCXDWVSERWcXcCyp2OYkusBopVnplqS/fmeu0SdeOnhjnrAp19kO', 'leo@com5');

-- Seed data for servers table
INSERT INTO servers (name, users_id, server_url, b_color, about, main_image, text_color) VALUES
('dark souls', 1, 'l/dark souls', '#000000', 'This server is about dark souls', 'https://www.pluggedin.com/wp-content/uploads/2020/01/Dark-Souls-III-review-image638x366-1024x587.jpeg', '#ffffff'),
('halo 3', 2, 'l/halo', '#062759', 'This server is about halo 3', 'https://i.ytimg.com/vi/VYLgqx3HOe0/maxresdefault.jpg' , '#ffffff'),
('nature', 3, 'l/nature', '', 'This server is about all things nature', 'https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2022/01/good-nature-homepage-hero_2-1280x640.jpg' ,'#000000');

-- Seed data for content_for_servers table
INSERT INTO content_for_servers (content, servercode_id, image_url, title, user_id, user_name) VALUES
('It be that way!',1, 'https://i0.wp.com/ssbmtextures.com/wp-content/uploads/2021/03/youddied-e27f576e.png?fit=528%2C528&ssl=1', 'My first Run', 1, 'user1'),
('I cant take this bloody boss!',1, 'https://static.wikia.nocookie.net/villains/images/4/4c/Smough_Render.png/revision/latest?cb=20190307032121', 'Smough', 2, 'user2'),
('WARTHOG RUNNNN',2, 'https://i.ytimg.com/vi/z4rqpf4wrTo/maxresdefault.jpg', 'Best moment in the game!', 3, 'user3'),
('HOLY',1, 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/09/Gwynevere-Dark-Souls.jpg', 'My goddess', 1, 'user1'),
('This is my view from the hike i went on today!',3, 'https://www.naturehike.com/cdn/shop/files/NHIKE_cloudup-bokrivier-21-67_d62bf761-0eb9-4bed-ba95-4d700329a5b2_958x.jpg?v=1688989672', 'Beautiful', 2, 'user2'),
('so badass!',2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXCAMEcRWU7b8z-m9u_5nqkpaaZO05xfF8H_jvZ5AhSg&s', 'Back2Back', 3, 'user3'),
('another day, another view',3, 'https://media.timeout.com/images/105808064/750/562/image.jpg', 'HOW COOL', 1, 'user1'),
('this is the best place for a hike! JK',3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7c8QFxXxgjqVLUlsHZlnaLle_HL3GKrc3h0tTnL-Tqw&s', 'Hate it when it rains', 2, 'user2');

-- Seed data for comments table
INSERT INTO comments (content, user_id, server_id, post_id) VALUES
('Comment 1 on Content 1 for Server A', 2, 1, 1),
('Comment 2 on Content 1 for Server A', 3, 1, 1),
('Comment 1 on Content 1 for Server B', 1, 2, 1);

-- Seed data for votes table
INSERT INTO votes (vote, who_voted, contents_id, server_name) VALUES
(1, 2, 1, 'dark souls'),
(-1, 3, 1, 'halo 3'),
(1, 1, 3, 'nature');

-- Seed data for favourites table
INSERT INTO favourites (user_id, server_id, server_name) VALUES
(1, 1, 'dark souls'),
(2, 2, 'halo 3'),
(3, 3, 'nature');