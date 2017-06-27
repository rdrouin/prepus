var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
      console.log('configurating routes...');
    $routeProvider
      .when('/', {
        templateUrl: './views/index.html'
      })
      .when('/whatever', {
        templateUrl: './views/whatever.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
  