/* global Ember, DS */

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
});

Uhura.ChannelsRoute = Ember.Route.extend({
  model: function () {
    'use strict';
    return this.store.find('channel');
  }
});

Uhura.ChannelRoute = Ember.Route.extend({
  model: function (params) {
    'use strict'
    return this.store.find('channel', params.uri);
  }
});

// model

Uhura.Channel = DS.Model.extend({
  title:       DS.attr('string'),
  image_url:   DS.attr('string'),
  url:         DS.attr('string'),
  uri:         DS.attr('string'),
  description: DS.attr('string'),
  copyright:   DS.attr('string'),
  subscribed:  DS.attr('boolean'),
  episodes:    DS.hasMany('episode'),
});

Uhura.Episode = DS.Model.extend({
  title: DS.attr('string')
})



// controller

Uhura.ChannelsController = Ember.ArrayController.extend({
  actions: {
    subscribeChannel: function(idParams) {
      var _this = this,
      id = idParams,
      subscribeFn = function(url){
        $.ajax({
          url: "/api/channels/" + id + "/subscribe",
          success: function(data){
            alert("Channel subscribed");
          }
        });
      }

      window.auth.withLoggedUser(subscribeFn);
    },
    newChannel: function() {
      var _this = this,
      newChannelFn = function(){
        var url = _this.get('url'),
        subscribe = _this.store.createRecord('channel', {
          url: url
        });
        subscribe.save();
      }

      var user = window.auth.withLoggedUser(newChannelFn);
    }
  }
})


// auth

Uhura.Auth = (function() {
  function Auth() {
    this.logged = false
  }

  Auth.prototype.authorize_url = function(){
    return window.location.protocol + "//" + window.location.host + "/api/authorize"
  }

  Auth.prototype.login = function(callback) {
    var loginWindow = window.open(this.authorize_url(),'login','height=500,width=800');
    window.focus();
    loginWindow.focus();
    var checkLogin = function(){
      try {
        if(loginWindow.closed) {
          clearInterval(timer);
          callback();
          this.current_user();
        }
      } catch(e){
      }
    }

    var timer = window.setInterval(checkLogin, 500);
  };


  Auth.prototype.withLoggedUser = function(callback) {
    if(this.logged){
      callback()
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
  console.log("URL:", settings.type, settings.url);
  console.log("Status:", request.status);
  window.auth.logged = false
});
