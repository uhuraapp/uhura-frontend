import Ember from 'ember';
import MaterialDesignMixin from '../mixins/routes/material-design';
import TitledMixin from '../mixins/routes/titled';

const { inject: { service }, computed, set } = Ember;

export default Ember.Route.extend(MaterialDesignMixin, TitledMixin, {
  session: service('session'),

  shouldSetTitle: computed('session.isAuthenticated', function() {
    return this.get('session.isAuthenticated');
  }),

  beforeModel(transition) {
    this.get('session').set('attemptedTransition', transition);
    return this._super(transition);
  },

  model(params) {
    return this.store.find('channel', params.channel_id);
  },

  setupController(controller, model) {
    this._super(controller, model);
    set(controller, 'episodesHasLink', !this.__isURL(model.id));
  },

  __isURL(id) {
    return id.match(/http:\/\//);
  }
});
