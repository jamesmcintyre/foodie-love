'use strict';

var app = angular.module('foodieLove');

app.controller('userProfileCtrl', function($scope, $state, $cookies, AuthSvc, jwtHelper) {
  console.log('userProfileCtrl');
  // console.log(moment());
  //console.log( $cookies.getAll() );


  // var allCookies = $cookies.getAll();
  // console.log('all the fucking cookies: ',allCookies);
  // console.log('just the one fuckin cookie: ', );

  $scope.isLoggedIn = function(){
    // console.log(allCookies);
    AuthSvc.isLoggedIn();
  }





  //$scope.loginStatus = AuthSvc.isLoggedIn()

  console.log('testesfdsd:  ',$scope.loginStatus);



  // $scope.isLoggedIn = function(){
  //   console.log('is logged in test');
  //   //var allCookies = $cookies.getAll();
  //   console.log('cookies: ', allCookies);
  // }




});
