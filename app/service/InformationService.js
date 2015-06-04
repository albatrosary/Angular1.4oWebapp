/**
 * Objects that are shared across the entire application.
 *
 * @deprecated As of JSDoc 3.4.0. Do not use this module. It will be removed in a future release.
 * @module service/InformationService
 */
(function () {
  'use strict';

  /**
   * Observer Pattern: Observable/Subject class
   *
   * @class InformationService
   * @constructor
   */
  function InformationService($resource){

    var registerApi = $resource('http://localhost:8000/api/information',
      {id:'@id'},
      {
        query:  {
          method:'GET',
          isArray: true,
          transformResponse : function (data) {
            return angular.fromJson(data);
          }
        },
        save:  {
          method:'POST',
          transformRequest : function (data) {
            return angular.toJson({
              buytime: new Date().getTime(),
              books:angular.fromJson(data)
            });
          }
        }
      });
    return registerApi;
  }

  angular.module('todos.service.information', ['ngResource'])
    .factory('InformationService', InformationService);

  InformationService.$inject = ['$resource'];
})();
