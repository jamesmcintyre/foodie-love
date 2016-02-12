'use strict';

var app = angular.module('foodieLove', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/partials/home/home.html', controller: 'homeCtrl' })
    .state('register', { url: '/register', templateUrl: '/partials/home/register.html', controller: 'authCtrl' })
    .state('login', { url: '/login', templateUrl: '/partials/home/login.html', controller: 'authCtrl' })
    .state('profile', { url: '/user/profile', templateUrl: '/partials/user/profile.html', controller: 'userProfileCtrl' })
    .state('browse', { url: '/users/browse', templateUrl: '/partials/users/browse.html', controller: 'usersBrowseCtrl' })

  $urlRouterProvider.otherwise('/');
});
