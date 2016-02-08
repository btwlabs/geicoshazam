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

        // Initialize canvas with layer image.


        /*var layerImgInstance = new fabric.Image(layerImageElement, {
            top: canvas.height/2,
            left: canvas.width/2,
            //scaleY: canvas.height / layerImageElement.height,
            //scaleX: canvas.width / layerImageElement.width,
            opacity: 1
        });
        canvas.add(layerImageElement);*/

        // Watch the file in scope and add images to it.
        $scope.$watch('file', function(fileVal) {
            var canvas = new fabric.Canvas('canvas');
            var userImage;
            function checkAllLoaded() {
                if (canvas.getObjects().length === 2) {
                    canvas.bringToFront(userImage);
                }
            }
            var layerImageElement = angular.element(document.getElementById('layer-image'));
            fabric.Image.fromURL(layerImageElement.attr('src'), function(image) {
            //fabric.util.loadImage(layerImageElement.attr('src'), function (img) {
                //var image = new fabric.Image(img);
                image.set({
                    left: 100,
                    top: 100,
                    selectable: true
                });
                canvas.add(image);
                checkAllLoaded();
            });
            fabric.Image.fromURL(fileVal.$ngfDataUrl, function (image) {
                //var image = new fabric.Image(img);
                userImage = image.set({
                    left: 100,
                    top: 100,
                    opacity:.5,
                    selectable: true
                });
                image.hasRotatingPoint = true;
                canvas.add(image);
                checkAllLoaded();
            });
        })

        // Grab the user image file from session storage.
        $scope.file = angular.fromJson(sessionStorage.getItem("userImage"));

        // Helper to get the encoded file data.
        var getFile = function(data) {
            var parts = data.$ngfDataUrl.split(',');
            return parts[1];
        }

        // Helper to construct a filename from the file object.
        var getFilename = function(data) {
            var parts = data.$ngfDataUrl.split(',');
            var parts2 = parts[0].split('/');
            var parts3 = parts2[1].split(';');
            return 'user-photo-' + Date.now() + '.' + parts3[0];
        }

        // Trigger uploading the file object data to the server.
        $scope.triggerUpload  = function() {
            if ($scope.fileUpload.file.$valid && $scope.file) {
                $scope.uploadFile($scope.file);
            }
        }

        // Do the file upload to the server.
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
