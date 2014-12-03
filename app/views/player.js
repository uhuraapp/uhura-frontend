import Ember from 'ember';

export default Ember.View.extend({
  hasModel: false,
  classNameBindings: ['hasModel::uk-hidden'],
  classNames: ["the-player"],
  contentDidChange: function() {
    var controller = this.get('controller');
    var model = controller.get('model');
    if(model){
      var audio = this.$('audio');
      audio.attr('src', model.get('source_url'));
      audio.mediaelementplayer(this.get('mediaOptions'));
      controller.set('audio', audio[0]);
      this.set('hasModel', true);
    }
  }.observes('controller.model'),
  mediaOptions: {
    alwaysShowControls: true,
    audioVolume: 'horizontal',
    features: ['playpause','progress','volume']
  }
});
