import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './styles/index.css';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.css';
import ProjectList from './Project';
import ProjectDetails from './ProjectDetails'
import Header from './layout/HeaderUser';
import Footer from './layout/Footer';
import Login from './containers/Login';
import Register from './containers/Register';
import Profile from './containers/Profile';
import Gantt from './containers/Gantt/Gantt';

import store from './store/Store'


const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <div id="page-container">
      <div className="App">
        <Header />
          <Switch>
            <Route exact path='/project' component={ProjectList}/>
            <Route path='/project/:id' component={ProjectDetails}/>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/gantt' component={Gantt} />
          </Switch>
        <Footer /> 
        </div>
      </div>
    </HashRouter>
  </Provider>
);

//store.dispatch(fetchAllPosts()).then(() => {
ReactDOM.render(<Root/>, document.getElementById('root'));
//});

module.hot.accept();


/*ReactDOM.render(
  <Provider store={store}>
    <Router>
     <div className="App">
      <Header />
        <Switch>
          <Route exact path='/app' component={App} />
          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/profile' component={Profile} />
          <Route path='/gantt' component={Gantt} />
        </Switch>
      <Footer /> 
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
); */


/*
ReactDOM.render(
  <Router>
  <div>{title}</div>,
  <Route exact path="/" component={Layout}/>,
  </Router>
  document.getElementById('app')
);

import './css/index.css'
import './css/App.css'
import Login from './containers/Login'
import Register from './containers/Register'
import Profile from './containers/Profile'
import ListsProject from './containers/ListsProject'
import Project from './containers/Project'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Route, Switch} from 'react-router-dom'

const Root = () => (
      <Router>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route path='/profile/:id' component={Profile} />
                <Route path='/listsProject/:id' component={ListsProject} />
                <Route path='/project/:id' component={Project} />
            </Switch>
      </Router>
)

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);
ReactDOM.render(<Root/>, document.getElementById('app'));
module.hot.accept();

*/