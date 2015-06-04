'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  options: {
    keepAlive: true, // If false, the grunt process stops when the test fails. 
    noColor: false // If true, protractor will not use colors in its output. 
  },
  e2e: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too. 
    options: {
      configFile: 'e2e/protractor.conf.js' // Target-specific config file 
    }
  }
};