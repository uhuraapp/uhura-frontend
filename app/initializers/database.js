export function initialize(container, application ) {
  application.deferReadiness();

  db.open( {
    server: 'uhura',
    version: 1,
    schema: {
      playing: {
        key: { keyPath: 'episodeId' },
        indexes: {
          episodeId: { },
        }
      }
    }
  } ).then( function ( db ) {
    application.register('app:database', db, { instantiate: false });

    Ember.A(['route', 'controller', 'view']).forEach(function(scope){
      application.inject(scope, 'db', 'app:database');
    })

    application.advanceReadiness();
  } );
}


export default {
  name: 'database',
  initialize: initialize
};
