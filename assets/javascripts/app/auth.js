App.Auth = (function() {
  'use strict';
  function Auth() {
    $.cookie("logged", "true");
  }

  Auth.prototype.isLogged = function() {
    return $.cookie("logged") === "true";
  };

  Auth.prototype.withLoggedUser = function(callback) {
    callback();
  };

  return Auth;
})();

window.auth = new App.Auth();
