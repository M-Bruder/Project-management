const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.pre('save', function (next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.getUserByUsernameorEmail = function (username, callback) {
  const query = username.indexOf('@') === -1 ? { username } : { email: username };
  User.findOne(query, callback);
};

module.exports.getUserInfo = function (username, callback) {
  User.findOne({ username }, (err, result) => {
    if (result == null) {
      callback(false);
    } else {
      callback(result);
    }
  });
};

module.exports.updatePassword = function (id, password, callback) {
  User.findByIdAndUpdate(
    id,
    {
      $set: {
        password,
      },
    },
    (err, result) => {
      if (err == null) {
        callback(result);
      } else {
        callback(false);
      }
    },
  );
};

module.exports.updateProfile = function (
  id,
  username,
  name,
  surname,
  email,
  callback,
) {
  User.updateOne(
    { _id: id },
    {
      $set: {
        username,
        name,
        surname,
        email,
      },
    },
    (err, result) => {
      if (err == null) {
        callback(result);
      } else {
        callback(false);
      }
    },
  );
};
module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};
