import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../styles/login.css';

class Register extends Component {
  static get propTypes() {
    return {
      history: PropTypes.object.isRequired
    };
  }

  constructor() {
    super();
    this.state = {
      name: '',
      surname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      message: ''
    };
  }

  onChange = (e) => {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const {
      name,
      surname,
      username,
      email,
      password,
      passwordConfirm
    } = this.state;

    if (password !== passwordConfirm) {
      this.setState({ message: 'Hasła do siebie nie pasują' });
    } else {
      axios
        .post('http://localhost:5000/api/auth/register', {
          name,
          surname,
          username,
          email,
          password
        })
        .then(() => {
          this.setState({ message: '' });
          history.push('/');
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.setState({
              message:
                'Nazwa użytkownika lub adres e-mail jest zajęty! Spróbuj ponownie!'
            });
          }
        });
    }
  };

  render() {
    const {
      name,
      surname,
      username,
      email,
      password,
      passwordConfirm,
      message
    } = this.state;
    return (
      <div className="container">
        <div className="signin">
          {message !== '' && (
            <div className="alert alert-danger alert-dismissible" role="alert">
              {message}
            </div>
          )}
          <form className="form-signin" onSubmit={this.onSubmit}>
            <h2 className="form-signin-heading">Zarejestruj się</h2>
            <input
              type="text"
              id="inputName"
              className="form-control"
              placeholder="Imię"
              name="name"
              value={name}
              onChange={this.onChange}
              required
            />
            <input
              type="text"
              id="inputSurname"
              className="form-control"
              placeholder="Nazwisko"
              name="surname"
              value={surname}
              onChange={this.onChange}
              required
            />
            <input
              type="text"
              id="inputUsername"
              className="form-control"
              placeholder="Nazwa użytkownika"
              minLength="6"
              name="username"
              value={username}
              onChange={this.onChange}
              required
            />
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Adres e-mail"
              name="email"
              value={email}
              onChange={this.onChange}
              required
            />
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Hasło"
              minLength="8"
              name="password"
              value={password}
              onChange={this.onChange}
              required
            />
            <input
              type="password"
              id="inputPasswordConfirm"
              className="form-control"
              placeholder="Powtórz hasło"
              minLength="8"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={this.onChange}
              required
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Zarejestruj się
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
