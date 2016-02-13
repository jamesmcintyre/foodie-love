'use strict';


app.service('AuthSvc', function($http, $state, $cookies, jwtHelper){


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

    this.isLoggedIn = function(){
      // console.log('is logged in test');
      // var allCookies = $cookies.getAll();
      // console.log('cookies: ', allCookies);
      // console.log(allCookies);
      // $http.get('/users/auth')
      // .then(function(res){
      //   console.log('auth response: ',res);
      //   return true;
      // }, function(err){
      //   console.log('auth error: ', err);
      //   return false;
      // });


      var daCookie = $cookies.get('userToken');

      if(!daCookie){
        return $state.go('login');
      }

      try {
        var payload = jwtHelper.decodeToken(daCookie);
        // console.log(payload);

      } catch (err){
        //console.log('failllllllll');
        return $state.go('login');
      }

      // if(moment().isAfter( moment(payload.iat, 'X').add(1, 'day') )) {
      //   return $state.go('login');
      // }

      return true;

    }



  //LOGOUT
  //delete cookie


});
