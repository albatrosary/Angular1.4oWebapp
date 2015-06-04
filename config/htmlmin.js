'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  dist: {
    options: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeAttributeQuotes: true,
      removeCommentsFromCDATA: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      // true would impact styles with attribute selectors
      removeRedundantAttributes: false,
      useShortDoctype: true
    },
    files: [{
      expand: true,
      cwd: '<%= paths.dist %>',
      src: '{,*/}*.html',
      dest: '<%= paths.dist %>'
    }]
  }
};