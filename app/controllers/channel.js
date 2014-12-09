import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    markAllAsListened: function () {
      debugger;
      var i, episodes = this.get('model.episodes').content;
      for(i = 0; i < episodes.length; i++) {
        episodes[i].set ('listened', true);
      }
    }
  }
});
