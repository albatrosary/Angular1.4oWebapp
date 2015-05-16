// Protractor configuration
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

'use strict';

var path = require('path');

exports.config = {
  directConnect: true,
  chromeOnly: true,
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:9001',

  specs: [
    '../e2e/spec/**/*.spec.js'
  ],

  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  // コンポーネント設定
  // onPrepare : function(){
  //   global.po = {
  //     components:{
  //       bookInfo: path.join(__dirname, "e2e", "components", "book-info", "book-info.po"),
  //       books: path.join(__dirname, "e2e", "components", "books", "books.po")
  //     }
  //   };
  // },
};