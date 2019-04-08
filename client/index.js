import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import "./styles/index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Partials/Header";
import Project from "./containers/Project";
import ProjectDetails from "./containers/ProjectDetails";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Profile from "./containers/Profile";

import store from "./store/store";

const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <div id="page-container">
        <div className="app">
          <Header />
          <Switch>
            <Route exact path="/project" component={Project} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));

module.hot.accept();