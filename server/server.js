const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const configDB = require('./config/keysDB');
const user = require('./routes/user');
const project = require('./routes/project');
const member = require('./routes/member');
const task = require('./routes/task');

const app = express();

app.use(cors());

mongoose.Promise = require('bluebird');
// connect to MongoDB
mongoose
  .connect(configDB.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log('Connection Succeeded'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/auth', user);
app.use('/api/projects', project);
app.use('/api/tasks', task);
app.use('/api/members', member);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
  next();
});

app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
  console.log(`Listening on ${server.address().port}`);
});

module.exports = app;
