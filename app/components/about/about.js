/**
 * Objects that are shared across the entire application.
 *
 * @deprecated As of JSDoc 3.4.0. Do not use this module. It will be removed in a future release.
 * @module components/about
 */
(function () {
  'use strict';

  function AboutController(InformationService) {
    this.InformationService = InformationService;
  }

  /**
    Resolves the longname, memberof, variation and name values of the given doclet.
    @param {module:components/about.AboutController} activate
  */
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
