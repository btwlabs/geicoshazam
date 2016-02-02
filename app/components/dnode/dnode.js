'use strict';

angular.module('dnode', ['ngResource', 'btw.api'])

.factory('dnode', ['$resource', 'btwApi', '$q', '$sce',
    function($resource, btwApi, $q, $sce) {
        var dnode = new Object;

        // Provide a way to trust html from the drupal node.
        dnode.trustHtml = function(string) {
            return $sce.trustAsHtml(string);
        }

        /**
         * Create a node.
         */
        dnode.create = function(data) {
            // Mock update promise @todo add a real one.
            var promise = $q.defer().promise;
            return promise;
        }

        /**
         * Retrieve a node.
         */
        dnode.retrieve = function(id) {
            var data = $resource(btwApi.root + 'node/:id.json', {id: id});
            var result = data.get();
            return result.$promise;
        }

        /**
         * MOCK retrieve.
         */
        dnode.mockRetrieve = function(id) {
            // Mock index promise.
            var deferred = $q.defer();
            var promise = deferred.promise;
            // Set up to resolve the promise with some mock dnode data.
            var resolvedData = {};
            resolvedData.nid = 0;
            deferred.resolve(resolvedData);
            return promise;
        }

        /**
         * Update a node.
         */
        dnode.update = function(data) {
            // Mock update promise @todo add a real one.
            var promise = $q.defer().promise;
            return promise;
        }

        /**
         * Delete a node.
         */
        dnode.delete = function(id) {
            // Mock update promise @todo add a real one.
            var promise = $q.defer().promise;
            return promise;
        }

        /**
         * Fetch an index of nodes.
         */
        dnode.index = function(args) {
            // Build url.
            var $url = btwApi.root + 'views/nodes.json/';
            if (args.length > 0) {
                $url += '?';
                for (var i in args) {
                    $url += 'args[' + i + ']=' + args[i];
                    if (0 < i < (args.length - 1)) {
                        $url += '&';
                    }
                }
            }
            var api = $resource($url, [], {list:{method: 'GET', isArray: true}});
            var result = api.list();
            return result.$promise;
        }

        /**
         * MOCK index.
         */
        dnode.mockIndex = function(args) {
            // Mock index promise.
            var deferred = $q.defer();
            var promise = deferred.promise;
            // Set up to resolve the promise with some mock dnode data.
            var resolvedData = [];
            resolvedData.push({title: "foo"});
            resolvedData.push({title: "goo"});
            resolvedData.push({title: "boo"});
            deferred.resolve(resolvedData);
            return promise;
        }

        return dnode;
    }
])
.directive('dNodeList', function() {
    var dnodeListLink = function($scope, iElement, iAttrs, controller) {
        controller.load();
    }
    var dnodeListController = ['$scope', 'dnode', function($scope, dnode) {
        this.load = function() {
            var args = [];
            if (!(typeof $scope.types == 'undefined')) {
                args.push($scope.types);
            }
            if (!typeof $scope.terms == 'undefined') {
                args.push($scope.terms);
            }
            if (!typeof $scope.dates == 'undefined') {
                args.push($scope.dates);
            }
            // Check if this is a test.
            var callback = ($scope.types === 'test') ? dnode.mockIndex : dnode.index;
            var promise = callback(args);
            promise.then(function(data) {
                $scope.list = data;
            });
        }
    }];
    return {
        restrict: 'E',
        scope: {
            types: '@',
            terms: '@',
            dates: '@',
            select : '&onSelect',

        },
        controller: dnodeListController,
        controllerAs: 'dNodeList',
        bindToController: false,
        link: dnodeListLink,
        templateUrl: function(elem, attr) {
            if (!(typeof attr.tpl == 'undefined')) {
                return 'views/dnode/dnode-list--' + attr.tpl + '.html';
            }
            else {
                return 'components/dnode/dnode-list.html';
            }
        },
        replace: true,
    };
})
.directive('dNode', function() {
    var dnodeLink = function($scope, iElement, iAttrs, controller) {
        $scope.$watch("dnid", function(newValue, oldValue) {
            $scope.showNode = false;
            if (!(typeof newValue == 'undefined')) {
                controller.load();
            }
        }, true);
    };
    var dnodeController = ['$scope', 'dnode', function($scope, dnode) {
        $scope.dnode = {};
        this.load = function() {
            // Check if this is a test.
            var callback = ($scope.dnid === 0) ? dnode.mockRetrieve : dnode.retrieve;
            var promise = callback($scope.dnid);
            promise.then(
                function(data) {
                    $scope.dnode = data;
                    // Provide a way to trust html from the drupal node.
                    $scope.dnode.trustHtml = function(string) {
                        return $sce.trustAsHtml(string);
                    }
                    $scope.showNode = true;
                },
                function(reason) {

                }
            );
        }
    }];
    return {
        restrict: 'E',
        scope: {
            dnid: '=',
            dnode: '=',
        },
        controller: dnodeController,
        bindToController: false,
        link: dnodeLink,
        transclude: true,
        templateUrl: function(elem, attr) {
            if (!(typeof attr.tpl == 'undefined')) {
                return 'views/dnode/dnode--' + attr.tpl + '.html';
            }
            else {
                return 'components/dnode/dnode.html';
            }
        },
    };
});
