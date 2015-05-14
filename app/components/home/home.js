(function () {
  'use strict';

  function HomeController() {
  	this.todos = ['Item 2', 'Item 1', 'Item 3', 'Item 4'];
  }

  angular.module('app.home', [])
    .controller('HomeController', HomeController);

  HomeController.prototype.addTodo = function () {
    this.todos.push(this.todo);
    this.todo = '';
  };

  HomeController.prototype.removeTodo = function (index) {
    this.todos.splice(index, 1);
  };
})();