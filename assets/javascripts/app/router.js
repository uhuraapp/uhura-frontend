App.Router.map(function () {
  'use strict';
  this.route('channel.new', {path: '/add'});
  this.route('settings', {path: '/settings'});
  this.route('channel', {path: '/:channel_id'});
  this.route('episode', {path: '/:channel_id/:episode_id'});
  this.route('donate');
});

App.Router.reopen({
  rootURL: '/app/',
  location: 'history',
  didTransition: function(infos) {
    this._super(infos);
    $(".uk-active").click();

    if (window.ga === undefined) { return; }

    Ember.run.next(function(){
      ga('send', 'pageview', window.location.pathname);
    });
  }
});
