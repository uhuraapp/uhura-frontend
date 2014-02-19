
module.exports = function (grunt) {
  'use strict';
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    envrioment: process.env.ENV || "development",
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
      },
      home_css: {
        files: ['assets/stylesheets/home.sass'],
        tasks: ['sass:home']
      },
      stylesheets: {
        files: ['assets/stylesheets/**/*'],
        tasks: ['sass:home']
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
          'public/assets/home.js': ['assets/javascripts/vendor/jquery-1.10.2.min.js', 'assets/javascripts/vendor/uikit.js'],
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
    },
    sass: {
      home: {
        options: {
          style: '<%= envrioment == "development" ? "expanded" : "compressed" %>'
        },
        expand: true,
        cwd: 'assets/stylesheets',
        src: ['home.sass'],
        dest: 'public/assets',
        ext: '.css'
      },
    },
  });

  grunt.registerTask('default', ['watch']);
};
