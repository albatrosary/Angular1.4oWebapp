(function () {
  'use strict';

  function HomeController(storage) {
    this.storage = storage;
    this.todos = storage.getTodo();
  }

  HomeController.prototype.addTodo = function () {
    this.todos = this.storage.addTodo(this.todo);
    this.todo = '';
  };

  HomeController.prototype.removeTodo = function (index) {
    this.todos = this.storage.removeTodo(index);
  };

  angular.module('app.home', [
    'app.service.todo'
  ])
    .controller('HomeController', HomeController);

  HomeController.$inject = ['TodoStorageService'];
})();