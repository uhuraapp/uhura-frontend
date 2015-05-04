/* globals UIkit */
import Ember from 'ember';

export default Ember.Service.extend({
  init: function (container) {
    this.container = container;
    this._super();
  },

  start: function (callback) {
    var modal = UIkit.modal("#login-modal", {center: true});
    var session = this.container.lookup('simple-auth-session:main');
    session.on('sessionAuthenticationSucceeded', function() {
      modal.hide();
      Ember.run.later(function() { callback(); }, 200);
      session.off('sessionAuthenticationSucceeded');
    });

    modal.show();
  }
});
