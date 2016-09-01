(function () {
  'use strict';

  angular
    .module('projects.admin')
    .controller('ProjectsAdminController', ProjectsAdminController);

  ProjectsAdminController.$inject = ['$scope', '$state', '$window', 'projectResolve', 'Authentication'];

  function ProjectsAdminController($scope, $state, $window, project, Authentication) {
    var vm = this;

    vm.project = project;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Project
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.project.$remove($state.go('admin.projects.list'));
      }
    }

    // Save Project
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.projectForm');
        return false;
      }

      // Create a new project, or update the current instance
      vm.project.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.projects.list'); // should we send the User to the list or the updated Project's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
