import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    playpause: function() {
      var player = this.container.lookup('controller:Player');
      player.playpause(this.get('model'));
    }
  }
});
