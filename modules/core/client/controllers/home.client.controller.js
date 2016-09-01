(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['ProjectsService'];

  function HomeController(ProjectsService) {
    var vm = this;

    vm.projects = ProjectsService.query();

  }
}());
