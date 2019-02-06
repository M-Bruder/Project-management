var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define collection and schema for Post
var Project = require('./Project');
var MemberSchema = new Schema({
  user: [
    { 
        type: String,
        ref: 'User' 
    }
    ],
	members: 	[
		{ 
			type: String,
			ref: 'User' 
		}
	],
	project: 
	[
		{ 
			type: String,
			ref: 'Project' 
		}
	]
});

var Member = mongoose.model('Member', MemberSchema);
module.exports = Member;

module.exports.getPostByUser = function(user, callback){
	var query = {user: user};
	Post.findOne(query, callback);
}