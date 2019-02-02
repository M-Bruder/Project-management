const express = require('express');
const router = express.Router();

// Require Post model in our routes module
const Post = require('../models/Post');
//require('./auth');

// Defined store rout

router.post('/add',function (req, res) {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    user: req.body.user
  });

  console.log(post.user);
  post.user.push(post.user);
  post.save()
    .then(post => {
    res.status(200).json(post);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


router.post('/getPost', function (req, res) {
  Post.find({user : req.body.user})
   .populate('post').exec(function (err, posts){
  if(err){
    console.log(err);
  }
  else {
    res.json(posts);
  }
});
});

/*
router.post('/getPost/:user', function (req, res) {
  Post.find({ 'post.user' : req.params.user}, function (err, posts){
  if(err){
    console.log(err);
  }
  else {
    res.json(posts);
  }
});
});
*/

/*
// Defined get data(index or listing) route
router.get('/getPost', function (req, res) {
    Post.find(function (err, posts){
    if(err){
      console.log(err);
    }
    else {
      res.json(posts);
    }
  });
});
*/

// Defined delete | remove | destroy route
router.get('/delete/:id', function (req, res) {
    Post.findByIdAndRemove({_id: req.params.id}, function(err, post){
        if(err) res.json(err);
        else res.json(req.params.id);
    });
});

module.exports = router;