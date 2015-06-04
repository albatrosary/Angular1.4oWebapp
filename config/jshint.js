'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  all: [
    'Gruntfile.js',
    '<%= paths.app %>/scripts/{,*/}*.js',
    '!<%= paths.app %>/scripts/vendor/*',
    'test/spec/{,*/}*.js'
  ]
};