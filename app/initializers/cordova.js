export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
  document.addEventListener('deviceready', function () {
    cordova.plugins.backgroundMode.setDefaults({
      title: 'Processsing...',
      text:'Processsing...'
    });
  }, false);
}

export default {
  name: 'cordova',
  initialize: initialize
};
