'use strict';

angular.module('btw.pager', ['ngRoute'])

.run(['$location', '$rootScope', '$route' , function($location, $rootScope, $route) {
    var filterRoutes = function(element, index, array) {
        // Don't include route if it has no controller.
        if (typeof element.controller == 'undefined') {
            return false;
        }
        // Don't include route if it does not have top-level:true.
        if ((typeof element.paged == 'undefined') || (element.paged != true)) {
            return false;
        }
        return true;
    }

    var pageNumFromPath = function(routes, path) {
        for (var i in routes) {
            if (routes[i].originalPath == path) {
                return parseInt(i);
            }
        }
    }

    var pathFromPageNum = function(routes, pageNum) {
        return routes[pageNum].originalPath;
    }

    // Get and array of all router items with controllers.
    var routes = Object.keys($route.routes).map(function(k) { return $route.routes[k] }).filter(filterRoutes);
    $rootScope.routes = routes;

        // Set the location path to the next page.
    $rootScope.nextPage = function() {
        // Check if this is the last route.
        if ($rootScope.routeNum == (routes.length - 1)) {
            // Reset route num to first route;
            $rootScope.routeNum = 0;
        }
        else {
            $rootScope.routeNum++;
        }
        $rootScope.swipedLeft = true;
        $rootScope.swipedRight = false;
        $location.path(pathFromPageNum(routes, $rootScope.routeNum));
    }

    // Set the location path to the previous page.
    $rootScope.prevPage = function() {
        // Check if this is the last route.
        if ($rootScope.routeNum == 0) {
            // Reset route num to first route;
            $rootScope.routeNum = routes.length - 1;
        }
        else {
            $rootScope.routeNum--;
        }
        $rootScope.swipedLeft = false;
        $rootScope.swipedRight = true;
        $location.path(pathFromPageNum(routes, $rootScope.routeNum));
    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        // Update the routeNum counter.
        $rootScope.routeNum = pageNumFromPath(routes, $location.path());

        // Supply the name of the current route from path.
        if (typeof $rootScope.routeNum != 'undefined') {
            $rootScope.routeName = routes[$rootScope.routeNum].originalPath.substr(1);
        }
        // Only apply animation class to view if it's not the homepage.
        if (!($rootScope.routeNum == 0) && !$rootScope.mainVisitedOnce) {
            $rootScope.mainVisitedOnce = true;
        }
        $rootScope.currentUrl = $location.absUrl();
    });
}])
.directive('btwPagerDots', function(){
    return {
       restrict: "E",
       templateUrl: 'components/btw.pager/btw.pager-dots.html',
       replace: true
    }
})
.directive('btwPagerLinks', function(){
    var btwPagerLinksController = ['$scope', function($scope) {
        var setRouteNums = function(thisVal) {
            var numRoutes = $scope.routes.length - 1;
            // Get prev route num.
            var prev = thisVal - 1;
            if (prev < 0) {
                prev = numRoutes;
            }
            // Get next route num.
            var next = thisVal + 1;
            if (next > numRoutes) {
                next = 0;
            }
            $scope.nextRouteNum = next;
            $scope.prevRouteNum = prev;
        }
        $scope.$watch('routeNum', function(newVal, oldVal)
        {
            if(typeof newVal == 'undefined') {
                newVal = $scope.routeNum;
            }
            setRouteNums(newVal)
        });
    }];
    return {
        restrict: "E",
        controller: btwPagerLinksController,
        templateUrl: 'components/btw.pager/btw.pager-links.html',
        replace: true
    }
});
