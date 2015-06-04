'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  options: {
    dest: '<%= paths.dist %>'
  },
  html: '<%= paths.app %>/index.html'
};