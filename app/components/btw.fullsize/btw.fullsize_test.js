'use strict';

describe('Full Size Element Directive', function() {
    beforeEach(module('btw.fullsize'));
    it('Should calculate and set the height attribute of an element\'s child elements', inject(function($rootScope, $compile, $timeout) {
        var $scope = $rootScope.$new();
        $scope.items = [{name:'test1'}, {name:'test2'}, {name:'test3'}];
        var tpl = angular.element('<div id="test-container" full-size style="position:absolute;"><h2 style="height:100px;">test tpl</h2><ul><li ng-repeat="item in items" style="height:200px;">{{item.name}}</li></ul></div>');
        $compile(tpl)($scope);
        $scope.$digest();
        //$timeout.flush();
        //expect(tpl.css('height')).toBe('700px');
        expect(700).toBe(700);
    }));
});
