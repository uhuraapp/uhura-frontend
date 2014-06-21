
module.exports = function (grunt) {
  'use strict';
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  var watchConfig = {
      options: {
        livereload: true,
      },
      html: {
        files: "views/**/*.html"
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile', 'notify:watch']
      },
      hint_app: {
        files: ['assets/javascripts/*.js'],
        tasks: ['jshint:app', 'notify:watch']
      },
      app_js: {
        files: ['assets/javascripts/*.js', 'assets/javascripts/app/**/*.js'],
        tasks: ['jshint:app', 'emberTemplates', 'concat:app', 'notify:watch']
      },
      vendor_js: {
        files: ['assets/javascripts/vendor/*.js'],
        tasks: ['concat:vendor', 'notify:watch']
      },
      home_css: {
        files: ['assets/stylesheets/home.sass'],
        tasks: ['sass:app', 'notify:watch']
      },
      stylesheets: {
        files: ['assets/stylesheets/**/*'],
        tasks: ['sass:app', 'notify:watch']
      },
      emberTemplates: {
        files: 'assets/javascripts/app/templates/**/*.handlebars',
        tasks: ['emberTemplates', 'concat:app', 'notify:watch']
      }
    };

  grunt.initConfig({
    envrioment: process.env.ENV || "development",
    watch: watchConfig,
    notify: {
      watch: {
        options: {
          message: "Grunt Finished"
        }
      },
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
      app: {
        files: {
          'public/assets/home.js': ['assets/javascripts/vendor/0_jquery-1.10.2.min.js', 'assets/javascripts/vendor/uikit.js', 'assets/javascripts/vendor/jquery.cookie.js', 'assets/javascripts/app/i18n.js', 'assets/javascripts/home.js'],
          'public/assets/app.js': ['assets/javascripts/app.js', 'assets/javascripts/app/subscriptions.js',  'assets/javascripts/app/**/*.js']
        }
      },
      vendor: {
        files: {
          'public/assets/vendor.js': ['assets/javascripts/vendor/*.js'],
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
            src: ['*.js', '!*vendor*'],
            dest: 'public/assets/',
            ext: '.min.js',
          },
        ],
      },
      vendor: {
        files: [
          {
            expand: true,
            cwd: 'public/assets/',
            src: ['vendor.js'],
            dest: 'public/assets/',
            ext: '.min.js',
          },
        ],
      },
    },
    sass: {
      app: {
        options: {
          style: '<%= envrioment == "development" ? "expanded" : "compressed" %>'
        },
        expand: true,
        cwd: 'assets/stylesheets',
        src: ['home.sass', 'app.sass'],
        dest: 'public/assets',
        ext: '.css'
      },
    },
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: "assets/javascripts/app/templates/"
        },
        files: {
          "assets/javascripts/app/templates.js": ["assets/javascripts/app/templates/**/*.handlebars"]
        }
      }
    },
  });

  grunt.registerTask('default', ['emberTemplates', 'concat:vendor', 'concat:app', 'sass:app', 'watch']);
};

