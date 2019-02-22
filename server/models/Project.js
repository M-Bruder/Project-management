var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
			ref: 'users' 
		}
	],
});

var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;

module.exports.getProjectByUser = function(user, callback){
	var query = {user: user};
	Project.findOne(query, callback);
}