const express = require('express');
const Member = require('../models/member.model');

const router = express.Router();

router.post('/addMember', (req, res) => {
  const member = new Member({
    members: req.body.memberName,
    user: req.body.user,
    project: req.body.project
  });

  member
    .save()
    .then((member) => {
      res.status(200).json(member);
    })
    .catch((err) => {
      res.status(400).send('unable to save to database');
    });
});

router.post('/getMember', (req, res) => {
  Member.find({ project: req.body.project })
    .populate('project')
    .exec((err, members) => {
      if (err) {
        console.log(err);
      } else {
        console.log(members);
        res.json(members);
      }
    });
});

router.get('/delete/:id', (req, res) => {
  Member.findByIdAndRemove({ _id: req.params.id }, (err, member) => {
    if (err) res.json(err);
    else res.json(req.params.id);
  });
});

module.exports = router;
