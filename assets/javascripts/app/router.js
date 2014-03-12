App.Router.map(function () {
  'use strict';
  this.route('channel.new', {path: '/add'});
  this.route('channel', {path: '/:channel_id'});
});

App.Router.reopen({
  rootURL: '/app/',
  location: 'history',
  // didTransition: function(infos) {
  //   this._super(infos);
  //   $(".uk-offcanvas").click();


  //   if (window.ga === undefined) { return; }

  //   Ember.run.next(function(){
  //     ga('send', 'pageview', window.location.hash.substr(1));
  //   });
  // }
});
