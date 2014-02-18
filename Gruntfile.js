
module.exports = function (grunt) {
  'use strict';
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      hint_app: {
        files: ['assets/javascripts/*.js'],
        tasks: ['jshint:app']
      },
      app_js: {
        files: ['assets/javascripts/**/*.js'],
        tasks: ['concat:app', 'uglify:app']
      }
    },
    jshint: {
      gruntfile: {
        src: ['Gruntfile.js']
      },
      app: {
        src: ['assets/javascripts/*.js']
      },
    },
    concat: {
      options: {
        separator: ';'
      },
      app: {
        files: {
          'public/assets/vendor.js': ['assets/javascripts/vendor/*.js'],
          'public/assets/app.js': ['assets/javascripts/*.js']
        }
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      app: {
        files: [
          {
            expand: true,
            cwd: 'public/assets/',
            src: ['*.js', '!*.min.js'],
            dest: 'public/assets/',
            ext: '.min.js',
          },
        ],
      },
    }
  });

  grunt.registerTask('default', ['watch']);
};
