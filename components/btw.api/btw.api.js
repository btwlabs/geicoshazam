'use strict';

angular.module('btw.api', [])

.factory('btwApi', ['$location',
    function($location) {
        var api = new Object;
        api.root = 'http://dev-geicobackend.pantheon.io/api/v1/';
        api.imageRoot = 'http://dev-geicobackend.pantheon.io/sites/default/files/';
        return api;
    }]);
