var Subscriptions = {};

Subscriptions.subscribe = function(_id){
  var route = this,
  id = _id,
  successSubscribe = function(data) {
    var c = _.findWhere(route.controller.get('channels'), {id: data.channel.id});
    if(!c) {
      c = route.controller.get('model');
    }
    route.store.push('subscription', data.channel);
    $("#channel-"+id).show();
    ga('send', 'event', 'button', 'subscribe', 'subscribe channel');
    if(c) {  c.set('subscribed', true); }
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
    $("#channel-"+id).hide();
    ga('send', 'event', 'button', 'unsubscribe', 'channel');

    if(c) { c.set('subscribed', false); }
  },
  unsubscribeFn = function(){
    $.ajax({
      url: '/api/channels/' + id + '/unsubscribe',
      success: successUnsubscribe
    });
  };

  window.auth.withLoggedUser(unsubscribeFn);
};
