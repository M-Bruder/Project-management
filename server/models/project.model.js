const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  user: [
    {
      type: String,
      ref: 'users',
    },
  ],
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
