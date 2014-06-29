App.Category = DS.Model.extend({
  name: DS.attr(),
  channels:   function(){
    var _this = this;
    jQuery.getJSON("/api/categories/"+this.get('id')+"/channels").then(function(data){
      var channels = [];

      for (var i = data.channels.length - 1; i >= 0; i--) {
        channels.push(channel);
      }

      $("#loading-page").parent().remove();
      _this.set('channels', channels);
    });
    return [];
  }.property("id")
});
