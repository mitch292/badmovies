import React from 'react';
import Comment from './Comment.jsx'
import axios from 'axios';

class Movies extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      toggleComment: false
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);

  }

  handleSave(index, event) {
    this.props.saveThisMovie(index);
  }

  handleDelete(index, event) {
    this.props.deleteThisMovie(index);
  }



  render() {

    if (this.props.commentToggle) {
      return <Comment submitComment={this.props.submitComment} toggleCommentPage={this.props.showComment} />;
    } else {

      let conditionalOnClick;
      let showDeleteAndReview = false;
  
      if (this.props.showFaves) {
        conditionalOnClick = this.handleDelete;
        showDeleteAndReview = true;
      } else {
        conditionalOnClick = this.handleSave;
      }

      let movieList = this.props.movies.map((movie, i) => {
        let deleteOrAddButton = null;
        let commentButton = null;
        let comment = null;

        if (showDeleteAndReview) {
          deleteOrAddButton = <button onClick={(event)=> conditionalOnClick(i, event)}>DELETE</button>;
          commentButton = <button onClick={(event) => {this.props.showComment(i, event)}}>What'd you think of the movie?</button>
        } else {
          deleteOrAddButton = <button onClick={(event)=> conditionalOnClick(i, event)}>SAVE</button>;
        }
        if (movie.comment) {
          comment = <h5 className='moviereview'>Your Review:<p>{movie.comment}</p></h5>
        }

        return (
          <li key={i} className="movie_item">
            <img src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`} />
            <div className="movie_description">
              <h2>{movie.title}</h2>
              {deleteOrAddButton}
              {commentButton}
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
              {comment}
            </div>
          </li>
        )
      })

    return (
      <ul className="movies">

        {movieList}

      </ul>
    );
      }
  }
}

export default Movies;