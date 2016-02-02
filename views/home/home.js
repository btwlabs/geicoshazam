'use strict';

angular.module('btw.home', ['ngRoute', 'dwebform', 'dview', 'dfile', 'dnode', 'ezfb'])

.config(['$routeProvider', 'ezfbProvider', function($routeProvider, ezfbProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'homeCtrl',
        paged: true,
    });
    ezfbProvider.setInitParams({
        // This is my FB app id for plunker demo app
        appId: '779006838893577',

        // Module default is `v2.4`.
        // If you want to use Facebook platform `v2.3`, you'll have to add the following parameter.
        // https://developers.facebook.com/docs/javascript/reference/FB.init
        version: 'v2.3'
    });
}])

.controller('homeCtrl', ['$scope', 'ezfb',
    function($scope, ezfb) {
        var fbResponse = function(res) {
            var go = 'NO';
        }
        $scope.shareFB = function() {
            var res;
            ezfb.ui({
                method: "feed",
                link: "http://www.bythewaylabs.com",
                name: "A test linkback to btwlabs.com",
                description: "This is a test link that goes back to our website. Testing some FB integration",
                caption: "This is the caption of the link.",
                picture: "http://geicoshazam.bythewaylabs.com/assets/images/btwlabs-logomark_blue-accent_transbg_800x800.png"
            }, fbResponse(res));
        }
    }
]);