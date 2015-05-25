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