'use strict';


app.service('AuthSvc', function($http, $state, $cookies, jwtHelper){


  //REGISTER
  this.registerUser = function(newUser){
    $http.post('/users/register', newUser)
    .then(function(res){
      console.log('register response: ',res);
      $state.go('login');
    }, function(err){
      console.log(err);
    });
  }


  // LOGIN
  this.loginUser = function(user){
    $http.post('/users/login', user)
    .then(function(res){
      console.log('login response: ',res);
      $state.go('profile');
    }, function(err){
      console.log('login error: ', err);
    });
  }


  //IS LOGGED IN??
  this.isLoggedIn = function(){

    var daCookie = $cookies.get('userToken');

    if(!daCookie){
      return false;
    }
    try {
      var payload = jwtHelper.decodeToken(daCookie);
    } catch (err){
      return false;
    }
    // if(moment().isAfter( moment(payload.iat, 'X').add(1, 'day') )) {
    //   $state.go('login');
    // }
    return true;
  }


  //LOGOUT
  this.logoutUser = function(){
    $cookies.remove('userToken');
    $state.go('login');
  }


  //update profile
  this.updateUser = function(user){
    $http.post('/users/update', user)
    .then(function(res){
      console.log('user update response: ',res);
      $state.go('profile');
    }, function(err){
      console.log('user update error: ', err);
    });
  }



});
