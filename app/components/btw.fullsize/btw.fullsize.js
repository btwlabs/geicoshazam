'use strict';

angular.module('btw.fullsize', [])
.directive('fullSize', ['$timeout', '$http', function($timeout, $http) {
    var fullSizeLink = function($scope, iElement, iAttrs) {
        var waitForFullSize = function () {
            if ($http.pendingRequests.length == 0) {
                iElement.attr('style', 'height: ' + (iElement[0].scrollHeight) + 'px');
                $scope.__height = iElement[0].scrollHeight;
            }
        }
        $scope.$watch(function() {
            waitForFullSize();
        });
        $timeout(waitForFullSize, 0, false);
    }
    return {
        restrict: 'A',
        link: fullSizeLink,
    };
}]);