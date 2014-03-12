var Subscriptions = {};
Subscriptions.subscribe = function(_id){
  var route = this,
  id = _id,
  successSubscribe = function(data) {
    var c = _.findWhere(route.controller.get('channels'), {id: data.channel.id});
    if(!c) {
      c = route.controller.get('model');
    }
    c.set('subscribed', true);
    route.store.push('channel', data.channel);
    $("#channel-"+id).show();
  },
  subscribeFn = function(){
    $.ajax({
      url: '/api/channels/' + id + '/subscribe',
      success: successSubscribe
    });
  };

  window.auth.withLoggedUser(subscribeFn);
};

Subscriptions.unsubscribe = function(_id){
  var route = this,
  id = _id,
  successUnsubscribe = function(data) {
    var c = _.findWhere(route.controller.get('channels'), {id: id});
    if(!c) {
      c = route.controller.get('model');
    }
    c.set('subscribed', false);
    $("#channel-"+id).hide();
  },
  unsubscribeFn = function(){
    $.ajax({
      url: '/api/channels/' + id + '/unsubscribe',
      success: successUnsubscribe
    });
  };

  window.auth.withLoggedUser(unsubscribeFn);
};
