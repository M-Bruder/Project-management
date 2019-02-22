import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.updateProfile = this.updateProfile.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.state = {
      id:'',
      user: [],
      name:'',
      surname: '',
      username: localStorage.getItem('user'),
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
    const state = this.state.user
    state[e.target.name] = e.target.value;
    this.setState(state);
  }


  logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    this.props.history.push('/');
  }

  getProfile = () => {
    var self = this;
    const { username } = this.state;
      //self.setState({password: result.data.password});  

    axios.post(`http://localhost:5000/api/auth/getProfile`, { username })
      .then(res => {
        console.log(res.data);
        let data = res.data;
        this.setState({ user: data});
      })
      .catch(error => {
        throw(error);
      });

      console.log(this.state);
  }

  updateProfile = () => { 
    axios.post('http://localhost:5000/api/auth/updateProfile', {
      id: this.state.user._id,
      username: this.state.username,
      password: this.state.password
    })
    .then((result) => {
      if(result){
        console.log(username + ' hasło ' + password);
        console.log(result);
        hashHistory.push('/')  
      }
    })
    .catch((error) =>  {
      console.log('error is ',error);
    });
  }

  
  render() {
    const {message} = this.state;
    return (
      <div className="container">
        <div className="signin">
          <form className="form-signin" onSubmit={this.updateProfile}>
            {message !== '' &&
                <div className="alert alert-warning alert-dismissible" role="alert">
                  { message }
                </div>
            }
            <h2 className="form-signin-heading">Twoje dane:</h2>
            <input type="text" id="inputName" className="form-control" placeholder="Imię" name="name" value={this.state.user.name} onChange={this.onChange}/>
            <input type="text"  id="inputSurname" className="form-control" placeholder="Nazwisko" name="surname" value={this.state.user.surname} onChange={this.onChange}/>
            <input type="text"  id="inputUsername" className="form-control" placeholder="Nazwa użytkownika" name="username" value={this.state.user.username} onChange={this.onChange}/>
            <input type="email" id="inputEmail" className="form-control" placeholder="Adres e-mail" name="email" value={this.state.user.email} onChange={this.onChange}/>
            <input type="password" id="inputPassword" className="form-control" placeholder="Hasło" minlength="8" name="password" value={this.state.password} onChange={this.onChange}/>
            <input type="password" id="inputPasswordConfirm" className="form-control" placeholder="Powtórz hasło" minlength="8" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.onChange}/>
            <button className="btn btn-lg btn-primary btn-block" type="submit" >Zatwierdź zmiany</button>
          </form>
         </div>
      </div>
    );
  }
}

export default Profile;

/*class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: localStorage.getItem('user'),
        };
      }
    render() {
      console.log(localStorage.getItem('user'));
        return (
        <p>
        Hello { this.state.username }!
        </p>
      );
    }
  }

  export default Profile;
  */