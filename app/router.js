import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('channels');
  this.route('channel', {path: "/channels/:channel_id"});
  this.route('donate');
  this.route('login');

  this.route('users', function(){
    this.resource('settings');
  });
});

export default Router;
