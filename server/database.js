const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
connection.connect((err) => {
  if (err) {
    console.error('there was an error connecting to the db:', err);
  } else {
    console.log(`connected as id ${connection.threadId}`)
  }
});

const getAllFavorites = function(callback) {
  // get favorites from the database
  connection.query('SELECT * FROM movies', (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      let favoriteMovies = [];
      results.forEach((result) => {
        let aMovie = {
          dbId: result.id,
          title: result.title,
          vote_average: result.rating,
          poster_path: result.poster,
          release_date: result.releasedate
        };
        favoriteMovies.push(aMovie)
      })
      callback(null, favoriteMovies)
    }
  })
};

const saveFavorite = function(params, callback) {
  // save movie to favorites in the database
  connection.query('INSERT INTO movies SET ?', params, (err, results, fields) => {
    if (err) {
      console.log('there was an error inserting this movie into the db', err)
    }
  })
};

const deleteFavorites = function(params, callback) {
  // delete a movie from favorites in the database
  console.log('params passed to delete', params)
  let argToDel = {id: params.dbId}
  console.log('arg to delete', argToDel)
  connection.query('DELETE FROM movies WHERE ?', argToDel, (err, results, fields) => {
    if (err) {
      callback(err, null);
    }
  })
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorites
};