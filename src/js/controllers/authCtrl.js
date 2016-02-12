'use strict';

var app = angular.module('foodieLove');

app.controller('authCtrl', function($scope, $http, $state) {


//REGISTER

//send register form data to node server, if err show err
//go to login

$scope.registerUser = function(newUser){
  $http.post('/users/register', newUser)
  .then(function(res){
    console.log(res);
  }, function(err){
    console.log(err);
  });
}



//LOGIN

//send login form, if user exists go to profile



//LOGOUT
//delete cookie


});
