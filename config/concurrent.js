'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  server: [
    'sass:server',
    'copy:styles'
  ],
  test: [
    'copy:styles'
  ],
  dist: [
    'sass',
    'copy:styles',
    'imagemin',
    'svgmin'
  ]
};