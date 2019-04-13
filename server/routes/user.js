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
              .send({ success: false, msg: 'Istniejąca nazwa użykownika lub adres e-mail!' });
          } else {
            const newUser = new User({
              _id: req.body_id,
              name: req.body.name,
              surname: req.body.surname,
              email: req.body.email,
              username: req.body.username,
              password: req.body.password
            });
            newUser.save((err, user) => {
              if (err) {
                return res.status(401).send({ success: false, msg: err });
              } 
                return res.json({ success: true, msg: user });
            });
          }
        }
      );
    }
  );
});

router.post('/login', (req, res) => {
  User.getUserByUsernameorEmail(req.body.username, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).send({
        success: false,
        msg: 'Nie prawidłowa nazwa użykownika lub adres e-mail!'
      });
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const userid = user._id;
          res.json({ success: true, userid });
        } else {
          res.status(401).send({
            success: false,
            msg: 'Nie prawidłowe hasło!'
          });
        }
      });
    }
  });
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
  User.findById(req.body.id, (err, user) => {
    if (err) {
      res.send(err);
    }
      res.json(user); 
  });
});

router.put('/updateProfile', (req, res) => {
  const doc = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    username: req.body.username
  };
  User.updateOne({ _id: req.body.id }, { $set: doc }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

router.put('/updatePassword', (req, res) => {
  User.updatePassword(req.body.password, (passwd) => {
    const doc = {
      password: passwd
    };
    User.updateOne({ _id: req.body.id }, { $set: doc }, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  });
});

module.exports = router;
