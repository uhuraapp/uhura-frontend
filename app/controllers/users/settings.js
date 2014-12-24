import Ember from 'ember';

export default Ember.Controller.extend({
  selectedLanguage: function(){
    return this.i18n.currentLanguage;
  }.property(),

  currentLanguage: function(){
    return this.i18n.currentLanguage;
  }.property(),

  languages: function() {
    return this.i18n.languages;
  }.property(),

  languageChanged: function() {
    if(this.get('selectedLanguage') && this.get('selectedLanguage').key !== this.i18n.currentLanguage) {
      this.i18n.setLang(this.get('selectedLanguage').key);
      if(confirm(this.i18n.t("messages.reload_settings"))){
        window.location.reload();
      }
    }
  }.observes('selectedLanguage')
});
