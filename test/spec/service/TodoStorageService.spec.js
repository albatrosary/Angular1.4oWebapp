(function(){
  'use strict';

  describe('Service: TodoStorageService', function () {

    beforeEach(module('todos.service.todo'));

    var Service;
    beforeEach(inject(function (_TodoStorageService_) {
      Service = _TodoStorageService_;
    }));

    describe('addTodo',function() {
      it('todos追加後のtodosリスト', function () {
        Service.addTodo('Yamato');
        expect(Service.getTodo()).toContain('Yamato');
      });
    });

    describe('removeTodo',function() {
      it('todos削除後のtodosリスト', function () {
        var no = Service.getTodo().indexOf('Yamato');
        Service.removeTodo(no);
        expect(Service.getTodo()).not.toContain('Yamato');
      });
    });

  });
})();