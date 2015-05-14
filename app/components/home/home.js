(function () {
  'use strict';

  function HomeController(storage) {

    var _this = this;
    var _storage = storage;

    _this.todos = _storage.getTodo();

    this.addTodo = function () {
      _this.todos = _storage.addTodo(_this.todo);
      _this.todo = '';
    };

    this.removeTodo = function (index) {
      _this.todos = _storage.removeTodo(index);
    };
  }

  angular.module('app.home', [
    'app.service.todo'
  ])
    .controller('HomeController', HomeController);

  HomeController.$inject = ['TodoStorageService'];
})();