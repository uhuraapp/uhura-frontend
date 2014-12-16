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
            UserUtils.getUser().then(function(user){
              _this.get('session').authenticate('authenticator:uhura', user);
              _this.set('loading', false);
            }, function(){ alert("error"); });

          }
        } catch(e){
          console.log(e);
        }
      };

      var timer = window.setInterval(checkLogin, 500);
    }
  }
});
