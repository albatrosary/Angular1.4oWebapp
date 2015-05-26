# Angular1.4oWebapp

## ハンズオンの進め方

### generator-webappのインストール

```
$ npm install -g generator-webapp
```

### yo webappの実行

```
$ cd ~
$ mkdir webapp && cd $_
$ yo webapp
```

options: npmモジュール、bowerモジュールがインストールされていない場合

```
$ npm install
$ bower installl
```

### bowerでAngularのインストール

```
$ bower install -g angular#1.4.0-rc.2 --save
$ bower install -g angular-new-router#0.5.3 --save
$ bower install -g angular-mocks#1.4.0-rc.2 --save-dev
```

wiredepタスクでangular-new-routerがロードされるようにbower.jsonを変更（overrides句を追加）

```json
{
  "name": "webapp",
  "private": true,
  "dependencies": {
    "bootstrap-sass-official": "~3.2.0",
    "angular": "1.4.0-rc.2",
    "angular-new-router": "~0.5.3"
  },
  "overrides": {
    "angular-new-router": {
      "main": "dist/router.es5.js"
    }
  },
  "devDependencies": {
    "angular-mocks": "1.4.0-rc.2"
  }
}
```

### ルーティングの設定

#### index.html

index.htmlに記載されている`.header`部分を修正
```html
      <div class="header">
        <ul class="nav nav-pills pull-right">
          <li><a ng-link="home">Home</a></li>
          <li><a ng-link="about">About</a></li>
          <li><a ng-link="contact">Contact</a></li>
        </ul>
        <h3 class="text-muted">webapp</h3>
      </div>
```

index.htmlにAngularを読み込ませる
```html
  <body ng-app="todos">
```

#### main.js

main.jsにangularモジュールの設定

```javascript
(function () {
  'use strict';

  function AppController () {}

  angular.module('todos', [])
    .controller('AppController', [AppController]);
})();
```

angularモジュールにルーティングを設定

```javascript
(function () {
  'use strict';

  function AppController () {}

  angular.module('todos', [
    'ngNewRouter'
    ])
    .controller('AppController', [AppController]);

  AppController.$routeConfig = [
    { path: '/',       redirectTo: '/home' },
    { path: '/home',    component: 'home' },
    { path: '/about',   component: 'about' },
    { path: '/contact', component: 'contact' }
  ];
})();
```


#### ルーティングに対応するコンポーネントを作成

```
$ mkdir app/components
$ mkdir app/components/home
$ touch app/components/home/home.html
$ touch app/components/home/home.js
$ mkdir app/components/about
$ touch app/components/about/about.html
$ touch app/components/about/about.js
$ mkdir app/components/contact
$ touch app/components/contact/contact.html
$ touch app/components/contact/contact.js
```

home.html
```html
<h2>My todos</h2>

<!-- Todos input -->
<form role="form" ng-submit="home.addTodo()">
<div class="row">
  <div class="input-group">
    <input type="text" ng-model="home.todo" placeholder="What needs to be done?" class="form-control">
    <span class="input-group-btn">
      <input type="submit" class="btn btn-primary" value="Add" name="add">
    </span>
  </div>
</div>
</form>
<!-- Todos list -->
<div ui-sortable ng-model="home.todos">
<p class="input-group" ng-repeat="todo in home.todos track by $index">
  <input type="text" ng-model="todo" class="form-control">
  <span class="input-group-btn">
    <button class="btn btn-danger" ng-click="home.removeTodo($index)" aria-label="Remove">X</button>
  </span>
</p>
</div>
```

home.js
```javascript
(function () {
  'use strict';

  function HomeController() {
  }

  angular.module('todos.home', [])
    .controller('HomeController', HomeController);
})();
```

about.html
```html
about.html
```

about.js
```javascript
(function () {
  'use strict';

  function AboutController() {
  }

  angular.module('todos.about', [])
    .controller('AboutController', AboutController);
})();
```


contact.html
```html
contact.html
```

contact.js
```javascript
(function () {
  'use strict';

  function ContactController() {
  }

  angular.module('todos.contact', [])
    .controller('ContactController', ContactController);
})();
```

main.jsにモジュール読み込みを記載
```javascript
(function () {
  'use strict';

  function AppController () {}

  angular.module('todos', [
    'ngNewRouter',
    'todos.home',
    'todos.about',
    'todos.contact',
  ])
    .controller('AppController', [AppController]);

  AppController.$routeConfig = [
    { path: '/',       redirectTo: '/home' },
    { path: '/home',    component: 'home' },
    { path: '/about',   component: 'about' },
    { path: '/contact', component: 'contact' }
  ];
})();
```

