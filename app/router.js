import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('channel', {
    path: '/channels/:channel_id'
  }, function () {
    this.route('episode', {
      path: '/:episode_id'
    });
  });
  this.route('login');

  this.route('users', function() {
    this.route('settings');
  });
  this.route('explore');
  this.route('explore.category', {
    path: '/explore/c/:category_id'
  });
  this.route('channel_by_url', {
    path: '/c/*url'
  });
});
