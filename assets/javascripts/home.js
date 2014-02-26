/* global  $ */

$(document).ready(function(){
  'use strict';

  var emailField = $('input#email');
  emailField.focus();

  if(emailField.val().length > 0)  $('input#password').focus();

  var signInModalId = '#sign-in';

  if(document.location.hash === signInModalId) {
    var modal = new $.UIkit.modal.Modal(signInModalId);
    modal.show();
    emailField.blur();
  }

  $(signInModalId).on({
    'uk.modal.show': function(){
      $('input#email-sign').focus();
    },
    'uk.modal.hide': function(){
      emailField.focus();
    }
  });

  validateEmail($('form#signin'), $('input#email-sign'));
  validateEmail($('form#fast-signup'), $('#email'));
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
