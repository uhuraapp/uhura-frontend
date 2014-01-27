/* global Ember, DS, $, console  */
var Uhura = Ember.Application.create({
  LOG_TRANSITIONS: true
});

Uhura.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});

// router

Uhura.Router.map(function () {
  'use strict';
  this.resource('channels');
  this.resource('channel', {path: '/channels/:uri'});
  this.resource('dashboard', function(){
    this.resource('dashboard.channel', {path: '/:uri'})
  })
});

Uhura.ChannelsRoute = Ember.Route.extend({
  model: function () {
    'use strict';
    return this.store.find('channel');
  }
});

Uhura.ChannelRoute = Ember.Route.extend({
  model: function (params) {
    'use strict';
    return this.store.find('channel', params.uri);
  }
});

Uhura.DashboardRoute = Ember.Route.extend({
  setupController: function(controller) {
    this.store.find('subscription').then(function(subscriptions){
      controller.set('subscriptions', subscriptions)
    });
  }
});


Uhura.DashboardChannelRoute = Ember.Route.extend({
  model: function (params) {
    return jQuery.getJSON("/api/subscriptions/" + params.uri + "/episodes");
  }
})

// model

Uhura.Channel = DS.Model.extend({
  title:      DS.attr('string'),
  image_url:  DS.attr('string', {
                defaultValue: function(){ 'use strict'; return;  }
              }),
  url:        DS.attr('string'),
  uri:        DS.attr('string'),
  description:DS.attr('string'),
  copyright:  DS.attr('string'),
  subscribed: DS.attr('boolean'),
  episodes:   DS.hasMany('episode'),
  to_view:    DS.attr()
});

Uhura.Episode = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
});

Uhura.Subscription = DS.Model.extend({
  channel: DS.belongsTo('channel')
});

// controller

Uhura.ChannelsController = Ember.ArrayController.extend({
  actions: {
    subscribeChannel: function(idParams) {
      'use strict';
      var id = idParams, _this = this;
      var successSubscribe = function() {
                  _this.store.find('channel', idParams).then(function(channel){
                    channel.set('subscribed', true);
                  });
                };

      var subscribeFn = function(){
            $.ajax({
              url: '/api/channels/' + id + '/subscribe',
              success: successSubscribe
            });
          };

      window.auth.withLoggedUser(subscribeFn);
    },
    newChannel: function() {
      'use strict';
      var _this = this;
      var newChannelFn = function(){
        var url = _this.get('url'),
        subscribe = _this.store.createRecord('channel', {
          url: url
        });
        subscribe.save().then(function(c){
          console.log(c);
        });
      };

      window.auth.withLoggedUser(newChannelFn);
    }
  }
});

// view

Uhura.PlayerView = Ember.View.extend({
  templateName: 'player'
});

Uhura.SubscribeButton = Ember.Component.extend({
  tagName: 'button'
});

// auth

Uhura.Auth = (function() {
  'use strict';

  function Auth() {
    this.logged = false;
  }

  Auth.prototype.authorize_url = function(){
    return window.location.protocol + '//' + window.location.host + '/api/authorize';
  };

  Auth.prototype.login = function(callback) {
    window.focus();

    var loginWindow = window.open(this.authorize_url(),'login','height=500,width=800');

    loginWindow.focus();

    var checkLogin = function(){
      try {
        if(loginWindow.closed) {
          clearInterval(timer);
          callback();
          window.auth.logged = true;
        }
      } catch(e){
        console.log(e);
      }
    };

    var timer = window.setInterval(checkLogin, 500);
  };


  Auth.prototype.withLoggedUser = function(callback) {
    if(this.logged){
      callback();
    } else {
      this.login(callback);
    }
    //$.ajax({
    //  url: "/api/users/current_user",
    //  statusCode: {
    //    200: function(){
    //      success();
    //    },
    //    403: function(){
     //     _this.login(success);
    //    }
    //  }
    //});
  };

  return Auth;
})();

window.auth = new Uhura.Auth();

$( document ).ajaxError(function( event, request, settings ) {
  'use strict';
  console.log('URL:', settings.type, settings.url);
  console.log('Status:', request.status);
  window.auth.logged = false;
});
