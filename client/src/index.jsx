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
      favorites: [{deway: "favorites"}],
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
        this.setState({
          movies: response.data
        })
      })
      .catch((err) => {
        console.error('there was an error getting the master list', err);
      })
  }

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  componentDidMount() {
    this.getDefaultMovies();
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search genres={this.state.genres} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));