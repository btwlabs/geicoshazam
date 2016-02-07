'use strict';

angular.module('btw.process', ['ngRoute', 'dfile', 'ngFileUpload'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/process', {
        templateUrl: 'views/process/process.html',
        controller: 'processCtrl',
        paged: true,
    });
}])

.controller('processCtrl', ['$scope', '$rootScope', 'dfile',
    function($scope, $rootScope, dfile) {
        $scope.file = angular.fromJson(sessionStorage.getItem("userImage"));
        var getFile = function(data) {
            var parts = data.$ngfDataUrl.split(',');
            return parts[1];
        }
        var getFilename = function(data) {
            var parts = data.$ngfDataUrl.split(',');
            var parts2 = parts[0].split('/');
            var parts3 = parts2[1].split(';');
            return 'user-photo-' + Date.now() + '.' + parts3[0];
        }
        $scope.triggerUpload  = function() {
            if ($scope.fileUpload.file.$valid && $scope.file) {
                $scope.uploadFile($scope.file);
            }
        }
        $scope.uploadFile = function(file) {
            var upload = {};
            upload.file = getFile(file);
            upload.filename = getFilename(file);
            var promise = dfile.create(upload);
            promise.then(
                function(response) {
                    // @todo save the url to the new image based on filename, image style etc.
                    
                },
                function(reason) {
                    // @todo log an error or something.
                });
        }
    }
]);