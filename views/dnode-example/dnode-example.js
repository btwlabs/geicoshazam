'use strict';

angular.module('btw-examples.dnode-example', ['ngRoute', 'btw.api'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/dnode-example', {
            templateUrl: 'views/dnode-example/dnode-example.html',
            controller: 'DnodeExampleCtrl'
        });
}])

.controller('DnodeExampleCtrl', ['$scope', function($scope) {
    $scope.dNodeTypes = 'dnode-example';
    $scope.setDnode = function(dnid) {
        $scope.dnid = dnid;
    }
    $scope.select = function(dnid) {
        $scope.setDnode(dnid);
        $scope.toggleShow();
    }
    $scope.visible = false;
    $scope.toggleShow = function() {
        $scope.visible = !$scope.visible;
    }
}]);
