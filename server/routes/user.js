const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

router.post('/register', (req, res) => {
  const { email } = req.body;
  const { username } = req.body;

  User.findOne(
    {
      username: {
        $regex: `^${username}\\b`,
        $options: 'i'
      }
    },
    (err, user) => {
      User.findOne(
        {
          email: {
            $regex: `^${email}\\b`,
            $options: 'i'
          }
        },
        (err, mail) => {
          if (user || mail) {
            res
              .status(401)
              .send({ success: false, msg: 'Username already exists.' });
          } else {
            const newUser = new User({
              _id: req.body_id,
              name: req.body.name,
              surname: req.body.surname,
              email: req.body.email,
              username: req.body.username,
              password: req.body.password
            });
            newUser.save((err) => {
              if (err) {
                return res
                  .status(401)
                  .send({ success: false, msg: 'Username already exists.' });
              }
              res.json({ success: true, msg: 'Successful created new user.' });
            });
          }
        }
      );
    }
  );
});

router.post('/login', (req, res) => {
  User.findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (err) throw err;
      if (!user) {
        res.status(401).send({
          success: false,
          msg: 'Authentication failed. User not found.'
        });
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            const token = user;
            res.json({ success: true, token: `JWT${token}` });
          } else {
            res.status(401).send({
              success: false,
              msg: 'Authentication failed. Wrong password.'
            });
          }
        });
      }
    }
  );
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});

router.post('/getProfile', (req, res) => {
  User.findOne({ username: req.body.username }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
      console.log(result);
    }
  });
});

router.post('/updateProfile', (req, res) => {
  const { name } = req.body;
  const { surname } = req.body;
  const { email } = req.body;
  const { username } = req.body;
  User.updateProfile(req.params.id, name, surname, email, username, (result) => {
    res.send(result);
  });
});

router.post('/updatePassword', (req, res) => {
  const { password } = req.body;
  User.updatePassword(req.params.id, password, (result) => {
    res.send(result);
  });
});

module.exports = router;
