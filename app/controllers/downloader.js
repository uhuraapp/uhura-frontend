/* global cordova */
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  downloaded (episode) {
    return () => {
      episode.set('progress', 100);
      episode.set('downloading', false);
      episode.set('downloaded', true);
      episode.set('online_source', episode.get('source'));
      episode.set('source', this.storePath() + this.__episodeFileName(episode));
    };
  },
  storePath () {
    if(window.cordova){
      return cordova.file.externalDataDirectory || cordova.file.dataDirectory;
    } else {
      return "/";
    }
  },
  download (episode){
    return () => {
      episode.set('progress', 0);
      episode.set('downloading', true);
      this.__downloadFile(episode).then(  this.downloaded(episode),
                                          function(err) {
                                            console.log("Error");
                                            console.dir(err);
                                            console.log(err.stack);
                                            episode.set('progress', 0);
                                          }
                                       );
    };
  },
  start (episode) {
    if(episode.get('downloading')){ return; }
    this.__checkFile(episode).then(this.downloaded(episode), this.download(episode));
  },
  check (episode) {
    this.__checkFile(episode).then(this.downloaded(episode), function(){
      episode.set('progress', 0);
      episode.set('downloading', false);
    });
  },
  remove (/* episode */) {
    // TODO: remove episodes
  },

  __checkFile  (episode) {
    // TODO: remove it, always episode should returns Content-Length
    if(this.__isOnlineOnWifi()){
      return this.__checkFileSizeIsOK(episode)();
    } else {
      return this.__checkFileOnFileSystem(episode)();
   }
  },

  __progressDownloadFn (episode) {
    return (event) => {
      if(event.lengthComputable) {
        var progress = (100 * event.loaded) / event.total;
        episode.set('progress', progress.toFixed(2));
      }
    };
  },

  __downloadFile (episode) {
    var assetURL = config.API_URL + '/v2/episodes/' + episode.id + '/download';
    return this.__request("GET", assetURL, this.__progressDownloadFn(episode))
        .then(this.__saveFile(episode))
        .then(this.__checkFileSizeIsOK(episode));
  },

  __saveFile (episode) {
    return (xhr) => {
      return new Ember.RSVP.Promise( (resolve, reject) => {
        this.filesystem.write(this.__episodeFileName(episode), xhr.response).then(resolve, reject);
      });
    };
  },

  __episodeFileName (episode) {
    return episode.id + "." + this.__formatType(episode);
  },

  __formatType (episode) {
    var _splitted = episode.get('source').split('.');
    return _splitted[_splitted.length-1];
  },

  __checkFileOnFileSystem (episode) {
    return () => {
      return this.filesystem.read(this.__episodeFileName(episode));
    };
  },

  __checkFileSizeIsOK (episode) {
    return () => {
      var remoteSize,
          remoteURL = config.API_URL + '/v2/episodes/' + episode.id + '/download';
      return new Ember.RSVP.Promise( (resolve, reject) => {
        return this.__request("HEAD", remoteURL).then((xhr)=> {
          remoteSize = xhr.getResponseHeader('Content-Length');
          return this.filesystem.read(this.__episodeFileName(episode));
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

  __request (method, url, progressFn) {
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

  __authorizer () {
    return this.container.lookup("authorizer:uhura");
  },

  __isOnlineOnWifi () {
    return !window.cordova; // TODO: implement wifi logic
  }
});
