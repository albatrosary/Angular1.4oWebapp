'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%= paths.dist %>/*',
        '!<%= paths.dist %>/.git*'
      ]
    }]
  },
  server: '.tmp',
  doc: 'docs'
};