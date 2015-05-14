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
        HomeCtrl.addTodo();
        expect(HomeCtrl.todos.length).toBe(5);
        expect(HomeCtrl.todos.length).not.toBe(4);
        expect(HomeCtrl.todos.length).not.toBe(6);
      });
      it('todos追加後のtodosリスト１件目', function () {
        HomeCtrl.addTodo();
        expect(HomeCtrl.todos[0]).toBe('Item 2');
      });
    });


    describe('removeTodo',function() {
      it('データ削除後のtodosリスト１件目', function () {
        HomeCtrl.removeTodo(0);
        expect(HomeCtrl.todos.length).toBe(3);
      });
    });
  });
})();