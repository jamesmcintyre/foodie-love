'use strict';


app.service('AuthSvc', function($http, $state, $cookies){


  //REGISTER

  //send register form data to node server, if err show err
  //go to login

    this.registerUser = function(newUser){
      $http.post('/users/register', newUser)
      .then(function(res){
        console.log('register response: ',res);
        $state.go('login');
      }, function(err){
        console.log(err);
      });
    }


  //LOGIN

  //send login form, if user exists go to profile
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

    this.isLoggedIn = function(allCookies){
      // console.log('is logged in test');
      // var allCookies = $cookies.getAll();
      // console.log('cookies: ', allCookies);
      // console.log(allCookies);
      $http.get('/users/auth')
      .then(function(res){
        console.log('auth response: ',res);

      }, function(err){
        console.log('auth error: ', err);

      });




    }



  //LOGOUT
  //delete cookie


});
