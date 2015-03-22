/* global cordova, FileTransfer */
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  downloaded: function(episode){
    return function(entry){
      episode.set('progress', 100);
      episode.set('downloaded', true);
      episode.set('offline_url', entry.toURL());
    };
  },
  storePath: function() {
    if(window.cordova){
      return cordova.file.externalDataDirectory || cordova.file.dataDirectory;
    } else {
      return "/"
    }
  },
  download: function(episode){
    return () => {
      episode.set('progress', 0);
      this.__downloadFile(episode).then(  this.downloaded(episode),
                                          function(err) {
                                            console.log("Error");
                                            console.dir(err);
                                            episode.set('progress', 0);
                                          }
                                       );
    };
  },
  start: function(episode) {
    this.__checkFile(episode).then(this.downloaded(episode), this.download(episode));
  },
  check: function(episode) {
    this.__checkFile(episode).then(this.downloaded(episode));
  },
  remove: function(episode) {
    // TODO: remove episodes
  },

  __checkFile: function (episode) {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      window.resolveLocalFileSystemURL(this.storePath() + episode.id, resolve, reject);
    });
  },

  __downloadFile: function (episode) {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      var assetURL = config.API_URL + '/v2/episodes/' + episode.id + '/download';
      var fileTransfer = new FileTransfer();
      fileTransfer.download(assetURL, this.storePath() + episode.id, resolve, reject);
    });
  }
});
