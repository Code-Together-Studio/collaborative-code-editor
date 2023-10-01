-- INITIALIZATION  --
CREATE TABLE users
(
    id       SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role     VARCHAR(255)
);

CREATE TABLE sessions
(
    id           SERIAL PRIMARY KEY,
    title        VARCHAR(255),
    code_snippet TEXT,
    created_at   TIMESTAMP DEFAULT NOW(),
    is_public    BOOLEAN,
    root_folder  INT
);

CREATE TABLE sessions_users
(
    session_id INT,
    user_id    INT,
    PRIMARY KEY (session_id, user_id),
    FOREIGN KEY (session_id) REFERENCES sessions (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE code_snippet
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    content     TEXT,
    created_at  TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP DEFAULT NOW(),
    folder_id   INT
);

CREATE TABLE folders
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    parent     INT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (parent) REFERENCES folders (id)
);

-- INSERTS  --
INSERT INTO users (username, password, role)
VALUES ('user1', 'password1', 'user'),
       ('user2', 'password2', 'user'),
       ('admin1', 'adminpassword1', 'admin'),
       ('admin2', 'adminpassword2', 'admin');

INSERT INTO sessions (title, code_snippet, is_public, root_folder)
VALUES ('Session 1', 'Code for Session 1', true, 1),
       ('Session 2', 'Code for Session 2', false, 2),
       ('Session 3', 'Code for Session 3', true, 3);

INSERT INTO sessions_users (session_id, user_id)
VALUES (1, 1),
       (1, 2),
       (2, 2),
       (3, 1),
       (3, 3);

INSERT INTO folders (name, parent)
VALUES ('Root Folder', NULL);

INSERT INTO folders (name, parent)
VALUES ('Subfolder 1', 1);

INSERT INTO folders (name, parent)
VALUES ('Subfolder 2', 1);

INSERT INTO code_snippet (name, content, folder_id)
VALUES ('Snippet 1', 'Code for Snippet 1', 1),
       ('Snippet 2', 'Code for Snippet 2', 2),
       ('Snippet 3', 'Code for Snippet 3', 3);

