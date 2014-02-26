App.Episode = DS.Model.extend({
  title:           DS.attr(),
  description:     DS.attr(),
  source_url:      DS.attr(),
  playing:         DS.attr(),
  listened:        DS.attr(),
  published_at:    DS.attr(),
  channel_id:      DS.attr('number'),
  uri:             DS.attr(),
  duration:        DS.attr(),
  durationISO:     function(){
    duration = this.get('duration')
    if(duration.split(":").length == 2) {
      duration = "00:"+duration
    }
    duration = moment.duration(duration)
    return duration.toIsoString();
  }.property("duration"),
  channel:         function(){
    return this.store.findById('channel', this.get('channel_id'));
  }.property("channel_id"),
  url: function(){
    host = window.location.host
    return "http://"+host+"/channels/" + this.get("channel_id") + "/" + this.get("uri")
  }.property("channel_id", "id")
});
