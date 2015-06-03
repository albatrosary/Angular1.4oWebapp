'use strict';

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
