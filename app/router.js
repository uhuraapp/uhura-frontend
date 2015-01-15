import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("channels");
  this.route("channel", {
    path: "/channels/:channel_id"
  });
  this.route("login");

  this.route("users", function() {
    this.route("settings");
  });
});

export default Router;
