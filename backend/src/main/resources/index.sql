-- INITIALIZATION  --
CREATE TABLE IF NOT EXISTS users
(
    id       SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS projects
(
    id           SERIAL PRIMARY KEY,
    title        VARCHAR(255),
    created_at   TIMESTAMP DEFAULT NOW(),
    authenticated_only    BOOLEAN,
    hidden_root_folder_id  INT
);

CREATE TABLE IF NOT EXISTS code_snippet
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    content     TEXT,
    created_at  TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP DEFAULT NOW(),
    folder_id   INT,
    data_version INT
);


CREATE TABLE IF NOT EXISTS change_operation
(
    id               SERIAL PRIMARY KEY,
    code_snippet_id  INT,
    data_version     INT,
    operation        TEXT,
    start_index      INT,
    end_index        INT,
    original_content TEXT
);

CREATE TABLE IF NOT EXISTS folders
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    parent     INT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (parent) REFERENCES folders (id)
);

CREATE TABLE IF NOT EXISTS file_locks
(
    id              SERIAL PRIMARY KEY,
    file_id         INT NOT NULL,
    user_session_id VARCHAR(255) NOT NULL
);

-- INSERTS  --
INSERT INTO users (username, password)
VALUES ('user1', 'password1'),
       ('user2', 'password2'),
       ('admin1', 'adminpassword1'),
       ('admin2', 'adminpassword2');

INSERT INTO projects (title, authenticated_only, hidden_root_folder_id)
VALUES ('Session 1', true, 1),
       ('Session 2', false, 2),
       ('Session 3', true, 3);

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
