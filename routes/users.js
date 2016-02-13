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









//GET USER PROFILE

//TODO WILL HAVE TO DO THIS WITH ANGULAR CLIENT SIDE

// router.get('/profile', User.isLoggedIn, function(req, res){
//
//   User.findById(req.token._id, function(err, user){
//       console.log('user:   ', user);
//       res.render('profile', {userData: user, title: 'Photo Drop', login: true});
//   });
// });



router.get('/logout', User.isLoggedIn, function(req, res){
  res.clearCookie('userToken').send('logout success!');
});



module.exports = router;
