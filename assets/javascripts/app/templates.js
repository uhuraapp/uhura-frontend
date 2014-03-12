Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n          <span class=\"typcn typcn-home-outline\"></span>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "sidebar.home", options) : helperMissing.call(depth0, "t", "sidebar.home", options))));
  data.buffer.push("\n        ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n          <span class=\"typcn typcn-document-add\"></span>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "sidebar.channel_add", options) : helperMissing.call(depth0, "t", "sidebar.channel_add", options))));
  data.buffer.push("\n        ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n      <li id=\"channel-");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "channel.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "channel", "channel.id", options) : helperMissing.call(depth0, "link-to", "channel", "channel.id", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </li>\n    ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("channel.image_url")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" />\n          <span class=\"title\">");
  stack1 = helpers._triageMustache.call(depth0, "channel.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n          <i>");
  stack1 = helpers._triageMustache.call(depth0, "channel.to_view", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</i>\n        ");
  return buffer;
  }

  data.buffer.push("<div id=\"aside-wrapper\" class=\"column three-twelfth\">\n  <aside class=\"column three-twelfth\">\n    <header>\n      <hgroup>\n        <h1>Uhura</h1>\n        <h2>Podcast Manager</h2>\n      </hgroup>\n    </header>\n\n    <ul>\n      <li>\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </li>\n      <li>\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channel.new", options) : helperMissing.call(depth0, "link-to", "channel.new", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </li>\n      <li>\n        <a href=\"/users/sign_out\">\n          <span class=\"typcn typcn-power-outline\"></span>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "sidebar.sign_out", options) : helperMissing.call(depth0, "t", "sidebar.sign_out", options))));
  data.buffer.push("\n        </a>\n      </li>\n    </ul>\n\n\n    <ol>\n    ");
  stack1 = helpers.each.call(depth0, "channel", "in", "channels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ol>\n\n    <footer>\n    <a>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "footer.follow_us", options) : helperMissing.call(depth0, "t", "footer.follow_us", options))));
  data.buffer.push(" <span class=\"typcn typcn-social-twitter\"></span></a>\n    </footer>\n  </aside>\n</div>\n\n<div id=\"content\" class=\"column nine-twelfth\">\n  ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.PlayerView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n</div>\n\n<div id=\"languages\">\n  <button id=\"pt\" onclick=\"t.change(this.id,true);\">pt</button>\n  <button id=\"en\" onclick=\"t.change(this.id,true);\">en</button>\n</div>\n\n<div id=\"fb-root\"></div>\n");
  return buffer;
  
});

Ember.TEMPLATES["channel"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    <button class=\"uk-button uk-button-small uk-button-danger fa fa-times\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "unsubscribeChannel", "id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channel_new.button.unsubscribe", options) : helperMissing.call(depth0, "t", "channel_new.button.unsubscribe", options))));
  data.buffer.push("</button>\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    <button class=\"uk-button uk-button-small uk-button-success subscribe\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "subscribeChannel", "id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channel_new.button.subscribe", options) : helperMissing.call(depth0, "t", "channel_new.button.subscribe", options))));
  data.buffer.push("</button>\n  ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers['episode-list-item'] || (depth0 && depth0['episode-list-item']),options={hash:{
    'episode': ("episode")
  },hashTypes:{'episode': "ID"},hashContexts:{'episode': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "episode-list-item", options))));
  data.buffer.push("\n  ");
  return buffer;
  }

  data.buffer.push("<h2>\n  ");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  stack1 = helpers['if'].call(depth0, "subscribed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</h2>\n\n<ul class=\"episodes\">\n  ");
  stack1 = helpers.each.call(depth0, "episode", "in", "episodes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
});

