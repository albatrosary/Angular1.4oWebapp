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

  angular.module('app.home', [
    'app.service.todo'
  ])
    .controller('HomeController', HomeController);

  HomeController.$inject = ['TodoStorageService'];
})();