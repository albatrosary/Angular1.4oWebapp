(function () {
  'use strict';

  function AboutController(InformationService) {
    this.InformationService = InformationService;
  }

  AboutController.prototype.activate = function() {
    var _self = this;
    return this.InformationService.query().$promise.then(function(information){
      _self.information = information;
    }).catch(function(e){
      console.log(e);
    });
  };

  angular.module('todos.about', [
  	'todos.service.information'
  	])
    .controller('AboutController', AboutController);

  AboutController.$inject = ['InformationService'];
})();
