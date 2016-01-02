import Ember from 'ember';
import InvalidateSessionMixin from '../mixins/invalidate-session-mixin';

const { inject: { service } } = Ember;

export default Ember.Component.extend(InvalidateSessionMixin, {
  session: service('session'),
  elementId: 'topbar',
  simple: false,
  dark: false,
  classNameBindings: ['simple', 'dark']
});
