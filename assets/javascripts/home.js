/* global  $ */

$(document).ready(function(){
  'use strict';

  var emailField = $('input#email');
  emailField.focus();

  if(emailField.val().length > 0)  $('input#password').focus();

  validateEmail($('#sign-in'), $('#email'));
  validateEmail($('form#fast-signup'), $('#email'));

  var search = window.location.search;
  if(search.length > 0) {
    search = search.split("=");
    var type = search[0];
    var error = search[1];
    $(".error").removeClass("hide");
    $(".error").text(window.t.get("error."+type+"."+error));
  }
});

var validateEmail = function(form, email) {
  'use strict';

  form.on('submit', function(e){
    if(email.val().length < 1) {
      email.css('border', '1px solid #ff4117');
      e.preventDefault();
    }
  });
};
