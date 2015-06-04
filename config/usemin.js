'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  options: {
    assetsDirs: [
      '<%= paths.dist %>',
      '<%= paths.dist %>/images',
      '<%= paths.dist %>/styles'
    ]
  },
  html: ['<%= paths.dist %>/{,*/}*.html'],
  css: ['<%= paths.dist %>/styles/{,*/}*.css']
};