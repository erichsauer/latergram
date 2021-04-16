DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE users (
  github_user_name TEXT NOT NULL PRIMARY KEY,
  github_photo_url TEXT NOT NULL
);

CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  image_url TEXT NOT NULL,
  user_name TEXT REFERENCES users(github_user_name),
  caption TEXT,
  tags TEXT
);

--@list figure out array of strings

CREATE TABLE comments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  comment_by TEXT REFERENCES users(github_user_name),
  post BIGINT REFERENCES posts(id),
  comment TEXT NOT NULL
)
