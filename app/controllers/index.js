import Ember from 'ember';
import UserUtils from '../utils/user';

export default Ember.Controller.extend({
  actions:  {
    autheticate: function (provider) {
      var _this = this;
      var loginWindow = window.open(UserUtils.authURLForProvider(provider));
      this.set('loading', true);

      var checkLogin = function(){
        try {
          if(loginWindow.closed) {
            clearInterval(timer);
            _this.get('session').authenticate('authenticator:uhura');
            _this.set('loading', false);
          }
        } catch(e){
          console.log(e);
        }
      };

      var timer = window.setInterval(checkLogin, 500);
    }
  }
});
