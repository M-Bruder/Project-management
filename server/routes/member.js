const express = require('express');
const router = express.Router();

// Require Post model in our routes module
const Project = require('../models/Project');
const Member = require('../models/Member');
//require('./auth');

// Defined store rout

router.post('/addMember',function (req, res) {
  const member = new Member({
    members: req.body.memberName,
    user: req.body.user,
    project: req.body.project
  });

  //member.post.push(member.post);
  console.log(member.project);
  member.save()
    .then(member => {
    res.status(200).json(member);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


router.post('/getMember', function (req, res) {
  Member.find({project : req.body.project})
   .populate('project').exec(function (err, members){
  if(err){
    console.log(err);
  }
  else {
    console.log(members)
    res.json(members);
  }
});
});



// Defined delete | remove | destroy route
router.get('/delete/:id', function (req, res) {
    Member.findByIdAndRemove({_id: req.params.id}, function(err, member){
        if(err) res.json(err);
        else res.json(req.params.id);
    });
});

module.exports = router;