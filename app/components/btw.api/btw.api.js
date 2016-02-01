'use strict';

angular.module('btw.api', [])

.factory('btwApi', ['$location',
    function($location) {
        var api = new Object;
        api.root = 'http://drupal7.dd:8082/api/v1/';
        return api;
    }]);
