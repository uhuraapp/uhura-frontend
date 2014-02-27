Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n        <span class=\"typcn typcn-home-outline\"></span>Home\n      ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    <li>\n      ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "channel", "channel.id", options) : helperMissing.call(depth0, "link-to", "channel", "channel.id", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </li>\n  ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("channel.image_url")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" />\n        <span class=\"title\">");
  stack1 = helpers._triageMustache.call(depth0, "channel.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n        <i>");
  stack1 = helpers._triageMustache.call(depth0, "channel.to_view", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</i>\n      ");
  return buffer;
  }

  data.buffer.push("<div id=\"side-left\" class=\"column three-twelfth\">\n  <header>\n    <hgroup>\n      <h1>Uhura</h1>\n      <h2>Podcast Manager</h2>\n    </hgroup>\n  </header>\n  <ul>\n    <li>\n      ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </li>\n    <li><a href=\"/app/\"><span class=\"typcn typcn-document-add\"></span>Add Channel</a></li>\n  </ul>\n  <ol>\n  ");
  stack1 = helpers.each.call(depth0, "channel", "in", "channels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </ol>\n\n  <footer>\n  <a>Follow us <span class=\"typcn typcn-social-twitter\"></span></a>\n  </footer>\n</div>\n\n\n\n<div id=\"content\" class=\"column nine-twelfth\">\n  ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n\n<div id=\"fb-root\"></div>\n");
  return buffer;
  
});

Ember.TEMPLATES["channel"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n  <li class=\"audio\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-listened': ("episode.listened")
  },hashTypes:{'data-listened': "ID"},hashContexts:{'data-listened': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-id': ("episode.id")
  },hashTypes:{'data-id': "ID"},hashContexts:{'data-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-source_url': ("episode.source_url")
  },hashTypes:{'data-source_url': "ID"},hashContexts:{'data-source_url': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n    ");
  data.buffer.push(escapeExpression((helper = helpers['play-pause-button'] || (depth0 && depth0['play-pause-button']),options={hash:{
    'episode': ("episode")
  },hashTypes:{'episode': "ID"},hashContexts:{'episode': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "play-pause-button", options))));
  data.buffer.push("\n    <div class=\"title\">\n      ");
  stack1 = helpers._triageMustache.call(depth0, "episode.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n    <button alt=\"Information\" class=\"more-info typcn typcn-info-large\"> </button>\n    <div class=\"description\">\n      ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "episode.description", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n    </div>\n  </li>\n  ");
  return buffer;
  }

  data.buffer.push("<h2>");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\n\n\n<ul class=\"episodes\">\n  ");
  stack1 = helpers.each.call(depth0, "episode", "in", "episodes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
});

Ember.TEMPLATES["component_play-pause-button"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<i class=\"typcn typcn-media-play\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "play", "episode", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" ></i>\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <li>\n      <h3><span class=\"typcn typcn-th-large-outline\"></span>");
  stack1 = helpers._triageMustache.call(depth0, "channel.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h3>\n      <ul class=\"episodes\">\n        ");
  stack1 = helpers.each.call(depth0, "episode", "in", "channel.episodes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </ul>\n    </li>\n\n\n        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n          <li class=\"audio\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-listened': ("episode.listened")
  },hashTypes:{'data-listened': "ID"},hashContexts:{'data-listened': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-id': ("episode.id")
  },hashTypes:{'data-id': "ID"},hashContexts:{'data-id': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data-source_url': ("episode.source_url")
  },hashTypes:{'data-source_url': "ID"},hashContexts:{'data-source_url': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            ");
  data.buffer.push(escapeExpression((helper = helpers['play-pause-button'] || (depth0 && depth0['play-pause-button']),options={hash:{
    'episode': ("episode")
  },hashTypes:{'episode': "ID"},hashContexts:{'episode': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "play-pause-button", options))));
  data.buffer.push("\n            <div class=\"title\">\n              ");
  stack1 = helpers._triageMustache.call(depth0, "episode.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n            <button alt=\"Information\" class=\"more-info typcn typcn-info-large\"> </button>\n            <div class=\"description\">\n              ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "episode.description", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n            </div>\n          </li>\n        ");
  return buffer;
  }

  data.buffer.push("<h2>Suggestions</h2>\n\n<ul id=\"channels\">\n  ");
  stack1 = helpers.each.call(depth0, "channel", "in", "channels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
});

Ember.TEMPLATES["player"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <div class=\"Player\">\n      <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "play_pause", "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(">\n        ");
  stack1 = helpers['if'].call(depth0, "playing", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </a>\n      <div class=\"PlayerLoader\">\n        <div class=\"loading\"></div>\n        <div class=\"playing\"></div>\n      </div>\n      <span class=\"title\">");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n    </div>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("<i class=\"fa fa-pause\"></i>");
  }

function program4(depth0,data) {
  
  
  data.buffer.push("<i class=\"fa fa-play\"></i>");
  }

  data.buffer.push("    ");
  stack1 = helpers['if'].call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});