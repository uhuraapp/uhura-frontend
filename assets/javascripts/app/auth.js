App.Auth = (function() {
  'use strict';
  function Auth() {
    $.cookie("logged", "true");
  }

  Auth.prototype.authorize_url = function(){
    return window.location.protocol + '//' + window.location.host + '/api/authorize';
  };

  Auth.prototype.login = function(callback) {
    var loginWindow = window.open(this.authorize_url(),'login','height=500,width=800');

    // loginWindow.focus();

    var checkLogin = function(){
      try {
        if(loginWindow.closed) {
          clearInterval(timer);
          callback();
          // $("#error-403").remove();
          $.cookie("logged", "true");
        }
      } catch(e){
        console.log(e);
      }
    };

    var timer = window.setInterval(checkLogin, 500);
  };

  Auth.prototype.isLogged = function() {
    return $.cookie("logged") === "true"
  }

  Auth.prototype.withLoggedUser = function(callback) {
    if(this.isLogged()){
      callback();
    } else {
      // SignInDialog(callback);
    }
  };

  return Auth;
})();

window.auth = new App.Auth()
