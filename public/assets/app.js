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
  this.resource('channel', {path: '/channels/:id'});
  this.resource('dashboard', function(){
    this.resource('dashboard.channel', {path: '/:channel_id'})
  })
});
Uhura.Router.reopen({
   /**
    * Tracks pageviews if google analytics is used
    */
    didTransition: function(infos) {
     this._super(infos);
     if (window.ga === undefined) { return; }

     Ember.run.next(function(){
      ga('send', 'pageview', window.location.hash.substr(1));
    });
   }
 });

Uhura.IndexRoute = Ember.Route.extend({
  setupController: function(controller){
    "use strict"
    $.getJSON("/api/channels", {featured: true}).then(function(data){
      controller.set('channels', data.channels)
    });
  },
  activate: function(){
     $(document).attr('title', 'Uhura');
  }
})

Uhura.ChannelsRoute = Ember.Route.extend({
  model: function () {
    'use strict';
    return this.store.find('channel');
  },
  activate: function(){
     $(document).attr('title', 'Uhura - Poscasts');
  }
});

Uhura.ChannelRoute = Ember.Route.extend({
  model: function (params) {
    'use strict';
    return this.store.find('channel', params.id);
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
  setupController: function(controller, model) {
    jQuery.getJSON("/api/subscriptions/" + model.id + "/episodes").then(function (data) {
      controller.set('episodes', data.episodes)
    });
  }
})

// model

Uhura.Channel = DS.Model.extend({
  title:      DS.attr('string'),
  image_url:  DS.attr('string'),
  url:        DS.attr('string'),
  uri:        DS.attr('string'),
  description:DS.attr('string'),
  copyright:  DS.attr('string'),
  subscribed: DS.attr('boolean'),
  episodes:   DS.hasMany('episode', {async: true}),
  to_view:    DS.attr("number")
});

Uhura.Episode = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  source_url: DS.attr('string'),
  playing: DS.attr('boolean'),
  channel: DS.belongsTo('channel'),
  channel_id: DS.attr(),
  listened: DS.attr(),
  listenedChanged: function(){
    _this = this
    $.post("/api/episodes/" + this.get('id') + "/listened").then(function() {
      ga('send', 'event', 'button', 'listened', 'episode', _this.id);
    })
  }.observes('listened')
});

Uhura.Subscription = DS.Model.extend({
  channel: DS.belongsTo('channel'),
  episodes: DS.hasMany('episode', {async: true})
});

// Methods

Uhura.Helpers = {}
Uhura.Helpers.subscribeChannel = function(controller, id){
  var successSubscribe = function() {
    controller.store.find('channel', id).then(function(channel){
      channel.set('subscribed', true);
      ga('send', 'event', 'button', 'subscribe', 'channel', channel.id);
    });
  };

  var subscribeFn = function(){
    $.ajax({
      url: '/api/channels/' + id + '/subscribe',
      success: successSubscribe
    });
  };

  window.auth.withLoggedUser(subscribeFn);
}

// controller

Uhura.ChannelsController = Ember.ArrayController.extend({
  actions: {
    subscribeChannel: function(idParams) {
      'use strict';
      Uhura.Helpers.subscribeChannel(this, idParams)
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
          $(".new-channel").val("")
        });
      };

      window.auth.withLoggedUser(newChannelFn);
    }
  }
});

Uhura.ChannelController = Ember.ObjectController.extend({
  actions: {
    subscribeChannel: function(id) {
      'use strict';
      Uhura.Helpers.subscribeChannel(this, id)
    },
    listened: function(episode){
      episode.set('listened', true)
      $('.audio[data-id=' + episode.id + ']').attr('data-listened', true)
    }
  }
});

Uhura.DashboardController = Ember.ArrayController.extend({
  actions: {
    listened: function(episode){
      episode.set('listened', true)
      $('.audio[data-id=' + episode.id + ']').attr('data-listened', true)
    }
  }
})

Uhura.DashboardIndexController = Ember.ArrayController.extend({
 needs: "dashboard",
 actions: {
  listened: function(episode){
    episode.set('listened', true)
    $('.audio[data-id=' + episode.id + ']').attr('data-listened', true)
  }
}
})

Uhura.DashboardChannelController = Ember.ArrayController.extend({
  content: [],
  actions: {
    listened: function(episode){
      episode.set('listened', true)
      $('.audio[data-id=' + episode.id + ']').attr('data-listened', true)
    }
  }
})


Uhura.PlayerController = Ember.ObjectController.extend({
  content: [],
  actions: {
    play_pause: function(episode){
      Uhura.PlayerX.play_pause()
    }
  }
}).create();

// view

Uhura.PlayerView = Ember.View.extend({
  templateName: 'player',
  controller: Uhura.PlayerController,
});

// component

Uhura.PlayPauseButtonComponent = Ember.Component.extend({
  actions: {
    play: function(episode){
      var __playing = function(episode){
        return function(){
          $("#subscribeButton").click()
          $("#episodes [data-playing]").click()

          episode.set('started', true)
          episode.set('playing', true)
          Uhura.PlayerX.play(episode)
        }
      }
      window.auth.withLoggedUser(__playing(episode));
    },

    play_pause: function(){
      Uhura.PlayerX.play_pause()
    }
  }
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

$(document).ajaxError(function( event, request, settings ) {
  'use strict';
  console.log('URL:', settings.type, settings.url);
  console.log('Status:', request.status);
  if(request.status == 403){
    window.auth.logged = false;
    window.auth.withLoggedUser(function(){ window.location.reload() })
  }
});

$(document).ready(function(){
  $(document).on( "click", "#episodes h3", function(e) {
    var target = $(e.currentTarget),
    descriptionIsDisplayed = target.next('.description').is(':visible')

    $(".description").slideUp()
    $("#episodes li h3 i").removeClass("fa-chevron-up").addClass("fa-chevron-down")

    if(!descriptionIsDisplayed){
      target.next(".description").slideDown()
      target.find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up")
    }
  });
})
