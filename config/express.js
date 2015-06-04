'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  options: {
    // Override defaults here 
    port: 8000
  },
  dev: {
    options: {
      script: 'server/app.js'
    }
  }
};