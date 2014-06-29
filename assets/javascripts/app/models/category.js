App.Category = DS.Model.extend({
  name: DS.attr(),
  fetchChannels: function(){
    var _this = this;
    jQuery.getJSON("/api/categories/"+this.get('id')+"/channels").then(function(data){
      _this.set('channels', data.channels);
    });
  }.property("id"),
  channels: []
});
