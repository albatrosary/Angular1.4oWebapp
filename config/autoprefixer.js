'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  options: {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
    map: {
      prev: '.tmp/styles/'
    }  
  },
  dist: {
    files: [{
      expand: true,
      cwd: '.tmp/styles/',
      src: '{,*/}*.css',
      dest: '.tmp/styles/'
    }]
  }
};