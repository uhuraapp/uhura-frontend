/* globals $ */
import Ember from 'ember';

var i18n = {};
i18n.keys = {
    en: {
      'channel.status.loading': 'Trying find more episodes',
      'channel.message.loading': 'Finding new episodes',

      'channel_new.title': 'Find Channel',
      'channel_new.podcast_url': 'Podcast Feed URL:',
      'channel_new.search': 'Search Podcast:',
      'channel_new.subtitle': 'Add a new podcast or Search on Uhura database',
      'channel_new.button.search': 'Search',
      'channel_new.button.add': 'Add',
      'channel_new.button.subscribe': 'Subscribe!',
      'channel_new.button.subscribed': 'Subscribed',
      'channel_new.button.unsubscribe': 'Unsubscribed!',
      'channel_new.alert.not_found': 'Channel not found',
      'channel_new.by_categories': 'All By Category',

      'donate.title': 'Help me to keep Uhura App up!',
      'donate.subtitle': 'You can choose Paypal($) or PagSeguro(R$)',

      'footer.follow_us': 'Follow Us',
      'footer.like_us': 'Like us page',
      'footer.contact': 'Found a bug? Tell me! <br /> Send a email to',

      'i18n.changed': 'The changes will be finished when page refresh',

      'index.suggestions': 'Suggestions',

      'episode.button.info': 'More Information',
      'episode.button.listened': 'Mark as Listened',
      'episode.button.download': 'Download Episode',

      'error.?user.no_match': 'Password or Email wrong',
      'error.?user.not_found': 'Email not found on Uhura',
      'error.?user.exists': 'User Registered, please Sign In',
      'error.?password.dont_match': 'Password don\'t match',
      'error.?password.changed': 'Password changed',

      'sidebar.home': 'Home',
      'sidebar.donate': 'Make a Donation',
      'sidebar.channel_add': 'Find Channels',
      'sidebar.sign_out': 'Sign Out',

      'loading.label': 'Loading...'
    },
    pt: {
      'channel.status.loading': 'Tentando buscar mais episódios',
      'channel.message.loading': 'Buscando novos episódios',

      'channel_new.title': 'Buscar Canais',
      'channel_new.podcast_url': 'URL Feed do Podcast:',
      'channel_new.search': 'Buscar Podcasts:',
      'channel_new.subtitle': 'Assine um novo podcast ou busque no nosso banco de dados',
      'channel_new.button.search': 'Buscar',
      'channel_new.button.add': 'Adicionar',
      'channel_new.button.subscribe': 'Assine!',
      'channel_new.button.subscribed': 'Assinado',
      'channel_new.button.unsubscribe': 'Remover Assinaura!',
      'channel_new.alert.not_found': 'Não foi encontrado nenhum canal',
      'channel_new.by_categories': 'Todos por Categoria',

      'donate.title': 'Me ajude a manter o Uhura App funcionando!',
      'donate.subtitle': 'Você pode escolher Paypal($) ou PagSeguro(R$)',

      'footer.follow_us': 'Siga-nos no',
      'footer.like_us': 'Curta nossa página',
      'footer.contact': 'Encontrou um Problema? Diga me! <br /> Envie um email para',

      'i18n.changed': 'A mudança de idioma será efetiva quando a pagina for recarregada',

      'index.suggestions': 'Sugestões',

      'episode.button.info': 'Mais Informações',
      'episode.button.listened': 'Marcar como Ouvido',
      'episode.button.download': 'Baixar Episódio',

      'error.?user.no_match': 'Email ou Password não conferem',
      'error.?user.not_found': 'Email não encontrado',
      'error.?user.exists': 'Email já registrado, faça o login',

      'sidebar.home': 'Inicio',
      'sidebar.donate': 'Faça uma doação',
      'sidebar.channel_add': 'Buscar Canais',
      'sidebar.sign_out': 'Sair',

      'loading.label': 'Carregando...'
    }
};


var get = function (key) {
  var language = $.cookie('language');
  if(!language){ language =  "en"; }
  return i18n.keys[language][key];
};

export function t(key) {
  var value;
  value = get(key);
  return value;
}

export default Ember.Handlebars.makeBoundHelper(t);

