(function(){
  'use strict';

  describe('Controller: HomeController', function () {

    beforeEach(module('app.home'));

    var HomeCtrl;

    beforeEach(inject(function ($controller) {
      HomeCtrl = $controller('HomeController');
    }));

    describe('addTodo',function() {
      it('todosリスト件数', function () {
        HomeCtrl.addTodo();
        expect(HomeCtrl.todos.length).toBe(5);
        expect(HomeCtrl.todos.length).not.toBe(4);
        expect(HomeCtrl.todos.length).not.toBe(6);
      });
      it('todosリスト１件目', function () {
        HomeCtrl.addTodo();
        expect(HomeCtrl.todos[0]).toBe('Item 2');
      });
    });
  });
})();