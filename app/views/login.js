import Ember from 'ember';
import Login from '../services/login';

export default Ember.View.extend({
  openModal: function () {
    Ember.run.scheduleOnce('afterRender', () => {
      var login = new Login(this.container);
      var modal = login.start(()=>{}, {center: true, bgclose: false, keyboard: false});
      modal.on("hide.uk.modal", () => {
        window.location.href = "/";
        window.location.hash = "#";
      });
    });
  }.on('didInsertElement')
});
