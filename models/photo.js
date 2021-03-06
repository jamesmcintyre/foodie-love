'use strict'

var mongoose = require('mongoose');
var async = require('async');
var uuid = require('node-uuid');
var aws = require('aws-sdk');




//PULLING IN AWS S3
var s3 = new aws.S3();
var Photo;


//PHOTO SCHEMA
var photoSchema = mongoose.Schema({
  name: { type: String},
  url: {type: String},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});



//ADD PHOTO METHOD

photoSchema.statics.addPhoto = function(addReq, cb){

  var imageFiles = addReq.files;
  var reqBody = addReq.body;

  console.log(reqBody);

  async.each(imageFiles, function(imageFile, cb){

    var imageBuffer = imageFile.buffer;
    var filename = imageFile.originalname;
    var key = uuid.v1();


    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,  //name of file on s3
      Body: imageBuffer  //buffer of file
    };

    s3.putObject(params, function(err, data){  //uploads to s3
      if(err) console.log(err);
      console.log('success to aws:  ', data);

      var match = filename.match(/\.\w$/);
      var ext = match ? match[0] : "";
      var url = process.env.AWS_URL + process.env.AWS_BUCKET + "/" + key + ext;

      var photo = new Photo({
        url: url,
        name: reqBody.name,
        user: reqBody.userId
      });

      photo.save(function(err){
        if(err) return console.log(err);
        console.log('url: ', url);
      });

    });


  }, function(){ //async completion callback
    res.status(200).send('images added!');
  });//close of async

}//close of method





//DELETE PHOTO METHOD

photoSchema.statics.deletePhoto = function(photoId, cb){
  Photo.findByIdAndRemove(photoId, function(err){
    if(err) return res.status(400).send(err);
    return;
  });
}



Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
