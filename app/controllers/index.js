import Ember from 'ember';

export default Ember.Controller.extend({
  actions:  {
    autheticate: function (provider) {
     this.get('session').authenticate('authenticator:uhura', provider);
    }
  }
});
