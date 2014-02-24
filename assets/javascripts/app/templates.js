Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n          <h1>Uhura</h1>\n          <h2>Podcast Manager</h2>\n          ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n              Discovery New Podcasts\n              ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n              Dashboard\n              ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\n            Discovery New Podcasts\n            ");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\n            Dashboard\n            ");
  }

  data.buffer.push("    <header>\n      <div class=\"uk-hidden-small\">\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.PlayerView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n      </div>\n      <div class=\"container\">\n        <hgroup>\n\n          ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </hgroup>\n\n        <nav class=\"uk-navbar\">\n          <ul class=\"uk-navbar-nav uk-hidden-small\">\n            <li>\n              ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channels", options) : helperMissing.call(depth0, "link-to", "channels", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </li>\n            <li>\n              ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "dashboard", options) : helperMissing.call(depth0, "link-to", "dashboard", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </li>\n          </ul>\n          <button class=\"uk-navbar-toggle uk-visible-small\" class=\"uk-button\" data-uk-offcanvas=\"{target:'#menu'}\"></button>\n        </nav>\n      </div>\n    </header>\n\n    <div data-uk-sticky class=\"uk-visible-small PlayerMobile\">\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.PlayerView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n    </div>\n\n    <div id=\"menu\" class=\"uk-offcanvas\">\n      <div class=\"uk-offcanvas-bar uk-offcanvas-bar-flip\">\n        <ul class=\"uk-nav uk-nav-offcanvas\" data-uk-nav>\n          <li>\n            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channels", options) : helperMissing.call(depth0, "link-to", "channels", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </li>\n          <li>\n            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "dashboard", options) : helperMissing.call(depth0, "link-to", "dashboard", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    <div id=\"content\" class=\"container\">\n      ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n\n    <footer class=\"column full\">\n\n    </footer>\n    <div id=\"fb-root\"></div>\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  Listen Amazing Podcasts\n  ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    <li>\n      ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "channel", "channel.uri", options) : helperMissing.call(depth0, "link-to", "channel", "channel.uri", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </li>\n    ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n      <div>\n        <img\n          ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'alt': ("channel.title")
  },hashTypes:{'alt': "ID"},hashContexts:{'alt': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n          ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("channel.image_url")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" />\n      </div>\n      ");
  return buffer;
  }

  data.buffer.push("<div id=\"home\">\n  ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'id': ("call-to-action")
  },hashTypes:{'id': "STRING"},hashContexts:{'id': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "channels", options) : helperMissing.call(depth0, "link-to", "channels", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  <ul id=\"channels\">\n    ");
  stack1 = helpers.each.call(depth0, "channel", "in", "channels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </ul>\n</div>\n");
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