var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
    idTask: { type: Number},
    name: {type: String, index: true},
    start: { type: Date },
	end: { type: Date },
	color: { type: String },
	user: 
	[
		{ 
			type: String,
			ref: 'User' 
		}
	]
    /*links: [{
        start: { type: String },
        end: { type: String }
    }]*/
});


var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;

/*module.exports.getAllTasks = function(callback){
	Task.find().lean().exec(function (err, docs) {
	// If there is an error, return the error and no results
	if(err) return callback(err, null)
   // No error, return the docs
	callback(null, docs)
});
}
*/

  
