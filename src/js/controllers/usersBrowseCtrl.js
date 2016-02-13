'use strict';

var app = angular.module('foodieLove');

app.controller('usersBrowseCtrl', function($scope, $cookies, $state, AuthSvc, $http) {


// $scope.userlist = UserDataSvc.browseUsers(currentUser)
//
// UserDataSvc.browseUsers(err, currentUser)

  $scope.loginStatus = AuthSvc.isLoggedIn();

  if(!$scope.loginStatus){
    $state.go('login');
  }


  // $scope.usersList = function(){
  $http.get('/users/browse')
  .then(function(res){
    console.log(res);
    $scope.usersList = res.data;
  }, function(err){
    console.log(err);
  })
  // }



});
