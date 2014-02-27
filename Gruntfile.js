
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
        tasks: ['jshint:gruntfile']
      },
      hint_app: {
        files: ['assets/javascripts/*.js'],
        tasks: ['jshint:app']
      },
      app_js: {
        files: ['assets/javascripts/*.js', 'assets/javascripts/app/**/*.js'],
        tasks: ['jshint:app', 'emberTemplates', 'concat:app']
      },
      vendor_js: {
        files: ['assets/javascripts/vendor/*.js'],
        tasks: ['concat:vendor', 'uglify:vendor']
      },
      home_css: {
        files: ['assets/stylesheets/home.sass'],
        tasks: ['sass:home']
      },
      stylesheets: {
        files: ['assets/stylesheets/**/*'],
        tasks: ['sass:home']
      },
      emberTemplates: {
        files: 'assets/javascripts/app/templates/*.handlebars',
        tasks: ['emberTemplates', 'concat:app']
      },
    };

  if(process.env.ENV != 'development'){
    watchConfig.app_js.tasks.push('uglify:app');
    watchConfig.emberTemplates.tasks.push('uglify:app');
  }

  var homeFiles = ['assets/javascripts/vendor/0_jquery-1.10.2.min.js',  'assets/javascripts/vendor/uikit.js', 'assets/javascripts/home.js'];
  var appFiles = ['assets/javascripts/app.js', 'assets/javascripts/app/**/*.js'];

  var concatFiles = {
    "development": {
      'public/assets/home.min.js': homeFiles,
      'public/assets/app.min.js': appFiles
    },
    "production": {
      'tmp/assets/home.js': homeFiles,
      'tmp/assets/app.js': appFiles
    }
  };

  console.log(concatFiles[process.env.ENV].home);


  grunt.initConfig({
    envrioment: process.env.ENV || "development",
    watch: watchConfig,
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
        files: concatFiles[process.env.ENV]
      },
      vendor: {
        files: {
          'tmp/assets/vendor.js': ['assets/javascripts/vendor/*.js'],
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
            cwd: 'tmp/assets/',
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
            cwd: 'tmp/assets/',
            src: ['vendor.js'],
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
          "assets/javascripts/app/templates.js": ["assets/javascripts/app/templates/*.handlebars"]
        }
      }
    },
  });

  grunt.registerTask('default', ['emberTemplates', 'concat:app', 'uglify:app', 'sass:home', 'watch']);
};
