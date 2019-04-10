import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.state = {
      id: localStorage.getItem("user"),
      user: [],
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      message: ""
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  onChange = e => {
    const state = this.state.user;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  getProfile = () => {
    const { id } = this.state;
    axios
      .post("http://localhost:5000/api/auth/getProfile", { id })
      .then(res => {
        const { data } = res;
        this.setState({ user: data });
      })
      .catch(error => {
        throw error;
      });
  };

  updateProfile = () => {
    axios
      .put("http://localhost:5000/api/auth/updateProfile", {
        id: this.state.user._id,
        name: this.state.name,
        surname: this.state.surname,
        username: this.state.username,
        email: this.state.email
      })
      .then(result => {
        if (result) {
          console.log(result);
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.updatePassword();
  };

  updatePassword = () => {
    const { password, passwordConfirm } = this.state;
    if (
      password !== passwordConfirm &&
      (this.state.password.trim() && this.state.passwordConfirm.trim())
    ) {
      this.setState({ message: "Hasła do siebie nie pasują" });
    } else {
      axios
        .put("http://localhost:5000/api/auth/updatePassword", {
          id: this.state.user._id,
          password: this.state.password
        })
        .then(result => {
          if (result) {
            console.log(result);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const { message } = this.state;
    return (
      <div className="container">
        <div className="signin">
          <form className="form-signin" onSubmit={this.updateProfile}>
            {message !== "" && (
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
              value={this.state.user.name || this.state.name}
              onChange={this.onChange}
            />
            <input
              type="text"
              id="inputSurname"
              className="form-control"
              placeholder="Nazwisko"
              name="surname"
              value={this.state.user.surname || this.state.surname}
              onChange={this.onChange}
            />
            <input
              type="text"
              id="inputUsername"
              className="form-control"
              placeholder="Nazwa użytkownika"
              name="username"
              value={this.state.user.username || this.state.username}
              onChange={this.onChange}
            />
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Adres e-mail"
              name="email"
              value={this.state.user.email || this.state.email}
              onChange={this.onChange}
            />
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Hasło"
              minLength="8"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <input
              type="password"
              id="inputPasswordConfirm"
              className="form-control"
              placeholder="Powtórz hasło"
              minLength="8"
              name="passwordConfirm"
              value={this.state.passwordConfirm}
              onChange={this.onChange}
            />
            <button
              className="btn btn-lg btn-primary btn-block"
              type="onSubmit"
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
