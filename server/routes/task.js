const express = require('express');
const router = express.Router();

const Task = require('../models/Task');


// Defined store rout

router.post('/add',function (req, res) {
  const task = new Task({
    id: req.body.id,
    name: req.body.name,
    start: req.body.start,
	  end: req.body.end,
    color: req.body.color
  });

  task.save()
    .then(post => {
    res.status(200).json(task);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


router.post('/getTask', function (req, res) {
  Task.find({project : req.body.project})
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

module.exports = router;