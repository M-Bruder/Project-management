const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  idTask: { type: Number },
  name: { type: String, index: true },
  start: { type: Date },
  end: { type: Date },
  color: { type: String },
  project: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
