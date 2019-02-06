const express = require('express');
const router = express.Router();

const Task = require('../models/Task');

// Defined store rout

router.post('/add',function (req, res) {
  const task = new Task({
    idTask: req.body.idTask,
    name: req.body.name,
    start: req.body.start,
	  end: req.body.end,
    color: req.body.color,
    user: req.body.user,
    post: req.body.post
  });

  task.save()
    .then(task => {
    res.status(200).json(task);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


router.post('/getTask', function (req, res) {
  Task.find({post : req.body.post})
   .populate('task').exec(function (err, tasks){
  if(err){
    console.log(err);
  }
  else {
    res.json(tasks);
  }
});
});


// Defined delete | remove | destroy route
router.get('/delete/:id', function (req, res) {
    Task.findByIdAndRemove({_id: req.params.id}, function(err, task){
        if(err) res.json(err);
        else res.json(req.params.id);
    });
});

router.put('/update/:id', function (req, res) {
  const doc = {
    name: req.body.name,
    start: req.body.start,
    end: req.body.end
};
console.log(doc);
  Task.updateOne({_id: req.params.id}, {$set: doc }, function(err, task){
    if(err){
      res.send(err);
    }
    else {
      res.json(task);
    }
  });
});


module.exports = router;