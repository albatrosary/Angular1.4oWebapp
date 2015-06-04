'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= paths.app %>/images',
      src: '{,*/}*.svg',
      dest: '<%= paths.dist %>/images'
    }]
  }
};