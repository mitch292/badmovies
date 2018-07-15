CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE movies (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title TEXT,
  genre TEXT,
  rating INTEGER
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  movieid INTEGER,
  FOREIGN KEY (movieid)
    REFERENCES movies(id)
    ON DELETE CASCADE
);

