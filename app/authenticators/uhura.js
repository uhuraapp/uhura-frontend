import Base from 'simple-auth/authenticators/base';
import UserUtils from '../utils/user';

export default Base.extend({
  restore: function(data) {
    debugger
  },
  authenticate: function(options) {
    return UserUtils.getUser();
  },
  invalidate: function(data) {
    debugger
  }
});
