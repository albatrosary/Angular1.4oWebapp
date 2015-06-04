'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  compile: {
    name: '<%= pkg.name %>',
    description: '<%= pkg.description %>',
    version: '<%= pkg.version %>',
    url: '<%= pkg.homepage %>',
    options: {
      paths: ['app/components', 'app/service'],
      outdir: 'docs'
    }
  }
};