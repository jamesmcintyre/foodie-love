'use strict';

var app = angular.module('foodieLove');

app.controller('userProfileCtrl', function($scope, $state, $cookies, AuthSvc) {
  console.log('userProfileCtrl');
  //console.log( $cookies.getAll() );


  var allCookies = $cookies.getAll();
  console.log(allCookies);

  $scope.isLoggedIn = function(){
    // console.log(allCookies);
    return AuthSvc.isLoggedIn();
  }

  // $scope.isLoggedIn = function(){
  //   console.log('is logged in test');
  //   //var allCookies = $cookies.getAll();
  //   console.log('cookies: ', allCookies);
  // }




});
