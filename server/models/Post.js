var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define collection and schema for Post
var PostSchema = new Schema({
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
	]
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;

module.exports.getPostByUser = function(user, callback){
	var query = {user: user};
	Post.findOne(query, callback);
}