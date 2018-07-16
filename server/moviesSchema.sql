CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE movies (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title TEXT,
  rating TEXT,
  poster TEXT,
  releasedate TEXT,
  comment TEXT
);
