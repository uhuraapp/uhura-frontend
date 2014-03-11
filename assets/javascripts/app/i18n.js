var T = function() {
  function T(){
  }

  // Default vars
  this.language = $.cookie("language") || "en"

  // Helpers
  this.currentKeys = function() {
    return this.keys[this.current()];
  }

  // Translation
  this.keys = {
    en: {
      "channel_new.title": "Add Channel",
      "channel_new.podcast_url": "Podcast Feed URL:",
      "channel_new.search": "Search Podcast:",
      "channel_new.subtitle": "Add a new podcast or Search on Uhura database",
      "channel_new.button.search": "Search",
      "channel_new.button.add": "Add",

      "footer.follow_us": "Follow Us",

      "i18n.changed": "The changes will be finished when page refresh",

      "index.suggestions": "Suggestions",

      "sidebar.home": "Home",
      "sidebar.channel_add": "Add Channel",
      "sidebar.sign_out": "Sign Out"
    },
    pt: {
      "channel_new.title": "Adicionar Channel",
      "channel_new.podcast_url": "URL Feed do Podcast:",
      "channel_new.search": "Buscar Podcasts:",
      "channel_new.subtitle": "Assine um novo podcast ou busque no nosso banco de dados",
      "channel_new.button.search": "Buscar",
      "channel_new.button.add": "Adicionar",

      "footer.follow_us": "Siga nós no",

      "i18n.changed": "A mudança de idioma será efetiva quando a pagina for recarregada",

      "index.suggestions": "Sugestões",

      "sidebar.home": "Inicio",
      "sidebar.channel_add": "Adicionar Canal",
      "sidebar.sign_out": "Sair",
    }
  }

  return T();
};

T.prototype.current = function() {
  return this.language;
};

T.prototype.get = function(key) {
  return this.currentKeys()[key]
};

T.prototype.change = function(language, withAlert) {
  $.cookie("language", language);
  this.language = language;
  $("#languages button").removeClass("current");
  $("#"+language).addClass("current");
  if(withAlert){
    alert(this.get("i18n.changed"));
  }
}

T.prototype.init = function() {
  this.change(this.language);
}

window.t = t = new T();

Handlebars.registerHelper('t', function(key){
  return window.t.get(key);
});

$(document).ready(function(){
  window.t.init();
});
