'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  app: {
    ignorePath: /^\/|\.\.\//,
    src: ['<%= paths.app %>/index.html'],
    exclude: ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']
  },
  sass: {
    src: ['<%= paths.app %>/styles/{,*/}*.{scss,sass}'],
    ignorePath: /(\.\.\/){1,2}bower_components\//
  },
  test: {
    devDependencies: true,
    src: '<%= karma.unit.configFile %>',
    ignorePath:  /\.\.\//,
    fileTypes:{
      js: {
        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
        detect: {
          js: /'(.*\.js)'/gi
        },
        replace: {
          js: '\'{{filePath}}\','
        }
      }
    }
  }
};