#### コンポーネントをindex.htmlにinjectするタスクを追加

```
$ npm install grunt-injector --save-dev
```

Gruntfile.js を変更： wiredep句の下辺りに追加

```javascript
    wiredep: {
      ... 省略
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
          '<%= config.app %>/index.html': ['<%= config.app %>/components/{,*/}*.js', '<%= config.app %>/service/{,*/}*.js'],
        } 
      },
    },

      ... 省略

  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep:app',
      'wiredep:sass',
      'injector:js',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });
```

#### 簡易サーバを起動

```
$ grunt serve
```

### jshintのエラーを解消

「angularは定義されていない」というエラーが発生しているので.jshintrcを修正

```json
  "globals": {
    "angular": true
  }
```
を追加する

```json
{
  "node": true,
  "browser": true,
  "esnext": true,
  "bitwise": true,
  "camelcase": true,
  "curly": true,
  "eqeqeq": true,
  "immed": true,
  "indent": 2,
  "latedef": true,
  "newcap": true,
  "noarg": true,
  "quotmark": "single",
  "undef": true,
  "unused": true,
  "strict": true,
  "trailing": true,
  "smarttabs": true,
  "jquery": true,
  "globals": {
    "angular": true
  }
}
```

### todosの作成

#### home.jsへhtml.htmlに対応するイベントを定義

```javascript
(function () {
  'use strict';

  function HomeController(StorageService) {
    this.StorageService = StorageService;
    
    this.todo = '';
    this.todos = StorageService.getTodo();
  }

  HomeController.prototype.addTodo = function () {
    this.todos = this.StorageService.addTodo(this.todo);
    this.todo = '';
  };

  HomeController.prototype.removeTodo = function (index) {
    this.todos = this.StorageService.removeTodo(index);
  };

  angular.module('todos.home', [
    'todos.service.todo'
  ])
    .controller('HomeController', HomeController);

  HomeController.$inject = ['TodoStorageService'];
})();
```

#### home.jsで利用するサービスを定義

```
$ mkdir app/service
$ touch app/service/TodoStorageService.js
```

ロジックを作成

```javascript
(function(){
  'use strict';

  function TodoStorageService() {
    var storage = window.localStorage;
    var KEY = 'TODO';
    var _todos;

    var save = function() {
        storage.setItem(KEY, JSON.stringify(_todos));
    }

    var get = function() {
      var todos = JSON.parse(storage.getItem(KEY));

      if (!todos) {
        todos = [];
      }
      return todos;
    }

    _todos = get();

    return {
      addTodo: function (todo) {
        _todos.push(todo);
        save();

        return _todos;
      },

      removeTodo: function (index) {
        _todos.splice(index, 1);
        save();

        return _todos;
      },

      getTodo: function() {
        return get();
      }
    }
  }

  angular.module('todos.service.todo',[])
    .factory('TodoStorageService', TodoStorageService);
})();
```

### karmaのインストール

```
$ npm install grunt-karma --save-dev
$ npm install karma-jasmine --save-dev
$ npm install karma-phantomjs-launcher --save-dev
```

Gruntfile.jsの設定
```
    jshint: {

      ... 省略

    },

    // karma testing framework configuration options
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

      ... 省略

    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html'],
        exclude: ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']
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

      ... 省略

  grunt.registerTask('test', [
    'clean:server',
    'wiredep:test',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'jshint:test',
    'karma'
  ]);

```

#### その他

test以下のディレクトリを参照

### protractorのインストール

```
$ npm install protractor --save-dev
$ npm install grunt-protractor-runner --save-dev
$ npm install grunt-protractor-webdriver --save-dev
$ node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update
```

Gruntfile.jsの設定
```javascript

      ... 省略

    connect: {

      ... 省略

      test: {

      ... 省略

      },
      e2e: {
        options: {
          open: false,
          port: 9001,
          livereload: false,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app),
              connect().use(function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
              })
            ];
          }
        }
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

      ... 省略

  grunt.registerTask('test', [

      ... 省略

  ]);

  grunt.registerTask('e2e', [
    'build',
    'connect:e2e',
    'protractor:e2e'
  ]);
```

#### その他

e2e以下のディレクトリを参照
