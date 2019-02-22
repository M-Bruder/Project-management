var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = require('./Project');
var MemberSchema = new Schema({
	project: 
	[
		{ 
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project' 
		}
	],
	members: 	[
		{ 
			type: String,
			ref: 'User' 
		}
	],
});

var Member = mongoose.model('Member', MemberSchema);
module.exports = Member;

module.exports.getProjectByUser = function(user, callback){
	var query = {user: user};
	Project.findOne(query, callback);
}