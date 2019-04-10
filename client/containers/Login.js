import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  onChange = e => {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;

    axios
      .post("http://localhost:5000/api/auth/login", { username, password })
      .then(result => {
        localStorage.setItem("user", result.data.userid);
        this.setState({ message: "" });
        this.props.history.push("/project");
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({ message: "Błędna nazwa użytkownika lub hasło!" });
        }
      });
  };

  componentDidMount() {
    if (localStorage.getItem("user") !== null) {
      this.props.history.push("/");
    }
  }

  render() {
    const { username, password, message } = this.state;
    return (
      <div className="container ">
        <div className="signin">
          {message !== "" && (
            <div className="alert alert-danger alert-dismissible" role="alert">
              {message}
            </div>
          )}
          <form className="form-signin" onSubmit={this.onSubmit}>
            <h2 className="form-signin-heading">Zaloguj się</h2>
            <p> Masz już konto? Wpisz swoje dane. </p>
            <input
              type="text"
              id="inputEmail"
              className="form-control"
              placeholder="Nazwa użytkownika lub adres e-mail"
              name="username"
              value={username}
              onChange={this.onChange}
              required
            />
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Hasło"
              name="password"
              value={password}
              onChange={this.onChange}
              required
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Zaloguj się
            </button>
            
              <p>
                Nie masz konta?{" "}
                <Link to="/register">
                  <span
                    className="glyphicon glyphicon-plus-sign"
                    aria-hidden="true"
                  />{" "}
                  Zarejestruj się!
                </Link>
              </p>
            
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
