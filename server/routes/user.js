var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");


router.post('/register', function(req, res) {
  var name = req.body.name;
  var surname = req.body.surname;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var passwordConfirm = req.body.passwordConfirm;



 User.findOne({ username: { 
    "$regex": "^" + username + "\\b", "$options": "i"
}}, function (err, user) {
    User.findOne({ email: { 
      "$regex": "^" + email + "\\b", "$options": "i"
  }}, function (err, mail) {
      if (user || mail) {
        res.status(401).send({success: false, msg: 'Username already exists.'});
      }
      else {
        var newUser = new User({
          _id: req.body_id,
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
          if (err) {
            return res.status(401).send({success: false, msg: 'Username already exists.'});
          }
          res.json({success: true, msg: 'Successful created new user.'});
        });
      }
    });
  });
/*
  if (!req.body.username || !req.body.password) {
    res.status(401).json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      _id: req.body_id,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.status(401).send({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
  */
}); 

router.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          //var token = user.toJSON(), settings.secret);
          var token = user;
          var userid = user._id;
          console.log(userid);
          //res.json({success: true, token: 'JWT ' + token});
          res.json({success: true, token: 'JWT' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/', (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user)
  if (req.user) {
      res.json({ user: req.user })
  } else {
      res.json({ user: null })
  }
})

router.post('/logout', (req, res) => {
  if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
  } else {
      res.send({ msg: 'no user to log out' })
  }
})

router.post('/getProfile', function(req,res){
  var username = req.body.username;
  User.findOne({ username: req.body.username }, function(err, result){
    if(err){
      console.log(err);
    }
    else {
      res.json(result);
      console.log(result);
    }
  })
})

router.post('/updateProfile', function(req, res){
  var name = req.body.name;
  var surname = req.body.surname;
  var email = req.body.email;
  var username = req.body.username;
  User.updateProfile(name, surname, email, username, function(result){
    res.send(result);
  })
})

router.post('/updatePassword', function(req, res){
  var password = req.body.password;
  User.updatePassword(password, function(result){
    res.send(result);
  })
})

router.get('/getPost', function (req, res) {
  User.findOne({ username: req.body.username })
   .populate('project').exec(function (err, projects){
  if(err){
    console.log(err);
  }
  else {
    res.json(projects);
  }
});
});


module.exports = router;
