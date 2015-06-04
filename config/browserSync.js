'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  options: {
    notify: false,
    background: true
  },
  livereload: {
    options: {
      files: [
        '<%= paths.app %>/{,*/}*.html',
        '.tmp/styles/{,*/}*.css',
        '<%= paths.app %>/images/{,*/}*',
        '<%= paths.app %>/scripts/{,*/}*.js'
      ],
      port: 9000,
      server: {
        baseDir: ['.tmp', '<%= paths.app %>'],
        routes: {
          '/bower_components': './bower_components'
        }
      }
    }
  },
  test: {
    options: {
      port: 9001,
      open: false,
      logLevel: 'silent',
      host: 'localhost',
      server: {
        baseDir: ['.tmp', './test', '<%= paths.app %>'],
        routes: {
          '/bower_components': './bower_components'
        }
      }
    }
  },
  e2e: {
    options: {
      port: 9001,
      open: false,
      livereload: false,
      server: {
        baseDir: ['.tmp', './test', '<%= paths.app %>'],
        routes: {
          '/bower_components': './bower_components'
        }
      }
    }
  },
  dist: {
    options: {
      background: false,
      server: '<%= paths.dist %>'
    }
  },
  doc: {
    options: {
      background: false,
      livereload: false,
      server: 'docs'
    }
  },
  metricApp: {
    options: {
      background: false,
      livereload: false,
      server: 'report/plato/app'
    }
  },
  metricTest: {
    options: {
      background: false,
      livereload: false,
      server: 'report/plato/test'
    }
  }
};