/*jshint node:true*/

// Generated on 2015-06-03 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  // var config = {
  //   app: 'app',
  //   dist: 'dist'
  // };
  var options = {
        // Project settings
    paths: {
      // Configurable paths
        app: 'app',
        dist: 'dist'
    },
    pkg: grunt.file.readJSON('package.json'),
    jshintrc: {
      app: grunt.file.readJSON('.jshintrc'),
      test: grunt.file.readJSON('test/.jshintrc')
    } 
  };

  var configs = require('load-grunt-configs')(grunt, options);

  // Define the configuration for all the tasks
  grunt.initConfig(configs);


  grunt.registerTask('serve', 'start the server and preview your app', function (target) {

    if (target === 'dist') {
      return grunt.task.run([
        'build', 
        'express:dev',
        'browserSync:dist'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'wiredep:app',
      'wiredep:sass',
      'injector:js',
      'concurrent:server',
      'autoprefixer',
      'browserSync:livereload',
      'express:dev',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'wiredep:test',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'browserSync:test',
      'karma'
    ]);
  });

  grunt.registerTask('e2e', [
    'build',
    'browserSync:e2e',
    'protractor:e2e'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('doc', [
    'clean:doc',
    'yuidoc',
    'browserSync:doc'
  ]);

  grunt.registerTask('metric', [
    'plato',
    'browserSync:metricApp'
  ]);

  grunt.registerTask('metricTest', [
    'plato',
    'browserSync:metricTest'
  ]);
};
