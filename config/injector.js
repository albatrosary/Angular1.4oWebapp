'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  options: {
    // Task-specific options go here. 
    transform: function(filePath) {
      filePath = filePath.replace('/app/', '');
      return '<script src="' + filePath + '"></script>';
    }
  },
  js: {
    // Target-specific file lists and/or options go here.
    files: {
      '<%= paths.app %>/index.html': ['<%= paths.app %>/components/{,*/}*.js', '<%= paths.app %>/service/{,*/}*.js'],
    } 
  }
};