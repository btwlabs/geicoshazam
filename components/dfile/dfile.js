'use strict';

angular.module('dfile', ['ngResource', 'btw.api'])

.factory('dfile', ['$resource', 'btwApi', '$q',
    function($resource, btwApi, $q) {

        var file = new Object;

        /**
         * Create a file.
         */
        file.create = function(data) {
            // Mock update promise @todo add a real one.
            var promise = $q.defer().promise;
            return promise;
        }

        /**
         * Retrieve a file.
         */
        file.retrieve = function(id, style) {
            var useStyle = (typeof style != 'undefined');
            var api = $resource(btwApi.root + 'file/:id.json', {id: id, file_contents: 0, image_styles: useStyle});
            var result = api.get();
            return result.$promise;
        }

        /**
         * MOCK retrieve.
         */
        file.mockRetrieve = function(id, style) {
            // Mock retrieve promise.
            var deferred = $q.defer();
            var promise = deferred.promise;
            // Set up to resolve the promise with some mock dfile data.
            var resolvedData = {};
            resolvedData.image_styles = {
                foo1 : 'https://foo.boo/foo1.img',
                foo2 : 'https://foo.boo/foo2.img'
            }
            resolvedData.style = (typeof style != 'undefined') ? style : false;
            deferred.resolve(resolvedData);
            return promise;
        }

        /**
         * Update a file.
         */
        file.update = function(data) {
            // Mock update promise @todo add a real one.
            return $q.defer().promise;
        }

        /**
         * Delete a file.
         */
        file.delete = function(id) {
            // Mock update promise @todo add a real one.
            return $q.defer().promise;
        }

        return file;
    }])
.directive('dFileSrc', ['$compile', function($compile) {
    var getUrl = function(dfile, style) {
        if (typeof dfile == 'undefined') {
            return;
        }
        if (style) {
            var url = dfile.image_styles[style];
        }
        else {
            var url = dfile.uri_full;
        }
        return url;
    }
    var dfileSrcLink = function($scope, iElement, iAttrs, controller) {
        $scope.$watch('dFileSrc', function(newVal, oldVal) {
            if (! ((typeof $scope.dFileSrc == 'undefined') || (isNaN($scope.dFileSrc))) ) {
                $scope.$emit('dFileSrcChg', oldVal);
                iAttrs.$set('ng-show', false);
                $compile(iElement)($scope);
                controller.load($scope.dFileSrc);
            }
        });
        $scope.$watch('dfile', function(dfile) {
            if (typeof dfile == 'undefined') {return}
            var url = getUrl(dfile, $scope.imageStyle);
            iAttrs.$set('src', url);
            iElement.on('load', function(e) {
                iAttrs.$set('ng-show', true);
                $compile(iElement)($scope);
                $scope.$emit('dFileSrcActive', dfile.fid);
            });
        });
    }
    var dfileSrcController = ['$scope', 'dfile', function($scope, dfile) {
        // Load a dfile from the directive.
        this.load = function() {
            // Check if this is a test.
            var callback = ($scope.dFileSrc === 0) ? dfile.mockRetrieve : dfile.retrieve;
            var promise = callback($scope.dFileSrc, $scope.imageStyle);
            promise.then(function(data) {
                $scope.dfile = data;
            });
        }
    }];
    return {
        restrict: 'A',
        scope: {
            dFileSrc: '=',
            imageStyle: '@'
        },
        controller: dfileSrcController,
        controllerAs: 'dFileSrcCrtl',
        bindToController: false,
        link: dfileSrcLink,
    };
}])
.directive('dFileAnimate', function() {
    return {
        restrict: 'A',
        link: function($scope, iElement, iAttrs) {
            iElement.addClass('dfile-src-change');
            iElement.on('load', function(e) {
                iElement.addClass('dfile-src-change-loaded');
            });
        },
    };
});
