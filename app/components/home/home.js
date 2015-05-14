(function () {
  'use strict';

  function HomeController(storage) {
    this.storage = storage;
    this.todos = this.storage.getTodo();
  }

  angular.module('app.home', [
    'app.service.todo'
  ])
    .controller('HomeController', HomeController);

  HomeController.$inject = ['TodoStorageService'];

  HomeController.prototype.addTodo = function () {
    this.todos = this.storage.addTodo(this.todo);
    this.todo = '';
  };

  HomeController.prototype.removeTodo = function (index) {
    this.todos = this.storage.removeTodo(index);
  };
})();