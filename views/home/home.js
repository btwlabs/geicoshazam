'use strict';

angular.module('btw.home', ['ngRoute', 'dfile', 'ngFileUpload'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'homeCtrl',
        paged: true,
    });
}])

.controller('homeCtrl', ['$scope', '$rootScope', 'dfile', '$location', 'Upload',
    function($scope, $rootScope, dfile, $location, Upload) {

        // Go to the next step handler.
        $scope.next  = function() {
            if ($scope.fileUpload.file.$valid && $scope.file) {
                //$rootScope.file = $scope.file;
                // Store file in local storage.
                sessionStorage.setItem("userImage", angular.toJson($scope.file));
                $location.path('/process');
            }
        }
    }
]);
