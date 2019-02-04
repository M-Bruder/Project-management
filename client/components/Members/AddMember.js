import React from 'react';
import { FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';

class NewPost extends React.Component {
  state = {
    title: '',
    body: '',
    user: localStorage.getItem('user')
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title.trim() && this.state.body.trim()) {
      console.log(this.state);
      this.props.onAddMember(
        {
            name: this.state.title,
            surname: this.state.body,
            username: this.state.username
        }
    );
      this.handleReset();
    }
  };

  handleReset = () => {
    this.setState({
      title: '',
      body: ''
    });
  };

  render() {
    return (
      <div>
          <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
              <input
              type="text"
              placeholder="Nazwa projektu"
              className="form-control"
              name="title"
              onChange={ this.handleInputChange }
              value={ this.state.title }
            />
          </div>
          <div className="form-group">
            <textarea
              cols="19"
              rows="8"
              placeholder="Opis"
              className="form-control"
              name="body"
              onChange={ this.handleInputChange }
              value={ this.state.body }>
            </textarea>
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Dodaj projekt</button>
            <button type="button" className="btn btn-warning" onClick={ this.handleReset }>
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewPost;