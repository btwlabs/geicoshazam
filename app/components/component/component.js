'use strict';

angular.module('component', ['ngResource'])
.directive('component', function() {
    var componentLink = function($scope, iElement, iAttrs, controller, transclude) {}
    var componentController = ['$scope', function($scope) {}]

        return {
        restrict: 'A',
        scope: {},
        controller: componentController,
        controllerAs: 'componentCrtl',
        bindToController: false,
        link: componentLink,
        transclude: true,
        templateUrl: function(tElement, tAttrs) {

        },
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {},
                post: function postLink(scope, iElement, iAttrs, controller) {}
            }
            // or
            // return function postLink( ... ) { ... }
        },
        priority: 0,
    };
});