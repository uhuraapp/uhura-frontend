import { default as EmberSync } from 'ember-sync';


export function initialize( container, application ) {
  container.register("lib:emberSync", EmberSync);
  container.register('model:ember-sync-queue-model', EmberSync.create().get('queueModel'));

  application.inject('route', 'emberSync', "lib:emberSync");
  application.inject('controller', 'emberSync', "lib:emberSync");
}

export default {
  name: 'ember-sync',
  initialize: initialize
};
