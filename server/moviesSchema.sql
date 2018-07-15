CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE movies (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title TEXT,
  genreid INTEGER,
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

CREATE TABLE genres (
  localid INTEGER PRIMARY KEY AUTO_INCREMENT,
  genreid INTEGER,
  genre TEXT
);

