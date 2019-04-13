import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewProject extends Component {
  static get propTypes() {
    return {
      onAddProject: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      user: localStorage.getItem('user')
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    const { onAddProject } = this.props;
    const { title, body, user } = this.state;
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onAddProject({
        title,
        body,
        user
      });
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
    const { title, body } = this.state;
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nazwa projektu"
              className="form-control"
              name="title"
              onChange={this.handleInputChange}
              value={title}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              cols="70"
              rows="6"
              placeholder="Opis"
              className="form-control"
              name="body"
              onChange={this.handleInputChange}
              value={body}
              required
            />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">
              Dodaj projekt
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewProject;
