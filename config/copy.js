'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= paths.app %>',
      dest: '<%= paths.dist %>',
      src: [
        '*.{ico,png,txt}',
        'images/{,*/}*.webp',
        '{,*/}*.html',
        'components/{,*/}*.html',
        'styles/fonts/{,*/}*.*'
      ]
    }, {
      expand: true,
      dot: true,
      cwd: '.',
      src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
      dest: '<%= paths.dist %>'
    }]
  },
  styles: {
    expand: true,
    dot: true,
    cwd: '<%= paths.app %>/styles',
    dest: '.tmp/styles/',
    src: '{,*/}*.css'
  }
};