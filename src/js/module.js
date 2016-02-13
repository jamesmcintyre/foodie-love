'use strict';

var app = angular.module('foodieLove', ['ui.router', 'ngCookies', 'angular-jwt']);


app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/partials/home/home.html', controller: 'homeCtrl' })
    .state('register', { url: '/register', templateUrl: '/partials/home/register.html', controller: 'authCtrl' })
    .state('login', { url: '/login', templateUrl: '/partials/home/login.html', controller: 'authCtrl' })
    .state('profile', { url: '/user/profile', templateUrl: '/partials/user/profile.html', controller: 'userProfileCtrl' })
    .state('browse', { url: '/users/browse', templateUrl: '/partials/users/browse.html', controller: 'usersBrowseCtrl' })

  $urlRouterProvider.otherwise('/');
});


// app.run(function($rootScope, $state, $cookies, AuthSvc){
//
//   $rootScope.loginStatus = AuthSvc.isLoggedIn();
//   console.log('app run: ', $rootScope.loginStatus);
//
// });
