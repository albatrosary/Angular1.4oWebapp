'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  },
  js: {
    files: ['<%= paths.app %>/{,directives,service,components}/{,*/}*.js'],
    tasks: ['jshint'],
    options: {
      livereload: true
    }
  },
  jstest: {
    files: ['test/spec/{,*/}*.js'],
    tasks: ['newer:jshint:test', 'karma']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  sass: {
    files: ['<%= paths.app %>/styles/{,*/}*.{scss,sass}'],
    tasks: ['sass:server', 'autoprefixer']
  },
  styles: {
    files: ['<%= paths.app %>/styles/{,*/}*.css'],
    tasks: ['newer:copy:styles', 'autoprefixer']
  }
};