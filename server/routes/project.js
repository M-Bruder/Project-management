const express = require('express');
const router = express.Router();

// Require Project model in our routes module
const Project = require('../models/Project');
//require('./auth');

// Defined store rout

router.post('/add',function (req, res) {
  const project = new Project({
    title: req.body.title,
    body: req.body.body,
    user: req.body.user
  });

  console.log(project.user);
  project.user.push(project.user);
  project.save()
    .then(project => {
    res.status(200).json(project);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


router.post('/getProject', function (req, res) {
  Project.find({user : req.body.user})
   .populate('project').exec(function (err, projects){
  if(err){
    console.log(err);
  }
  else {
    res.json(projects);
  }
});
});

/*
router.project('/getProject/:user', function (req, res) {
  Project.find({ 'project.user' : req.params.user}, function (err, projects){
  if(err){
    console.log(err);
  }
  else {
    res.json(projects);
  }
});
});
*/

/*
// Defined get data(index or listing) route
router.get('/getProject', function (req, res) {
    Project.find(function (err, projects){
    if(err){
      console.log(err);
    }
    else {
      res.json(projects);
    }
  });
});
*/

// Defined delete | remove | destroy route
router.get('/delete/:id', function (req, res) {
    Project.findByIdAndRemove({_id: req.params.id}, function(err, project){
        if(err) res.json(err);
        else res.json(req.params.id);
    });
});

module.exports = router;