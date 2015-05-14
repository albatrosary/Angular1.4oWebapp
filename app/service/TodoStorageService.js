(function(){
  'use strict';

  function TodoStorageService() {
    var storage = window.localStorage;
    var KEY = 'TODO';
    var _todos;

    var save = function() {
        storage.setItem(KEY, JSON.stringify(_todos));
    }

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
        _todos = JSON.parse(storage.getItem(KEY));

        if (!_todos) {
          _todos = [];
        }
        return _todos;
      }
    }
  }

  angular.module('app.service.todo',[])
    .factory('TodoStorageService', TodoStorageService);
})();
