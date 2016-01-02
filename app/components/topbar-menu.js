import Ember from 'ember';
import InvalidateSessionMixin from '../mixins/invalidate-session-mixin';

const { inject: { service } } = Ember;

export default Ember.Component.extend(InvalidateSessionMixin, {
  session: service('session'),
  simple: false,
  dark: false,
  classNames: ['topbar-menu'],
  classNameBindings: ['simple', 'dark']
});
