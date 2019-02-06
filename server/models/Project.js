var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define collection and schema for Post
var ProjectSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  user: 
	[
		{ 
			type: String,
			ref: 'User' 
		}
	],
	members: 	[
		{ 
			type: String,
			ref: 'Member' 
		}
	]
});

var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;

module.exports.getPostByUser = function(user, callback){
	var query = {user: user};
	Post.findOne(query, callback);
}