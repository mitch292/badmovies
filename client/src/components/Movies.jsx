import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);

  }

  handleSave(index, event) {
    this.props.saveThisMovie(index);
  }

  handleDelete(index, event) {
    this.props.deleteThisMovie(index);
  }

  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {

    let conditionalOnClick;

    if (this.props.showFaves) {
      conditionalOnClick = this.handleDelete;
    } else {
      conditionalOnClick = this.handleSave;
    }

    let movieList = this.props.movies.map((movie, i) => 
      <li onClick={(event)=> conditionalOnClick(i, event)} key={i} className="movie_item">
        <img src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`} />
        <div className="movie_description">
          <h2>{movie.title}</h2>
          <section className="movie_details">
            <div className="movie_year">
              <span className="title">Release Date</span>
              <span>{movie.release_date}</span>
            </div>
            <div className="movie_rating">
              <span className="title">Rating</span>
              <span>{movie.vote_average}</span>
            </div>
          </section>
        </div>
      </li>
    )
    return (
      <ul className="movies">

        {movieList}
        {/* Make this list dynamic! */}

      </ul>
    );
  }
}

export default Movies;