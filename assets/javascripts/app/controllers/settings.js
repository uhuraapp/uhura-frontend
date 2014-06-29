/* global App, $, Ember */
App.SettingsController = Ember.ObjectController.extend({
  importChannels: [],
  imported: false,
  actions: {
    addImportItem: function (channels) {
      for (var i = channels.length - 1; i >= 0; i--) {
        channels[i].temp_id = i;
      }
      this.set('importChannels', channels);
    },
    removeImportItem: function (temp_id) {
      var channels = this.get('importChannels'),
          item     = _.findWhere(channels, {temp_id: temp_id}),
          index    = _.indexOf(channels, item);

      channels.splice(index, 1);

      this.set('importChannels', []);
      this.set('importChannels', channels);
      $("[data-temp-id='"+temp_id+"']").remove();
    },
    importChannelsAndSubscribe: function () {
      var _this = this,
          urls  = _.map(this.get('importChannels'), function(c) { return c.url; });

      $.post("/api/batch/subscriptions-by-url", {urls: urls})
        .done(function () {
          _this.set('importChannels', []);
          _this.set('imported', true);
        })
        .fail(function () {
          alert("error");
        });
    }
  }
});
