'use strict';

angular.module('btw.process', ['ngRoute', 'dfile', 'btw.api', 'ngFileUpload'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/process', {
        templateUrl: 'views/process/process.html',
        controller: 'processCtrl',
        paged: true,
    });
}])

.controller('processCtrl', ['$scope', '$location', 'dfile', 'btwApi', 'startOver',
    function($scope, $location, dfile, btwApi, startOver) {

        /**
         * Initializations.
         */

        // Initialize canvas object.
        var canvas = new fabric.Canvas('canvas');
        canvas.backgroundColor = 'rgba(255,255,255,255)';

        // Grab the user image file from session storage.
        $scope.file = angular.fromJson(sessionStorage.getItem("userImage"));

        // Grab the processed image if it exists.
        $scope.processedImageUrl = sessionStorage.getItem("processedImageUrl");

        // Watch and set imageProcessed.
        $scope.$watch('processedImageUrl', function(value) {
            $scope.imageProcessed = (typeof value == 'string');
        })

        $scope.startOver = startOver.startOver;

        //
        /**
         * Canvas Manipulation.
         */
        // Watch the file in scope and add images to it.
        $scope.$watch('file', function(fileVal) {
            if ((typeof fileVal != 'undefined') && (fileVal != null)) {
                var userImage;

                var checkAllLoaded = function() {
                    if (canvas.getObjects().length === 2) {
                        canvas.bringToFront(userImage);
                    }
                }

                // Add the layer Image.
                var layerImageElement = angular.element(document.getElementById('layer-image'));
                fabric.Image.fromURL(layerImageElement.attr('src'), function (image) {
                    //var image = new fabric.Image(img);
                    image.set({
                        left: 100,
                        top: 100,
                        selectable: true
                    });
                    canvas.add(image);
                    checkAllLoaded();
                });

                // Add the user image.
                fabric.Image.fromURL(fileVal.$ngfDataUrl, function (image) {
                    //var image = new fabric.Image(img);
                    userImage = image.set({
                        left: 100,
                        top: 100,
                        opacity: .5,
                        selectable: true
                    });
                    image.hasRotatingPoint = true;
                    canvas.add(image);
                    checkAllLoaded();
                });
            }
        })

        /**
         * File upload.
         */
        // Helper to get the encoded file data.
        var getFile = function(url) {
            var parts = url.split(',');
            return parts[1];
        }

        // Helper to construct a filename from the file object.
        var getFilename = function(url) {
            var parts = url.split(',');
            var parts2 = parts[0].split('/');
            var parts3 = parts2[1].split(';');
            return 'user-photo-' + Date.now() + '.' + parts3[0];
        }

        // Do the file upload to the server.
        $scope.uploadFile = function(file) {
            // De-select all objects in the canvas.
            canvas.deactivateAll().renderAll();
            var upload = {};
            var url = canvas.toDataURL({
                format: 'jpeg'
            })
            upload.file = getFile(url);
            upload.filename = getFilename(url);
            var promise = dfile.create(upload);
            promise.then(
                function(response) {
                    // Save the url to the new image based on filename, image style etc.
                    $scope.processedImageUrl = btwApi.imageRoot + upload.filename;
                    sessionStorage.setItem("processedImageUrl", $scope.processedImageUrl);
                    $location.path('/share');
                    
                },
                function(reason) {
                    // @todo log an error or something.
                });
        }
    }
]);
