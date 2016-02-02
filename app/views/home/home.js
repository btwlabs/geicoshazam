'use strict';

angular.module('btw.home', ['ngRoute', 'dwebform', 'dview', 'dfile', 'dnode'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'homeCtrl',
        paged: true,
    });
}])

.controller('homeCtrl', ['$scope',
    function($scope) {

    }
]);