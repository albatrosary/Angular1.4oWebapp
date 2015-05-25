(function(){
  'use strict';

  function TodoStorageService() {
    var storage = window.localStorage;
    var KEY = 'TODO';
    var _todos;

    var save = function() {
        storage.setItem(KEY, JSON.stringify(_todos));
    }

    var get = function() {
      var todos = JSON.parse(storage.getItem(KEY));

      if (!todos) {
        todos = [];
      }
      return todos;
    }

    _todos = get();

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
        return get();
      }
    }
  }

  angular.module('todos.service.todo',[])
    .factory('TodoStorageService', TodoStorageService);
})();
