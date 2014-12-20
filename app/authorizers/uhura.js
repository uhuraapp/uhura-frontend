import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(jqXHR) {
    var token = this.get('session.token');
    jqXHR.setRequestHeader('Authorization', "Token "+ token);
  }
});
