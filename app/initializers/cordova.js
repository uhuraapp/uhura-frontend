/* globals cordova */
export function initialize(/* container, application */) {
  document.addEventListener('deviceready', function () {
    cordova.plugins.backgroundMode.setDefaults({
      title: 'Processsing...',
      text:'Processsing...'
    });
    window.open = cordova.InAppBrowser.open;
  }, false);
}

export default {
  name: 'cordova',
  initialize: initialize
};
