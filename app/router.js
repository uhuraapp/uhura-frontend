import Ember from 'ember';
import config from './config/environment';

let Router = Ember.Router.extend({
  location: config.locationType
});

const shareRoute = (router, params) => {
  router.modal('share-modal', { withParams: params, otherParams: ['model'] });
};

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('channel',       { path: '/channels/:channel_id' }, function() {
    this.route('episode',     { path: '/:episode_id' }, function() {
      shareRoute(this, ['share-episode']);
    });
    shareRoute(this, ['share-channel']);
  });

  this.route('channel', { path: '/channels/*channel_id' });

  this.route('subscriptions', function() {
    this.route('new');
  });
  this.route('privacy');
  this.route('login');
  this.route('register');
  this.route('settings', {}, function() {
    this.modal('delete-account', { withParams: ['delete-account'], actions: { deleteAccount: 'deleteAccount' } });
  });
  this.route('terms');
  this.route('profile', { path: '/profiles/:profile_id' });

  this.route('categories', function() {
    this.route('category', { path: '/:id' });
  });
});

export default Router;
