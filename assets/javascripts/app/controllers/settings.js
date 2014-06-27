/* global App, $, Ember */
App.SettingsController = Ember.ObjectController.extend({
  importChannels: [],
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
    importChannelsAndSubscribe: function() {
      $.post({
        url: '/api/batch/subscriptions',
        data: {channels: this.get('importChannels')},
        success: function() {
          this.set('importChannels', []);
        },
        error: function() {
          alert("Error");
        }
      });
    }
  }
});
