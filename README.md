# Project-management-system 
First App built with MongoDB, Express, React and Node.js (MERN STACK). 

## How to install/run app?
1. Clone the repo
```
git clone git@github.com:m-bruder/project-managment.git
```
2. Install mongodb and run mongo server
* [MongoDB](https://docs.mongodb.com/manual/installation/)
3. Install dependencies:
```
npm install
```
4. Now you can run app by command:
```
npm run start
```

It will run for:
* client on port 8080
* server on port 5000

## Specification
Functions avalible:

- Login/Register user
- Edit profile user
- Create/Delete/Edit project
- Create/Delete/Edit task in project
- Prioritizing tasks through color
- Change scale Month/Year for Gantt chart

It's all connected with database MongoDB.

## App built With

- [npm](https://www.npmjs.com/) - Package manager for JavaScript

  #### Front-end

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Redux](https://redux.js.org/) - Predictable state container for JavaScript apps
- [React-gantt-timeline](https://github.com/guiqui/react-timeline-gantt) - React timeline gantt component
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [Reactstrap](https://reactstrap.github.io/) -  React Bootstrap 4 components
- [Babel](https://babeljs.io/) - JavaScript compiler
- [Webpack](https://webpack.js.org/) - Module bundler for modern JavaScript applications

  #### Back-end

- [Nodemon](https://nodemon.io/) - Auto-refresh the server on code change
- [Bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs) - Password hashing 
- [Mongoose](https://mongoosejs.com/) - Mongodb object modeling for node.js

  #### Others:

- [Eslint](https://eslint.org/) - Linting utility for JavaScript and JSX

## Result app

Login            |  Register
:-------------------------:|:-------------------------:
<img src="https://github.com/M-Bruder/Project-management/blob/master/img-readme/login.png" width="450" height="210" alt="login-img"> | <img src="https://github.com/M-Bruder/Project-management/blob/master/img-readme/register.png" width="450" height="210" alt="register-img">

Project List            | Project Details 
:-------------------------:|:-------------------------:
<img src="https://github.com/M-Bruder/Project-management/blob/master/img-readme/project.png" width="450" height="210" alt="project-img"> | <img src="https://github.com/M-Bruder/Project-management/blob/master/img-readme/gantt.png" width="450" height="210" alt="gantt-img">


