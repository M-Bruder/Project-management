import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.state = {
      username: localStorage.getItem('user'),
      password:'',
      id:'',
      user: {}
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  handleNameChange(e){
    this.setState({username:e.target.value})
  }
  handlePasswordChange(e){
    this.setState({password:e.target.value})
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    this.props.history.push('/');
  }

  getProfile = () => {
    var self = this;
    const { username } = this.state;
    axios.post('http://localhost:5000/api/auth/getProfile', { username 
    })
    .then((result) =>  {
      console.log(result);
      self.setState({password: result.data.password});  
    })
    .catch((error) =>  {
      console.log('error is ',error);
    });
  }

  updateProfile = () => { 
    axios.post('http://localhost:5000/api/auth/updateProfile', {
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
    return (
      <div className="col-md-5">
        <div className="form-area">  
            <form role="form">
              <br styles="clear:both" />
              <div className="form-group">
                <input value={this.state.username} type="text" onChange={this.handleNameChange} className="form-control" placeholder="Username" name="username" required />
              </div>
              <div className="form-group">
                <input value={this.state.password} type="password" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" name="password"/>
              </div>
              
              <button type="button" onClick={this.updateProfile} id="submit" name="submit" className="btn btn-primary pull-right">Update</button>
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