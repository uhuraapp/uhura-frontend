App.SettingsView  = Ember.View.extend({
  didInsertElement: function(){
    var _this = this;
    $('#opml-import-file').fileupload({
      dataType: 'json',
      url: '/api/opml/import',
      done: function (e, data) {
        _this.get('controller').send('addImportItem', data.result.channels);
      }
    });
  }
});
