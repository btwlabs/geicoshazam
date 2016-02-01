'use strict';

// Declare app level module which depends on views, and components
angular.module('btw', [
    'ngRoute',
    'ngAnimate',
    'ngResource',
    'angular-gestures',
    'btw.pager',
    'btw.home'
])
.config(['$routeProvider', 'hammerDefaultOptsProvider', function($routeProvider, hammerDefaultOptsProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
    hammerDefaultOptsProvider.set({
        recognizers: [[Hammer.Swipe, {direction: 6, prevent_default: false, threshold: 1, velocity: 0.1}]]
    });
}]);
