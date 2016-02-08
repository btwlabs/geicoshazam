'use strict';

angular.module('btw.share', ['ngRoute', 'dfile', 'btw.api'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/share', {
        templateUrl: 'views/share/share.html',
        controller: 'shareCtrl',
        paged: true,
    });
    OAuth.initialize('U4mzG-co02w_C3N4BL1XyM9SHB0');
}])

.controller('shareCtrl', ['$scope', 'dfile', 'startOver',
    function($scope, dfile, startOver) {
        /**
         * Initializations.
         */
        $scope.startOver = startOver.startOver;
        $scope.processedImageUrl = sessionStorage.getItem('processedImageUrl');

        $scope.shareFB = function() {
            OAuth.popup('facebook', {cache:true})
            .done(function(result) {
                var img = document.getElementById("user-image");
                var file = angular.element(img).attr('src');
                result.get('/me?fields=name,email,age_range,birthday,location,gender,religion').done(function(userRes) {
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
                        result.get('https://api.twitter.com/1.1/users/show.json').done(function(response) {
                            var taco = 'nono';
                            var bong = 'long';
                        });
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