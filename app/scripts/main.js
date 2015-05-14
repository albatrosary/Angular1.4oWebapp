(function () {

  'use strict';

  function AppController () {}

  angular.module('todos', [
    'ngNewRouter',
    'app.home'
    ])
    .controller('AppController', [AppController]);

  AppController.$routeConfig = [
    { path: '/',       redirectTo: '/home' },
    { path: '/home',    component: 'home' },
    { path: '/about',   component: 'about' },
    { path: '/contact', component: 'contact' }
  ];
})();