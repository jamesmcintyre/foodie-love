'use strict';

var app = angular.module('foodieLove');

app.controller('authCtrl', function($scope, $http, $state, AuthSvc, $cookies) {


//REGISTER

//send register form data to node server, if err show err
//go to login

  // $scope.registerUser = function(newUser){
  //   $http.post('/users/register', newUser)
  //   .then(function(res){
  //     console.log('register response: ',res);
  //     $state.go('login');
  //   }, function(err){
  //     console.log(err);
  //   });
  // }

  $scope.registerUser = function(newUser){
    AuthSvc.registerUser(newUser);
  }


//LOGIN

//send login form, if user exists go to profile
  // $scope.loginUser = function(user){
  //   $http.post('/users/login', user)
  //   .then(function(res){
  //     console.log('login response: ',res);
  //     $scope.
  //     $state.go('profile');
  //   }, function(err){
  //     console.log('login error: ', err);
  //   });
  // }

  $scope.loginUser = function(user){
    AuthSvc.loginUser(user);
  }

  $scope.isLoggedIn = function(){
    AuthSvc.isLoggedIn();
  }



//LOGOUT
//delete cookie


});
