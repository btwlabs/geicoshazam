'use strict';

describe('btw.pager dots', function() {
    beforeEach(module('btw.pager'));
    beforeEach(module('btw.home'));
    beforeEach(module('btw-examples.dnode-example'));
    beforeEach(module('PreprocessedTemplates'));
    var $compile, $rootScope, $route;
    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        $route = $injector.get('$route');
    }));
    it('should have 1 dot', inject(function($rootScope) {
        var element = angular.element('<btw-pager-dots></btw-pager-dots>');
        $compile(element)($rootScope);
        $rootScope.$digest();
        expect(element.find('li').length).toEqual(1);
    }));
    it('should have targeted links inside the dots', inject(function($location, $rootScope, $route) {
        var element = angular.element('<btw-pager-dots></btw-pager-dots>');
        $compile(element)($rootScope);
        $rootScope.$digest();
        var listItems = element.find('li');
        for (var i = 0; i < listItems.length; i++) {
            var link = angular.element(angular.element(listItems[i]).find('a'));
            // have the correct href.
            expect(typeof $route.routes[link.attr('href').substring(1)] == 'undefined').toBe(false);
        }
    }));
});

describe('btw.pager links', function() {
    beforeEach(module('btw.pager'));
    beforeEach(module('btw.home'));
    beforeEach(module('btw-examples.dnode-example'));
    beforeEach(module('PreprocessedTemplates'));
    it('should have 2 links', inject(function($location, $rootScope, $compile) {
        var element = angular.element('<btw-pager-links></btw-pager-links>');
        $compile(element)($rootScope);
        $rootScope.$digest();
        expect(element.find('li').length).toEqual(2);
    }));
    it('should have links that work', inject(function($rootScope, $compile) {
        var element = angular.element('<btw-pager-links></btw-pager-links>');
        $compile(element)($rootScope);
        $rootScope.$digest();
        var listItems = element.find('li');
        // If there is only one router item then should be 1;
        if ($rootScope.routes.length == 1) {
            expect(1).toEqual(1);
        }
        else {
            for (var i = 0; i < listItems.length; i++) {
                var link = angular.element(angular.element(listItems[i]).find('a'));
                // change location to a new routeNum when ng-click is triggered.
                var thisRoute = $rootScope.routeNum;
                link.triggerHandler('click');
                expect($rootScope.routeNum == thisRoute).toBe(false);
            }
        }
    }));

});
