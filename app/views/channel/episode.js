/* globals UIkit */
import Ember from 'ember';

export default Ember.View.extend({
  openModal: function () {
    var modal = UIkit.modal('#episode-' + this.get('controller.model').id, {
      center: true
    });
    modal.on({
      'hide.uk.modal': () => {
        this.get('controller').transitionToRoute('channel', this.get('controller.model.channel'));
      }
    });
    modal.show();
  }.on('didInsertElement')
});
