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
  type: DS.attr(),
  mediaApi: function() {
    var type = this.get("type")
    if(type.length === 0) {
      return 'audio';
    }
    media = type.split("/")[0]
    return media;
  }.property('type'),
  durationISO:     function(){
    duration = this.get('duration')
    if(typeof(duke) === "undefined") {
      return ""
    }

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
