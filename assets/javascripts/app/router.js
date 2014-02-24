App.Router.map(function () {
  'use strict';
  this.resource('channels');
  this.resource('channel', {path: '/channels/:channel_uri'}, function(){
    this.resource('channel.episode', {path: '/:episode_uri'})
  });
  this.resource('dashboard', function(){
    this.resource('dashboard.channel', {path: '/:channel_id'})
  })
});

App.Router.reopen({
  rootURL: '/app/',
  location: 'history',
  didTransition: function(infos) {
    this._super(infos);
    $(".uk-offcanvas").click();

    if (window.ga === undefined) { return; }

    Ember.run.next(function(){
      ga('send', 'pageview', window.location.hash.substr(1));
    });
  }
});
