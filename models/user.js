'use strict';

var mongoose = require('mongoose');
var Firebase = require('firebase');
var jwt = require('jwt-simple');
var moment = require('moment');
var dotenv = require('dotenv');

//pull in env variables if local
dotenv.config();

//PSUEDO CODE NOTE
// People.find({}, (err users) => {
//   res.send(users)
// }).populate('photosArray')



var JWT_SECRET = process.env.JWT_SECRET;
var FIREBASE_URI = process.env.FIREBASE_URI;

var ref = new Firebase(FIREBASE_URI);

var User;

var userSchema = mongoose.Schema({
  uid: { type: String, required: true },
  email: { type:String, required: true},
  name: String,
  tags: {type: String},
  preference: {type: String},
  gender: {type: String},
  country: {type: String},
  state: {type: String},
  city: {type: String},
  dob: {type: String},
  interestedin: {type: String},
  favoritecusine: {type: String}
});

userSchema.statics.register = function(userObj, cb) {

  console.log('userObj: ',userObj)

  if(!userObj.email || !userObj.password || !userObj.password2) {
    return cb('Missing required field!');
  }

  if(userObj.password !== userObj.password2){
    return cb('Passwords do not match!');
  }

  ref.createUser(userObj, function(err, userData){
    if(err) return cb(err);
    var user = new User();
    user.uid = userData.uid;
    user.email = userObj.email;
    user.name = userObj.name;
    user.save(cb);
    console.log('User saved!');
  });
};

userSchema.statics.login = function(userObj, cb) {
  if(!userObj.email || !userObj.password) {
    return cb('Missing required field!');
  }

  ref.authWithPassword(userObj, function(err, authData){
    if(err) return cb(err);

    User.findOne({uid: authData.uid}, function(err, user) {
      if(err || !user) return cb(err || 'User not found in db.');
      var token = user.generateToken();
      cb(null, token);
    });
  });
};


userSchema.statics.isLoggedIn = function(req, res, next){
  var token = req.cookies.userToken;
  if(!token) res.status(401).send({error: `Authentication failed, no token`});

  try {
    var payload = jwt.decode(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({error: `Authentication failed: ${err}`});
  }

  if(moment().isAfter( moment(payload.iat, 'X').add(1, 'day') )) {
    return res.status(401).send({error: `Authentication failed, expired: ${err}`});
  };

  req.token = payload;

  next();

};



userSchema.methods.generateToken = function() {
  var payload = {
    uid: this.uid,
    _id: this._id,
    iat: moment().unix()
  };
  // console.log('the jwt secret: ',JWT_SECRET)
  var token = jwt.encode(payload, JWT_SECRET)
  // console.log('the token: ',token)
  return token;
};


User = mongoose.model('User', userSchema);

module.exports = User;