Ember.TEMPLATES["channel_new"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <ul id=\"channels\">\n    ");
  stack1 = helpers.each.call(depth0, "channel", "in", "channels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </ul>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <li class=\"channel column three-twelfth\">\n      <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("channel.image_url")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" />\n      <h5>");
  stack1 = helpers._triageMustache.call(depth0, "channel.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h5>\n      ");
  stack1 = helpers['if'].call(depth0, "channel.subscribed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </li>\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n      <button class=\"uk-button uk-button-small unsubscribe fa fa-check\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "unsubscribeChannel", "channel.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channel_new.button.subscribed", options) : helperMissing.call(depth0, "t", "channel_new.button.subscribed", options))));
  data.buffer.push("</button>\n      ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n      <button class=\"uk-button uk-button-small uk-button-success subscribe\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "subscribeChannel", "channel.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channel_new.button.subscribe", options) : helperMissing.call(depth0, "t", "channel_new.button.subscribe", options))));
  data.buffer.push("</button>\n      ");
  return buffer;
  }

  data.buffer.push("<div id=\"channel_new\">\n  <h3>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channel_new.title", options) : helperMissing.call(depth0, "t", "channel_new.title", options))));
  data.buffer.push("</h3>\n  <h4>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channel_new.subtitle", options) : helperMissing.call(depth0, "t", "channel_new.subtitle", options))));
  data.buffer.push("</h4>\n\n  <form id=\"add_channel\" class=\"uk-form uk-form-stacked\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addChannel", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >\n    <label for=\"url\" class=\"uk-form-label\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channel_new.podcast_url", options) : helperMissing.call(depth0, "t", "channel_new.podcast_url", options))));
  data.buffer.push("</label>\n    <input class=\"uk-form-large\" id=\"url\" type=\"url\" name=\"url\" />\n    <button type=\"submit\" class=\"uk-button uk-button-success\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channel_new.button.add", options) : helperMissing.call(depth0, "t", "channel_new.button.add", options))));
  data.buffer.push("</button>\n  </form>\n\n\n  <form id=\"search_channel\" class=\"uk-form uk-form-stacked\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "searchChannel", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >\n    <label for=\"q\" class=\"uk-form-label\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channel_new.search", options) : helperMissing.call(depth0, "t", "channel_new.search", options))));
  data.buffer.push("</label>\n    <input class=\"uk-form-large\" id=\"q\" type=\"search\" name=\"q\" />\n    <button type=\"submit\" class=\"uk-button uk-button-success\">");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channel_new.button.search", options) : helperMissing.call(depth0, "t", "channel_new.button.search", options))));
  data.buffer.push("</button>\n  </form>\n\n\n  ");
  stack1 = helpers['if'].call(depth0, "channels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["component/episode-list-item"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<li ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":audio episode.listened episode.playing")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-id': ("episode.id")
  },hashTypes:{'data-id': "ID"},hashContexts:{'data-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-source_url': ("episode.source_url")
  },hashTypes:{'data-source_url': "ID"},hashContexts:{'data-source_url': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n  ");
  data.buffer.push(escapeExpression((helper = helpers['play-pause-button'] || (depth0 && depth0['play-pause-button']),options={hash:{
    'episode': ("episode")
  },hashTypes:{'episode': "ID"},hashContexts:{'episode': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "play-pause-button", options))));
  data.buffer.push("\n  <div class=\"title\">\n    ");
  stack1 = helpers._triageMustache.call(depth0, "episode.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n  <button title=\"Information\" class=\"more-info typcn typcn-info-large\"> </button>\n  <div class=\"description\">\n    ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "episode.description", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n  </div>\n</li>\n");
  return buffer;
  
});

Ember.TEMPLATES["component/play-pause-button"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<i ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":typcn episode.playing:typcn-media-pause:typcn-media-play")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "playpause", "episode", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n</i>\n\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <li>\n      <h3><span class=\"typcn typcn-th-large-outline\"></span>");
  stack1 = helpers._triageMustache.call(depth0, "channel.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h3>\n      <ul class=\"episodes\">\n        ");
  stack1 = helpers.each.call(depth0, "episode", "in", "channel.episodes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </ul>\n    </li>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n          ");
  data.buffer.push(escapeExpression((helper = helpers['episode-list-item'] || (depth0 && depth0['episode-list-item']),options={hash:{
    'episode': ("episode")
  },hashTypes:{'episode': "ID"},hashContexts:{'episode': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "episode-list-item", options))));
  data.buffer.push("\n        ");
  return buffer;
  }

  data.buffer.push("<h2>");
  data.buffer.push(escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index.suggestions", options) : helperMissing.call(depth0, "t", "index.suggestions", options))));
  data.buffer.push("</h2>\n<ul id=\"channels\">\n  ");
  stack1 = helpers.each.call(depth0, "channel", "in", "channels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
});

Ember.TEMPLATES["player"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n<div id=\"player\">\n  <div id=\"player-image\">\n    ");
  data.buffer.push(escapeExpression((helper = helpers['play-pause-button'] || (depth0 && depth0['play-pause-button']),options={hash:{
    'episode': ("")
  },hashTypes:{'episode': "ID"},hashContexts:{'episode': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "play-pause-button", options))));
  data.buffer.push("\n    <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("channel.image_url")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n  </div>\n  <div id=\"player-info\">\n    <h4>");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n    <h5>");
  stack1 = helpers._triageMustache.call(depth0, "channel.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h5>\n    <div id=\"player-loader\">\n      <div class=\"loading\"></div>\n      <div class=\"playing\"></div>\n    </div>\n  </div>\n</div>\n");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});