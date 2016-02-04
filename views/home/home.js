'use strict';

angular.module('btw.home', ['ngRoute', 'dfile'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'homeCtrl',
        paged: true,
    });
    OAuth.initialize('U4mzG-co02w_C3N4BL1XyM9SHB0');
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
                result.me().done(function(response) {
                    var taco = 'nono';
                    var bong = 'long';
                });
                result.post('/me/photos', {
                    data: {
                        url: 'http://geicoshazam.bythewaylabs.com/'+file,
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
                    result.me().done(function(response) {
                        var taco = 'nono';
                        var bong = 'long';
                    });
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