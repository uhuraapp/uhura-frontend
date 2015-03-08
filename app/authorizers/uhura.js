import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(jqXHR) {
    var token = this.get('session.token');
    if(token !== undefined || token !== null || token !== null) {
      jqXHR.setRequestHeader('Authorization', "Token "+ token);
    }
  }
});
