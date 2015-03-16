import DS from 'ember-data';

export default DS.IndexedDBAdapter.extend({
  databaseName: 'uhura_database',
  version: 12,

  migrations: function() {
    this.addModel('channel');
    this.addModel('episode');
    this.addModel('subscription');
    this.addModel('emberSyncQueueModel');
  }
});
