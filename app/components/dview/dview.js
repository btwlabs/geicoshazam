'use strict';

angular.module('dview', ['ngResource', 'btw.api'])
.factory('dview', ['$resource', 'btwApi', '$q',
    function($resource, btwApi, $q) {
        var dview = new Object;

        /**
         * Fetch an index of nodes.
         */
        dview.index = function(id, display, args) {
            // Build url.
            var $url = btwApi.root + 'views/' + id + '.json/?display_id=' + display + '&' + args;
            var api = $resource($url, [], {list:{method: 'GET', isArray: true}});
            var result = api.list();
            return result.$promise;
        }

        /**
         * Mock fetch an index of nodes.
         */
        dview.mockIndex = function(id, display, args) {
            // Mock index promise.
            var deferred = $q.defer();
            var promise = deferred.promise;
            // Set up to resolve the promise with some mock dnode data.
            var resolvedData = [];
            resolvedData.push({node_title: "foo"});
            resolvedData.push({node_title: "goo"});
            resolvedData.push({node_title: "boo"});
            deferred.resolve(resolvedData);
            return promise;
        }

        return dview;
    }
])
.directive('dView', function() {
    var dviewLink = function($scope, iElement, iAttrs, controller) {
        $scope.$watchGroup(['id', 'display', 'args'], function(newVals) {
            if (typeof newVals == 'undefined') {return}
            if (typeof iAttrs.dView != 'undefined') {
                $scope.id = iAttrs.dView;
            }
            if (typeof $scope.display == 'undefined') {
                $scope.display = 'default';
            }
            if (typeof $scope.args == 'undefined') {
                $scope.args = '';
            }
            controller.load();
        });
    }
    var dviewController = ['$scope', 'dview', '$sce', function($scope, dview, $sce) {
        // Provide a way to trust html from the drupal node.
        $scope.trustHtml = function(string) {
            return $sce.trustAsHtml(string);
        }
        this.load = function() {
            // Check if this is a test.
            var callback = ($scope.id === 'test') ? dview.mockIndex : dview.index;
            var promise = callback($scope.id, $scope.display, $scope.args);
            promise.then(function(data) {
                $scope.list = data;
            });
        }
    }];
    return {
        restrict: 'E,A',
        scope: {
            id: '@',
            display: '@',
            args: '@',
        },
        controller: dviewController,
        controllerAs: 'dView',
        bindToController: false,
        link: dviewLink,
        templateUrl: function(elem, attr) {
            if (!(typeof attr.tpl == 'undefined')) {
                return 'views/dview/dview--' + attr.tpl + '.html';
            }
            else {
                return 'components/dview/dview.html';
            }
        },
        replace: true,
    };
});