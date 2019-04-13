import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.state = {
      id: localStorage.getItem('user'),
      user: [],
      name: '',
      surname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      message: ''
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  onChange = (e) => {
    const { state } = this;
    state[e.target.name] = [e.target.value];
    this.setState(state);
  };

  getProfile = () => {
    const { id } = this.state;
    axios
      .post('http://localhost:5000/api/auth/getProfile', { id })
      .then((res) => {
        const { data } = res;
        this.setState({ user: data });
        this.setState({
          name: data.name,
          surname: data.surname,
          username: data.username,
          email: data.email
        });
      })
      .catch((error) => {
        throw error;
      });
  };

  handleSubmit = () => {
    const {
 id, name, surname, username, email 
} = this.state;
    axios
      .put('http://localhost:5000/api/auth/updateProfile', {
        id,
        name,
        surname,
        username,
        email
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    this.updatePassword();
  };

  updatePassword = () => {
    const { id, password, passwordConfirm } = this.state;
    if (password === passwordConfirm) {
      this.setState({ message: 'Hasła nie zostało zmienione!' });
    } else if (!password && !passwordConfirm) {
      console.log('!password and passwrodconfigt');
      this.setState({ message: 'Hasła nie zostało zmienione!' });
    } else {
      axios
        .put('http://localhost:5000/api/auth/updatePassword', {
          id,
          password
        })
        .then((result) => {
          if (result) {
            console.log(result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const {
      message,
      name,
      username,
      surname,
      email,
      password,
      passwordConfirm
    } = this.state;
    return (
      <div className="container">
        <div className="signin">
          <form className="form-signin" onSubmit={this.handleSubmit}>
            {message !== '' && (
              <div
                className="alert alert-warning alert-dismissible"
                role="alert"
              >
                {message}
              </div>
            )}
            <h2 className="form-signin-heading">Twoje dane:</h2>
            <input
              type="text"
              id="inputName"
              className="form-control"
              placeholder="Imię"
              name="name"
              value={name}
              onChange={this.onChange}
            />
            <input
              type="text"
              id="inputSurname"
              className="form-control"
              placeholder="Nazwisko"
              name="surname"
              value={surname}
              onChange={this.onChange}
            />
            <input
              type="text"
              id="inputUsername"
              className="form-control"
              placeholder="Nazwa użytkownika"
              name="username"
              value={username}
              onChange={this.onChange}
            />
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Adres e-mail"
              name="email"
              value={email}
              onChange={this.onChange}
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
            />
            <button
              className="btn btn-lg btn-primary btn-block"
              type="submit"
            >
              Zatwierdź zmiany
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
