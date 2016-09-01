(function () {
  'use strict';

  angular
    .module('projects')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['$scope', 'UrlService', 'projectResolve', 'Authentication'];

  function ProjectsController($scope, UrlService, project, Authentication) {
    var vm = this;

    vm.project = project;
    vm.authentication = Authentication;
    vm.error = null;

    $scope.search = function(){
      var type = UrlService.getQueryStringVar('type');
      var name = UrlService.getQueryStringVar('name');
      var city = UrlService.getQueryStringVar('city');
      var query = {};

      if(name!=0){
        query.type = name;
      }
      if(name!=0){
        query.city = city;
      }
      query.type = type;

      $scope.projects = Projects.query(query);
    }

  }
}());
