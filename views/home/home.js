'use strict';

angular.module('btw.home', ['ngRoute', 'dfile', 'ngFileUpload'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'homeCtrl',
        paged: true,
    });
}])

.controller('homeCtrl', ['$scope', 'dfile',
    function($scope, dfile) {
        $scope.triggerUpload  = function() {
            if ($scope.fileUpload.file.$valid && $scope.file) {
                $scope.uploadFile($scope.file);
            }
        }
        $scope.uploadFile = function(file) {
            var parts = file.$ngfDataUrl.split(',');
            var upload = {};
            upload.file = parts[1];
            upload.filename = 'user-photo-' + Date.now();
            var promise = dfile.create(upload);
            promise.then(
                function(response) {
                    var go = 'yes';
                },
                function(reason) {
                    var go = 'no';
                });
        }
    }
]);