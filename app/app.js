import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import routeUtil from './utils/route';

Ember.MODEL_FACTORY_INJECTIONS = true;

let App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

routeUtil();

loadInitializers(App, config.modulePrefix);

let image = new Image();
image.src = '/assets/channel-placeholder.png';

export default App;
