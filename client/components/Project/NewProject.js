import React from 'react';
import { FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';

class NewProject extends React.Component {
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
      this.props.onAddProject(
        {
            title: this.state.title,
            body: this.state.body,
            user: this.state.user
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
              value={ this.state.title } required
            />
          </div>
          <div className="form-group">
            <textarea              
              cols="70"
              rows="6"
              placeholder="Opis"
              className="form-control"
              name="body"
              onChange={ this.handleInputChange }
              value={ this.state.body } required>
            </textarea>
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Dodaj projekt</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewProject;