'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  options: {
  },
  app:{
    options : {
      jshint : '<%= jshintrc.app %>'
    },
    files: {
      'report/plato/app': ['app/**/*.js']
    }
  },
  test:{
    options : {
      jshint : '<%= jshintrc.test %>'
    },
    files: {
      'report/plato/test': ['test/**/*.js']
    }
  }
};