'use strict';

angular.module('btw.home', ['ngRoute', 'dfile', 'ezfb'])

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
    OAuth.initialize('U4mzG-co02w_C3N4BL1XyM9SHB0');
}])

.controller('homeCtrl', ['$scope', 'ezfb', 'dfile',
    function($scope, ezfb, dfile) {
        var fbResponse = function(res) {
            var go = 'NO';
        }
        $scope.shareFB = function() {
            /*var res;
            ezfb.ui({
                method: "feed",
                link: "http://www.bythewaylabs.com",
                name: "A test linkback to btwlabs.com",
                description: "This is a test link that goes back to our website. Testing some FB integration",
                caption: "This is the caption of the link.",
                picture: "http://geicoshazam.bythewaylabs.com/assets/images/btwlabs-logomark_blue-accent_transbg_800x800.png"
            }, fbResponse(res));*/
            OAuth.popup('facebook', {cache:true})
            .done(function(result) {
                var img = document.getElementById("user-image");
                var file = img.attr('src');
                result.post('/me/photos', {
                    data: {
                        source: file,
                        message: 'test message for fb photo'
                    },
                })
                .done(function(response) {
                    var go = 'yes';
                })
                .fail(function(error) {
                    var go = 'no';
                });
            })
            .fail(function(error) {
                var go = 'no';
                var no = no;
            });
        }
        $scope.shareTwitter = function() {
            OAuth.popup('twitter', {cache:true})
                .done(function(result) {
                    var img = document.getElementById("user-image");
                    var file = dfile.getBase64Image(img);
                    result.post('https://upload.twitter.com/1.1/media/upload.json', {
                        data: {
                            media_data: file,
                        },
                    })
                    .done(function(response) {
                        result.post('https://api.twitter.com/1.1/statuses/update.json', {
                            data: {
                                status: "test tweet, will need to come from a dialog",
                                media_ids: response.media_id_string,
                            }
                        })
                        .done(function(response) {
                            var go = 'yes';
                        })
                        .fail(function(error) {
                            var go = 'no';
                        });
                    })
                    .fail(function(error) {
                        var go = 'no';
                    });
                })
                .fail(function(error) {
                    var go = 'no';
                    var no = no;
                });
        }
    }
]);