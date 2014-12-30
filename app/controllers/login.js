import Ember from 'ember';

export default Ember.Controller.extend({
  authenticator: 'authenticator:uhura',
  actions: {
    authenticate: function (provider) {
      var _this = this;
      this.set('loading', true);
      this.set('loginError', false);

      this.get('session').authenticate('authenticator:uhura', provider).then(function(){
        _this.set('loading', false);
      }, function(){
        _this.set('loginError', true);
      });
    }
  }
});
