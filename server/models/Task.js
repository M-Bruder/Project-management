var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    name: {type: String, index: true},
    star: { type: Date },
	end: { type: Date },
	color: { type: String }
    /*links: [{
        start: { type: String },
        end: { type: String }
    }]*/
});


var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;

module.exports.createTask = function(newTask, callback){
	console.log('Todo created')
	newTask.save(callback);
}

module.exports.getAllTasks = function(callback){ // we will pass a function :)
	Task.find().lean().exec(function (err, docs) {
	console.log(docs); // returns json
	callback(docs); // <-- call the function passed as parameter
});
}

/*module.exports.getAllTasks = function(callback){
	Task.find().lean().exec(function (err, docs) {
	// If there is an error, return the error and no results
	if(err) return callback(err, null)
   // No error, return the docs
	callback(null, docs)
});
}
*/

  