window.Uhura = Ember.Application.create({
  LOG_TRANSITIONS: true
});

Uhura.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});

// router

Uhura.Router.map(function () {
  this.resource('channels');
  this.resource('channel', {path: '/channels/:uri'});
});

Uhura.ChannelsRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('channel');
  }
});

Uhura.ChannelRoute = Ember.Route.extend({
  model: function (params) {
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
  subscribed:  DS.attr('boolean')
});


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
            debugger
          }});
      }

      var user = window.auth.withLoggedUser(subscribeFn);
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
  }

  Auth.prototype.login = function(success) {
    $.ajax({
      url: "/api/users/saveState",
      data: {fn: success}
    }).done(function(){
      window.location = "/api/authorize";
    });
  };

  Auth.prototype.withLoggedUser = function(success) {
    var _this = this;

    $.ajax({
      url: "/api/users/current_user",
      statusCode: {
        200: function(){
          success();
        },
        403: function(){
          _this.login(success);
        }
      }
    });
  };

  return Auth;
})();

window.auth = new Uhura.Auth();

$( document ).ajaxError(function( event, request, settings ) {
  console.log("Event:", event);
  console.log("Request:", request);
  console.log("Settings:", settings);
});
