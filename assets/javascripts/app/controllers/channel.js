App.ChannelRoute = Ember.Route.extend({
  model: function (params) {
    'use strict';
    return this.store.find('channel', params.channel_id);
  },
  activate: function(){
    var title = this.modelFor('channel').get('title');

    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title);
  },
  actions: {
    subscribeChannel: Subscriptions.subscribe,
    unsubscribeChannel: Subscriptions.unsubscribe,
    reloadChannel: function() {
      var _this = this;
      $.post("/api/channels/"+this.currentModel.id+"/reload").then(function() {
        _this.currentModel.set("loading", true);
      });
      ga('send', 'event', 'button', 'reload', 'reload channel');
    }
  }
});

App.ChannelController = Ember.ObjectController.extend({
  episodes: (function() {
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['published_at'],
      sortAscending: false,
      content: this.get('content.episodes')
    });
  }).property('content.episodes'),
});

App.ChannelNewRoute  = Ember.Route.extend({
  setupController: function(controller) {
    var _this = this;
    this.store.find("category");
    controller.set("categories", this.store.find("category"));

  },
  deactivate: function(){
    this.controller.set('channels', null);
  },
  activate: function(){
    var title = window.t.get('channel_new.title');

    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title);
  },
  actions: {
    searchChannel: function() {
      var _this = this;
      jQuery.getJSON("/api/s/channels", {q: $("#q").val()}).then(function (data) {
        _this.controller.set('channels', _.map(data.channels, function(c){
          return Ember.Object.create(c);
        }));

        if(data.channels.length < 1) {
          alert(t.get("channel_new.alert.not_found"));
        }
      });
      ga('send', 'event', 'form', 'search', 'search channel');
    },
    addChannel: function() {
      var _this = this;
      jQuery.post("/api/finder", {url: $("#url").val()}).then(function (data) {
        _this.controller.set('channels', _.map(data.channels, function(c){
          return Ember.Object.create(c);
        }));

        if(data.channels.length < 1) {
          alert(t.get("channel_new.alert.not_found"));
        }
       });
      ga('send', 'event', 'form', 'add', 'add channel');
    }
  }
});
