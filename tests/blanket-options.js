/* globals blanket, module */

const options = {
  modulePrefix: 'uhuraapp',
  filter: '//.*uhuraapp/.*/',
  antifilter: '//.*(tests|template|app-version|in-app-livereload|export-application-global|infinite-scroll|simple-auth|controllers/array|controllers/object|cdv-nav-bar).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ['lcov'],
    autostart: true,
    lcovOptions: { outputFile: 'lcov.info' }
  },
  lcovOptions: {
    renamer(moduleName) {
      let fileName = `${moduleName.replace(/^uhuraapp/, 'app')}.js`;
      return fileName.replace('app/config/', 'config/');
    }
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
