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
};

const saveFavorite = function(callback) {
  // save movie to favorites in the database
};

const deleteFavorites = function(callback) {
  // delete a movie from favorites in the database
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorites
};