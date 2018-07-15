var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var axios = require('axios');
var db = require('./database.js');
var config = require('./config');
var cors = require('cors');
var app = express();
var apiHelpers = require('./apiHelpers.js');


app.use(bodyParser.json());
app.use(cors())

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));


app.get('/search', function(req, res) {

  axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=${config.API_KEY}`)
    .then((badMovies) => {
      res.send(badMovies.data.results);
    })
    .catch((err) => {
      console.error('there was an error getting the bad movies master list', err)
    })

});

app.get('/genre/search', function(req, res) {
    // get the search genre
    let genre = req.query.genreName;
    let id = req.query.id;
    axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}&sort_by=vote_average.asc&api_key=${config.API_KEY}`)
      .then((genreFiltered) => {
        res.send(genreFiltered.data.results);
      })
      .catch((err) => {
        console.log('there was an error getting the genre filtered movies', err);
      })
}); 

app.get('/genres', function(req, res) {
    // make an axios request to get the list of official genres
  axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${config.API_KEY}`)
      .then((genreResponse) => {
        res.send(genreResponse.data.genres)
      })
      .catch((err) => {
        console.error('there was error sending the genre request from the server', err)
      })
});

//internal request to my db
app.get('/favorites', function(req, res) {
  db.getAllFavorites((err, favorites) => {
    if (err) {
      console.error('there was an error getting your favorites from the database', err)
    } else {
      res.send(favorites);
    }
  })
})



// POSTS
app.post('/save', function(req, res) {
  db.saveFavorite(req.body);
  res.send()
  
});

app.post('/delete', function(req, res) {
  db.deleteFavorites(req.body, (err, success) => {
    if (err) {
      console.error('there was an error delting this item', err);
    }
  });
  res.send()
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
