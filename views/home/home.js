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
        $scope.next  = function() {
            if ($scope.fileUpload.file.$valid && $scope.file) {
                $rootScope.file = $scope.file;
                // Store file in local storage.
                sessionStorage.setItem("userImage", angular.toJson($scope.file));
                $location.path('/process');
            }
        }
        $scope.$watch('file', function(newFile) {
            if (typeof newFile == 'undefined') {return}
            if (typeof newFile.$ngfDataUrl == 'undefined') {
                var getDataUrl = Upload.dataUrl($scope.file, true);
                getDataUrl.then(function(data) {
                    $scope.file.$ngfDataUrl = data;
                })
            }
        })
    }
]);
