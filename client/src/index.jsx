import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [],
      showFaves: false,
      genres: []
    };
    
    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getDefaultMovies = this.getDefaultMovies.bind(this);
  }

  getMovies(genre) {
    let genreArr = genre.split(',')
    let [genreId, name] = genreArr
    axios.get('/genre/search', {
      params: {
        id: genreId,
        genreName: name
      }
    })
      .then((response) => {
        this.setState({
          movies: response.data
        })
      })
      .catch((err) => {
        console.error('there was an error with the genre search', err);
      })

  }

  getDefaultMovies() {
    axios.get('/search')
      .then((response) => {
        console.log(response);
        this.setState({
          movies: response.data
        })
      })
      .catch((err) => {
        console.error('there was an error getting the master list', err);
      })
  }

  saveMovie(index) {
    // same as above but do something diff
    let movieToSave = this.state.movies[index];

    axios.post('/save', {
      title: movieToSave.title,
      rating: movieToSave.vote_average,
      poster: movieToSave.poster_path,
      releasedate: movieToSave.release_date
    })
      .then((response) => {
        axios.get('/favorites')
          .then((response) => {
            this.setState({
              favorites: response.data
            })
          })

      })
      .catch((err) => {
        console.error('there was an error saving this movie to your profile', err)
      })

  }

  deleteMovie(index) {
    // same as above but do something diff
    let movieToDelete = this.state.favorites[index];
    console.log('the movie we want to delte from our react state', movieToDelete)

    axios.post('/delete', {
      title: movieToDelete.title,
      dbId: movieToDelete.dbId
    })
    .then((response) => {
      axios.get('/favorites')
      .then((response) => {
        this.setState({
          favorites: response.data
        })
      })
    })
    .catch((err) => {
      console.error('there was an error deleting this file from your favorites', err);
    })
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  componentDidMount() {
    this.getDefaultMovies();
    axios.get('/favorites')
          .then((response) => {
            this.setState({
              favorites: response.data
            })
          })
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search genres={this.state.genres} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies saveThisMovie={this.saveMovie} deleteThisMovie={this.deleteMovie} movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));