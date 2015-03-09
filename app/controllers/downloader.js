/* global cordova, FileTransfer */
import Ember from 'ember';
import config from '../config/environment';

var clamp = function(n, min, max) {
  if (n < min) { return min; }
  if (n > max) { return max; }
  return n;
};

var inc = function(amount, n) {
  if (typeof amount !== 'number') {
    amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
  }

  n = clamp(n + amount, 0, 0.994);
  return n;
};

var incProgress = function(n) {
  return inc(Math.random() * 0.00002, n);
};

export default Ember.Controller.extend({
  downloaded: function(episode){
    return function(entry){
      episode.set('progress', 100);
      episode.set('downloaded', true);
      episode.set('offline_url', entry.toURL());
    };
  },
  storePath: function() {
    return cordova.file.externalDataDirectory || cordova.file.dataDirectory;
  },
  download: function(episode){
    var _this = this;
    return function(){
      var fileTransfer = new FileTransfer();
      episode.set('progress', 0);
      fileTransfer.onprogress = function(progressEvent) {
          if (progressEvent.lengthComputable) {
            episode.set('progress', progressEvent.loaded / progressEvent.total);
          } else {
            episode.set('progress', incProgress(episode.get('progress')));
          }
      };
      var assetURL = config.API_URL + '/v2/episodes/' + episode.id + '/download';
      fileTransfer.download(assetURL, _this.storePath() + episode.id,
                               _this.downloaded(episode),
                              function(err) {
                                console.log("Error");
                                console.dir(err);
                                episode.set('progress', 0);
                              });
    };
  },
  start: function(episode) {
    window.resolveLocalFileSystemURL(this.storePath() + episode.id, this.downloaded(episode), this.download(episode));
  },
  check: function(episode) {
    window.resolveLocalFileSystemURL(this.storePath() + episode.id, this.downloaded(episode), function(){});
  },
  remove: function(episode) {
    // TODO: remove episodes
  }
});
