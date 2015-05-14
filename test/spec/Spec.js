/* global describe, it */

(function () {
  'use strict';

  var result = "MATCH_UP";

  describe('Give it some context', function () {
    describe('maybe a bit more context here', function () {
      it('should run here few assertions', function () {
        expect(result).toEqual('MATCH_UP');
      });
    });
  });
})();
