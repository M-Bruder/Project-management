const express = require('express');
const Task = require('../models/task.model');

const router = express.Router();

router.post('/add', (req, res) => {
  const task = new Task({
    name: req.body.name,
    start: req.body.start,
    end: req.body.end,
    color: req.body.color,
    project: req.body.project,
  });

  task
    .save()
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post('/getTask', (req, res) => {
  Task.find({ project: req.body.project })
    .populate('task')
    .exec((err, tasks) => {
      if (err) {
        console.log(err);
      } else {
        res.json(tasks);
      }
    });
});

router.get('/delete/:id', (req, res) => {
  Task.findByIdAndRemove({ _id: req.params.id }, (err, task) => {
    if (err) res.json(err);
    else res.json(task);
  });
});

router.put('/update/:id', (req, res) => {
  const doc = {
    name: req.body.name,
    start: req.body.start,
    end: req.body.end,
  };
  Task.updateOne({ _id: req.params.id }, { $set: doc }, (err, task) => {
    if (err) {
      res.send(err);
    } else {
      res.json(task);
    }
  });
});

module.exports = router;
