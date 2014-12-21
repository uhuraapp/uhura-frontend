import Ember from 'ember';

export default Ember.Controller.extend({
  actions:  {
    autheticate: function (provider) {
      this.get('session').authenticate('authenticator:uhura', provider);
    }
  },

  tokenDidChange: function() {
    if(this.get('session.token')) {
      var _this = this;
      this.container.lookup("route:application").model().then(function(data){
        _this.container.lookup("controller:application").set('model', data.content);
      });
    }
  }.observes('session.token'),
});
