import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
    this.getGenres = this.getGenres.bind(this);
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


  componentDidMount() {
    this.getGenres();
  }

  render() {
    let genreList = this.state.genres.map((genre) => 
      <option id={genre.id}>{genre.name}</option>
    )
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select>
          {genreList}
        </select>
        <br/><br/>

        <button>Search</button>

      </div>
    );
  }
}

export default Search;