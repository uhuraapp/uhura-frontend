module.exports = {
  appName: 'uhura',
  platforms: ['linux32', 'linux64'],
  buildType: function() {
    return this.appVersion;
  }
};
