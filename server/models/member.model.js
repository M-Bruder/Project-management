const mongoose = require('mongoose');

const { Schema } = mongoose;

const MemberSchema = new Schema({
  project: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
  members: [
    {
      type: String,
      ref: 'User',
    },
  ],
});

const Member = mongoose.model('Member', MemberSchema);
module.exports = Member;
