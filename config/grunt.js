'use strict';

module.exports.tasks = {
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= paths.app %>/{,directives,service,components}/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= paths.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= paths.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      }
    },

    browserSync: {
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
    },
    express: {
      options: {
        // Override defaults here 
        port: 8000
      },
      dev: {
        options: {
          script: 'server/app.js'
        }
      }
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= paths.dist %>/*',
            '!<%= paths.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp',
      doc: 'docs'
    },
    // plato
    plato: {
      options: {
      },
      app:{
        options : {
          jshint : '<%= jshintrc.app %>'
        },
        files: {
          'report/plato/app': ['app/**/*.js']
        }
      },
      test:{
        options : {
          jshint : '<%= jshintrc.test %>'
        },
        files: {
          'report/plato/test': ['test/**/*.js']
        }
      }
    },
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= paths.app %>/scripts/{,*/}*.js',
        '!<%= paths.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // karma testing framework configuration options
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    protractor: {
      options: {
        keepAlive: true, // If false, the grunt process stops when the test fails. 
        noColor: false // If true, protractor will not use colors in its output. 
      },
      e2e: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too. 
        options: {
          configFile: 'e2e/protractor.conf.js' // Target-specific config file 
        }
      }
    },
    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['bower_components'],
        loadPath: 'bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },
    yuidoc: {
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
    },
    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        map: {
          prev: '.tmp/styles/'
        }
        
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
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
      },
    },
    injector: {
      options: {
        // Task-specific options go here. 
        transform: function(filePath) {
          filePath = filePath.replace('/app/', '');
          return '<script src="' + filePath + '"></script>';
        }
      },
      js: {
        // Target-specific file lists and/or options go here.
        files: {
          '<%= paths.app %>/index.html': ['<%= paths.app %>/components/{,*/}*.js', '<%= paths.app %>/service/{,*/}*.js'],
        } 
      },
    },
    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= paths.dist %>/scripts/{,*/}*.js',
          '<%= paths.dist %>/styles/{,*/}*.css',
          '<%= paths.dist %>/images/{,*/}*.*',
          '<%= paths.dist %>/styles/fonts/{,*/}*.*',
          '<%= paths.dist %>/*.{ico,png}'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= paths.dist %>'
      },
      html: '<%= paths.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= paths.dist %>',
          '<%= paths.dist %>/images',
          '<%= paths.dist %>/styles'
        ]
      },
      html: ['<%= paths.dist %>/{,*/}*.html'],
      css: ['<%= paths.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= paths.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= paths.dist %>/images'
        }]
      }
    },

    htmlmin: {
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
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
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
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'sass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'sass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
}