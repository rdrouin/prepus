var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
      console.log('configurating routes...');
    $routeProvider
      .when('/', {
        templateUrl: './views/index.html'
      })
      .when('/global', {
        templateUrl: './views/global.html'
      })
      .when('/whatever', {
        templateUrl: './views/whatever.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
  