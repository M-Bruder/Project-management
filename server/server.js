const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const passport = require('passport');
const logger = require('morgan');
const cors = require('cors');

const user = require('./routes/user');
const post = require('./routes/post');
const task = require('./routes/task');

const app = express();

app.use(cors());

mongoose.Promise = require('bluebird');
//connect to MongoDB
mongoose
    .connect('mongodb://localhost/ReactProjectManagementSystemq',
    { useCreateIndex: true, useNewUrlParser: true, promiseLibrary: require('bluebird')})
    .then(() => console.log("Connection Succeeded"))
    .catch(err => console.log(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/auth', user);
app.use('/api/posts', post);
app.use('/api/tasks', task);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
});


app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
    console.log(`Listening on ${ server.address().port }`);
});

module.exports = app;
