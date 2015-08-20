/* globals UIkit */
import Ember from 'ember';

export default Ember.Service.extend({
  init(container, showSpecialMessage) {
    Ember.$('#login-modal p').toggle(showSpecialMessage === true);
    this.container = container;
    this._super();
  },

  start(callback, options) {
    let modal = UIkit.modal('#login-modal', options || { center: true });
    let session = this.container.lookup('simple-auth-session:main');
    session.on('sessionAuthenticationSucceeded', () => {
      modal.hide();
      Ember.$('.uk-modal-page').removeClass('uk-modal-page');
      Ember.run.later(callback, 500);
      session.off('sessionAuthenticationSucceeded');
    });

    modal.show();
    return modal;
  }
});
