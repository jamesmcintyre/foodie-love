'use strict';

var app = angular.module('foodieLove');

app.controller('homeCtrl', function($scope, $state, $cookies, AuthSvc) {
  console.log('homeCtrl');

  $scope.loginStatus = AuthSvc.isLoggedIn();

  console.log($scope.loginStatus);

});
