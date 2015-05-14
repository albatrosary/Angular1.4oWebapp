(function(){
  'use strict';

  describe('Controller: HomeController', function () {

    beforeEach(module('app.home'));

    var HomeCtrl;

    beforeEach(inject(function ($controller) {
      HomeCtrl = $controller('HomeController');
    }));

    describe('addTodo',function() {
      it('todos追加後のtodosリスト件数', function () {
        
        var len = HomeCtrl.todos.length;
        
        HomeCtrl.addTodo();

        expect(HomeCtrl.todos.length).toBe(len+1);
        expect(HomeCtrl.todos.length).not.toBe(len);
        expect(HomeCtrl.todos.length).not.toBe(len+2);
      });

      it('todos追加後のtodosリスト１件目', function () {
        
        var todo = HomeCtrl.todos[0];
        HomeCtrl.todo = "test";
        HomeCtrl.addTodo();
        
        expect(HomeCtrl.todos[0]).toBe(todo);
        expect(HomeCtrl.todos[HomeCtrl.todos.length-1]).toBe("test");
      });
    });

    describe('removeTodo',function() {
      it('データ削除後のtodosリスト１件目', function () {
        var len = HomeCtrl.todos.length;
        HomeCtrl.removeTodo(0);
        expect(HomeCtrl.todos.length).toBe(len-1);
      });
    });
  });
})();