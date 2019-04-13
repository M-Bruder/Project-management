const express = require('express');
const Project = require('../models/project.model');

const router = express.Router();

router.post('/add', (req, res) => {
  const project = new Project({
    title: req.body.title,
    body: req.body.body,
    user: req.body.user,
  });
  project
    .save()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post('/getProject', (req, res) => {
  Project.find({ user: req.body.user })
    .populate('project')
    .exec((err, projects) => {
      if (err) {
        console.log(err);
      } else {
        res.json(projects);
      }
    });
});

router.put('/update/:id', (req, res) => {
  const doc = {
    title: req.body.title,
    body: req.body.body,
  };
  Project.updateOne({ _id: req.params.id }, { $set: doc }, (err, project) => {
    if (err) {
      res.send(err);
    } else {
      res.json(project);
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Project.findByIdAndRemove({ _id: req.params.id }, (err) => {
    if (err) res.json(err);
    else res.json(req.params.id);
  });
});

module.exports = router;
