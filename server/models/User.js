const Project = require('./Project');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, unique: true, required: true, index: true},
	username: {type: String, unique: true, required: true, index: true},
	password: {type: String, required: true},
    },
	{timestamps: true});


UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
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
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


var User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.getUserByUsernameorEmail = function(username, callback){
	var query = (username.indexOf('@') === -1) ? {username: username} : {email: username};
	User.findOne(query, callback);
}

module.exports.getUserInfo = function(username, callback){
        User.findOne( { username : username },function(err, result){
            if(result==null){
                callback(false)
            }
            else{
                callback(result);
            }
        });
    }
  
module.exports.updateProfile = function(username, password, callback){
    User.updateOne( 
            { "email": username },
            { $set: 
                { "username" : username,
                  "password" : password,
                  "name" : name,
                  "surname": surname,
                  "enail": email
                }
            },function(err, result){
            if(err == null){
                callback(true)
            }
            else{
                callback(false)
            }
        });
    }

    module.exports.getUserById = function(id, callback){
        User.findById(id, callback);
    }
