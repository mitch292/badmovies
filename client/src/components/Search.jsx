import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenre: []
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleGenreSelection = this.handleGenreSelection.bind(this);
  }

  getGenres() {
    axios.get('/genres')
    .then((response) => {
      this.setState({
        genres: response.data
      })
    })
    .catch((err) => {
      console.error('there was an error retrieving the genres', err)
    })
  }

  handleGenreSelection(event) {
    this.setState({
      selectedGenre: event.target.value
    })

  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    let genreList = this.state.genres.map((genre) => 
      <option key={genre.id} multiple={true} value={[genre.id, genre.name]}>{genre.name}</option>
    )
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select value={this.state.selectedGenre} onChange={this.handleGenreSelection}>
          {genreList}
        </select>
        <br/><br/>

        <button onClick={() => this.props.getMovies(this.state.selectedGenre)}>Search</button>

      </div>
    );
  }
}

export default Search;