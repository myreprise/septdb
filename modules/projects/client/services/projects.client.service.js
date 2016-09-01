(function () {
  'use strict';

  angular
    .module('projects.services')

    .service("UrlService", ["$location", function($location) {
      // refernce to service for callbacks
      var __service = this,
          parts = {
              "queryvars": {}
          },
          absUrl = $location.absUrl(),
          // extract and parse url
          elements = absUrl.split("?");

      // query string
      // parse quesry string
      parts["queryString"] = elements[1];
      if ( elements[1] ) {
        parts["hashString"] = (parts["queryString"].split("#"))[1];
        parts["requestParams"] = ((parts["queryString"].split("#"))[0]).split("&");
        
        parts["requestParams"].forEach(function(queryStringVariable) {
            var __variable = queryStringVariable.split("=");
            parts.queryvars[__variable[0]] = __variable[1];
        });
      }
      // url
      parts["url"] = elements[0];


      // public interface
      // returns variable from query string
      this.getQueryStringVar = function(variable) {
          if (parts.queryvars[variable] !== "undefined") {
              return parts.queryvars[variable];
          }
          return false;
      };
    }])

    .factory('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['$resource'];

  function ProjectsService($resource) {
    var Project = $resource('api/projects/:projectId', {
      projectId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Project.prototype, {
      createOrUpdate: function () {
        var project = this;
        return createOrUpdate(project);
      }
    });

    return Project;

    function createOrUpdate(project) {
      if (project._id) {
        return project.$update(onSuccess, onError);
      } else {
        return project.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(project) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
