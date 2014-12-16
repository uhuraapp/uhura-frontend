/* global $ */
import ENV from '../config/environment';

export default {
  authURLForProvider: function(provider){ return ENV.API_URL + "/api/v2/auth/" + provider; },
  getUser: function() {
    return $.ajax({url: ENV.API_URL + "/api/v2/user", xhrFields: {withCredentials: true}});
  }
};
