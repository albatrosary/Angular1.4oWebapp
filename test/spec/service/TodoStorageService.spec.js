(function(){
  'use strict';

  describe('Service: TodoStorageService', function () {

    beforeEach(module('app.service.todo'));

    var Service;
    beforeEach(inject(function (_TodoStorageService_) {
      Service = _TodoStorageService_;
    }));

    describe('addTodo',function() {
      it('todos追加後のtodosリスト件数', function () {
	    expect(Service.getTodo()[0]).toBe('test');
      });
    });
  });
})();