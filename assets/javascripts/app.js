var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});


App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});

$(document).ready(function(){
  $(window).on("resize", fixedSidebarHeight);
  fixedSidebarHeight()
});

var fixedSidebarHeight = function(){
  $("#side-left").css("height", window.innerHeight+"px");
}

