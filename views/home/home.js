'use strict';

angular.module('btw.home', ['ngRoute', 'dfile'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'homeCtrl',
        paged: true,
    });
}])

.controller('homeCtrl', ['$scope', 'dfile',
    function($scope, dfile) {
        var fbResponse = function(res) {
            var go = 'NO';
        }
        $scope.shareFB = function() {
            OAuth.popup('facebook', {cache:true})
            .done(function(result) {
                var img = document.getElementById("user-image");
                var file = angular.element(img).attr('src');
                result.post('/me/photos', {
                    data: {
                        url: 'http://geicoshazam.bythewaylabs.com/assets/images/btwlabs-logomark_blue-accent_transbg_800x800.png',
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
                        result.post('https://api.twitter.com/1.1/statuses/update_with_media.json', {
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