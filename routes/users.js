var express = require('express');
var router = express.Router();


var User = require('../models/user');


//REGISTER USER

router.post('/register', function(req, res, next) {
  User.register(req.body, function(err, savedUser) {
    if(err){
      res.status(400).send(err)
    } else{
      res.send('register success!');
    }
  });
});

//LOGIN USER

router.post('/login', function(req, res, next){
  User.login(req.body, function(err, token){
    if(err) {
      res.status(400).send(err);
    }
    else{
      console.log(token);
      res.cookie('userToken', token).send('login success!');
    }
  });
});



// IS USER LOGGED IN

router.get('/auth', User.isLoggedIn, function(req, res, next){
  res.send('Valid Login State!');
});



router.get('/browse', User.isLoggedIn, function(req, res, next){

  User.find({}, function(err, users) {
    if(err){
      res.status(400).send(err);
    }
    res.send(users);
  });
});





// UPDATE USER PROFILE


router.post('/update', User.isLoggedIn, function(req, res){

  User.findById(req.token._id, function(err, user){
    console.log('user:   ', user);
    if(err){
      return res.status(400).send(err);
    }
    user.country = req.body.country;
    user.state = req.body.state;
    user.city = req.body.city;
    user.tags = req.body.tags;
    user.preference = req.body.preference;
    user.name = req.body.name;

    user.save(function(err){
      if(err){
        res.status(400).send(err);
      }else{
        res.send();
      }
    })
  });
});



router.get('/logout', User.isLoggedIn, function(req, res){
  res.clearCookie('userToken').send('logout success!');
});



module.exports = router;
