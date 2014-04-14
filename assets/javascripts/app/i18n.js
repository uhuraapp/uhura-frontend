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
      "channel.status.loading": "Trying find more episodes",
      "channel.message.loading": "Finding new episodes",

      "channel_new.title": "Add Channel",
      "channel_new.podcast_url": "Podcast Feed URL:",
      "channel_new.search": "Search Podcast:",
      "channel_new.subtitle": "Add a new podcast or Search on Uhura database",
      "channel_new.button.search": "Search",
      "channel_new.button.add": "Add",
      "channel_new.button.subscribe": "Subscribe!",
      "channel_new.button.subscribed": "Subscribed",
      "channel_new.button.unsubscribe": "Unsubscribed!",
      "channel_new.alert.not_found": "Channel not found",

      "footer.follow_us": "Follow Us",
      "footer.like_us": "Like us page",
      "footer.contact": "Found a bug? Tell me! <br /> Send a email to",

      "i18n.changed": "The changes will be finished when page refresh",

      "index.suggestions": "Suggestions",

      "episode.button.info": "More Information",
      "episode.button.listened": "Make as Listened",

      "error.?user.no_match": "Password or Email wrong",
      "error.?user.not_found": "Email not found on Uhura",
      "error.?user.exists": "User Registered, please Sign In",
      "error.?password.dont_match": "Password don't match",
      "error.?password.changed": "Password changed",

      "sidebar.home": "Home",
      "sidebar.channel_add": "Add Channel",
      "sidebar.sign_out": "Sign Out"
    },
    pt: {
      "channel.status.loading": "Tentando buscar mais episódios",
      "channel.message.loading": "Buscando novos episódios",

      "channel_new.title": "Adicionar Canal",
      "channel_new.podcast_url": "URL Feed do Podcast:",
      "channel_new.search": "Buscar Podcasts:",
      "channel_new.subtitle": "Assine um novo podcast ou busque no nosso banco de dados",
      "channel_new.button.search": "Buscar",
      "channel_new.button.add": "Adicionar",
      "channel_new.button.subscribe": "Assine!",
      "channel_new.button.subscribed": "Assinado",
      "channel_new.button.unsubscribe": "Remover Assinaura!",
      "channel_new.alert.not_found": "Não foi encontrado nenhum canal",

      "footer.follow_us": "Siga-nos no",
      "footer.like_us": "Curta nossa página",
      "footer.contact": "Encontrou um Problema? Diga me! <br /> Envie um email para",

      "i18n.changed": "A mudança de idioma será efetiva quando a pagina for recarregada",

      "index.suggestions": "Sugestões",

      "episode.button.info": "Mais Informações",
      "episode.button.listened": "Marcar como Ouvido",

      "error.?user.no_match": "Email ou Password não conferem",
      "error.?user.not_found": "Email não encontrado",
      "error.?user.exists": "Email já registrado, faça o login",

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
    if(App.PLAYER.isPlaying) {
      window.location.reload()
    } else {
      alert(this.get("i18n.changed"));
    }
  }
  ga('send', 'event', 'button', 'language', 'changed language');
}

T.prototype.init = function() {
  this.change(this.language);
}

window.t = t = new T();

if(typeof(Handlebars) !== "undefined") {
  Handlebars.registerHelper('t', function(key){
    return window.t.get(key);
  });
}
