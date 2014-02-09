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
  this.resource('channel', {path: '/channels/:id'}, function(){
    this.resource('channel.episode', {path: '/:episode_id'})
  });
  this.resource('dashboard', function(){
    this.resource('dashboard.channel', {path: '/:channel_id'})
  })
});

Uhura.Router.reopen({
   location: 'history',
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
    var title = 'Uhura App - Podcasts Manager - Listen your podcasts Here!'
    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title)  }
})

Uhura.ChannelsRoute = Ember.Route.extend({
  model: function () {
    'use strict';
    return this.store.find('channel');
  },
  activate: function(){
    var title = 'Uhura App - Channels - Podcasts Manager - Listen your podcasts Here!';
    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title)
  }
});

Uhura.ChannelRoute = Ember.Route.extend({
  model: function (params) {
    'use strict';
    return this.store.find('channel', params.id);
  },
  activate: function(){
    var title = this.modelFor('channel').get('title')

    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title)
  }
});

Uhura.ChannelEpisodeRoute = Ember.Route.extend({
  activate: function(){
    var title = this.modelFor('channel.episode').get('title'),
        channel_title = this.modelFor('channel').get('title');

    $(document).attr('title', title + ' - ' + channel_title + ' - Uhura App');
    $("[property='og:title']").attr('content', title + ' - ' + channel_title + ' - Uhura App')
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
      for (var i = data.episodes.length - 1; i >= 0; i--) {
        episodes = data.episodes[i]
        data.episodes[i] = Ember.Object.create(episodes)
      };
      controller.set('episodes', data.episodes)
    });
  }
})

// model

Uhura.Channel = DS.Model.extend({
  title:      DS.attr(),
  image_url:  DS.attr(),
  url:        DS.attr(),
  uri:        DS.attr(),
  description:DS.attr(),
  copyright:  DS.attr(),
  subscribed: DS.attr(),
  episodes:   DS.hasMany('episode', {async: true}),
  to_view:    DS.attr()
});

Uhura.Episode = DS.Model.extend({
  title:           DS.attr(),
  description:     DS.attr(),
  source_url:      DS.attr(),
  playing:         DS.attr(),
  channel:         DS.belongsTo('channel'),
  channel_id:      DS.attr(),
  listened:        DS.attr(),
  published_at:    DS.attr(),
  listenedChanged: function(){
    Uhura.Helpers.listened(this.get('id'))
  }.observes('listened'),
  url: function(){
    return "http://uhuraapp.com/channels/" + this.get("channel_id") + "/" + this.get("id")
  }.property("channel_id", "id")
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

Uhura.Helpers.unsubscribeChannel = function(controller, channel_id, subscription_id){
  var successUnsubscribe = function(){
    controller.get('subscriptions').update()
    controller.get('subscriptions').forEach(function(s){
      if(s.get('channel').id == channel_id) {
        s.deleteRecord()
      }
    });
  };

  var unsubscribeFn = function(){
    $.ajax({
      url: '/api/channels/' + channel_id + '/subscribe',
      method: 'DELETE',
      success: successUnsubscribe
    });
  };

  window.auth.withLoggedUser(unsubscribeFn);
};

Uhura.Helpers.listened = function(episode_id){
  $.post("/api/episodes/" + episode_id + "/listened").then(function() {
    ga('send', 'event', 'button', 'listened', 'episode', episode_id);
    $('.audio[data-id=' + episode_id + ']').attr('data-listened', true)
  })
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
  episodes: (function() {
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['published_at'],
      sortAscending: false,
      content: this.get('content.episodes')
    });
  }).property('content.episodes'),

  actions: {
    subscribeChannel: function(id) {
      'use strict';
      Uhura.Helpers.subscribeChannel(this, id)
    },
    listened: function(episode){
      episode.set('listened', true)
      Uhura.Helpers.listened(episode.id)
    }
  }
});


Uhura.DashboardController = Ember.ArrayController.extend({
  actions: {
    unsubscribe: function(idParams) {
      'use strict';
      Uhura.Helpers.unsubscribeChannel(this, idParams);
    }
  }
})

Uhura.DashboardIndexController = Ember.ArrayController.extend({
  needs: "dashboard",
  actions: {
    listened: function(episode){
      Uhura.Helpers.listened(episode.id)
    },
  }
})

Uhura.DashboardChannelController = Ember.ArrayController.extend({
  content: [],
  actions: {
    listened: function(episode){
      Uhura.Helpers.listened(episode.id)
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
