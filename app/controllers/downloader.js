/* global cordova */
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  downloaded: function(episode){
    return () => {
      episode.set('progress', 100);
      episode.set('downloading', false);
      episode.set('downloaded', true);
      episode.set('offline_url', this.storePath() + episode.id);
    };
  },
  storePath: function() {
    if(window.cordova){
      return cordova.file.externalDataDirectory || cordova.file.dataDirectory;
    } else {
      return "/";
    }
  },
  download: function(episode){
    return () => {
      episode.set('progress', 0);
      episode.set('downloading', true);
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
    if(episode.get('downloading')){ return; }
    this.__checkFile(episode).then(this.downloaded(episode), this.download(episode));
  },
  check: function(episode) {
    this.__checkFile(episode).then(this.downloaded(episode), function(){
      episode.set('progress', 0);
      episode.set('downloading', false);
    });
  },
  remove: function(/* episode */) {
    // TODO: remove episodes
  },

  __checkFile: function (episode) {
    return this.__checkFileSizeIsOK(episode)();
  },

  __progressDownloadFn: function (episode) {
    return (event) => {
      if(event.lengthComputable) {
        var progress = (100 * event.loaded) / event.total;
        episode.set('progress', progress.toFixed(2));
      }
    };
  },

  __downloadFile: function (episode) {
    var assetURL = config.API_URL + '/v2/episodes/' + episode.id + '/download';
    return this.__request("GET", assetURL, this.__progressDownloadFn(episode))
        .then(this.__saveFile(episode))
        .then(this.__checkFileSizeIsOK(episode));
  },

  __saveFile: function (episode) {
    return (xhr) => {
      return new Ember.RSVP.Promise( (resolve, reject) => {
        this.filesystem.write(this.storePath() + episode.id, xhr.response).then(resolve, reject);
      });
    };
  },

  __checkFileSizeIsOK: function ( episode) {
    return () => {
      var remoteSize,
          remoteURL = config.API_URL + '/v2/episodes/' + episode.id + '/download';
      return new Ember.RSVP.Promise( (resolve, reject) => {
        return this.__request("HEAD", remoteURL).then((xhr)=> {
          remoteSize = xhr.getResponseHeader('Content-Length');
          return this.filesystem.read(this.storePath() + episode.id);
        }).then( (file) => {
          if(parseInt(remoteSize, 10) === file.size){
            resolve(file);
          } else {
            reject();
          }
        }).catch(reject);
      });
    };
  },

  __request: function (method, url, progressFn) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.responseType = "blob";
      xhr.addEventListener("progress", progressFn, false);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE) {
          if(xhr.status === 200) { resolve(xhr); }
          else { reject(xhr); }
        }
      };
      this.__authorizer().authorize(xhr);
      xhr.send();
    });
  },

  __authorizer: function () {
    return this.container.lookup("authorizer:uhura");
  }
});
