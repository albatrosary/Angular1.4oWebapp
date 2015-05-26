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

