import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('channel.new');
  this.route('channel', {path: "/:channel_id"});
  this.route('donate');
  this.resource('settings', function() { });
});

export default Router;
