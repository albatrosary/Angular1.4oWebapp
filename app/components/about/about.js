/**
 * Objects that are shared across the entire application.
 *
 * @deprecated As of JSDoc 3.4.0. Do not use this module. It will be removed in a future release.
 * @module components/about
 */
(function () {
  'use strict';

  /**
   * Observer Pattern: Observable/Subject class
   *
   * @class AboutController
   * @constructor
   */
  function AboutController(InformationService) {

    /**
     * My property description.  Like other pieces of your comment blocks, 
     * this can span multiple lines.
     * 
     * @property InformationService
     * @type {Object}
     * @default "InformationService"
     */
    this.InformationService = InformationService;
  }

  /**
  * My method description.  Like other pieces of your comment blocks, 
  * this can span multiple lines.
  *
  * @method activate
  * @param {String} foo Argument 1
  * @param {Object} config A config object
  * @param {String} config.name The name on the config object
  * @param {Function} config.callback A callback function on the config object
  * @param {Boolean} [extra=false] Do extra, optional work
  * @return {Boolean} Returns true on success
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
