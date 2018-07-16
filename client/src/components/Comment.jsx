import React from 'react';
import axios from 'axios';

class Comment extends React.Component {
  constructor(props) {
    super()
    this.state = {
      submission: '',
      charsLeft: 255
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCancelSubmit = this.handleCancelSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      submission: event.target.value,
      charsLeft: (255-this.state.submission.length)
    })
  }

  handleCommentSubmit(event) {
    event.preventDefault()
    console.log(this.state.submission)
    //logic goes here
    this.setState({
      submission: '',
      charsLeft: 255
    })

    this.props.submitComment(this.state.submission);
    this.props.toggleCommentPage();

  }

  handleCancelSubmit(event) {
    event.preventDefault()
    this.props.toggleCommentPage();

  }

  render() {

    return (
      <div className='comment'>
        <form onSubmit={this.handleCommentSubmit}>
          <p>Characters Left: {this.state.charsLeft} </p>
          <label>
            How was the movie?
            <input className='review' onChange={this.handleChange} type='text' name='comment' />
          </label>
          <input type="submit" value="SUMBIT" />
        </form>
        
        <form onSubmit={this.handleCancelSubmit}>
          <input type="submit" value="CANCEL"/>
        </form>
      </div>
    )
  }
}

export default Comment;