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