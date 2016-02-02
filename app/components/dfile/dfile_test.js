'use strict';

describe('Drupal file service', function() {
    beforeEach(module('dfile'));
    it('should have a REST create method that returns a promise', inject(function(dfile) {
        var promise = dfile.create({});
        expect(typeof promise.then == 'function').toBe(true);
    }));
    it('should have a REST retrieve method that returns a promise', inject(function(dfile) {
        var promise = dfile.retrieve(0);
        expect(typeof promise.then == 'function').toBe(true);
    }));
    it('should have a REST update method that returns a promise', inject(function(dfile) {
        var promise = dfile.update({});
        expect(typeof promise.then == 'function').toBe(true);
    }));
    it('should have a REST delete method that returns a promise', inject(function(dfile) {
        var promise = dfile.delete(1);
        expect(typeof promise.then == 'function').toBe(true);
    }));
});

describe('Drupal file src attribute directive', function() {
    beforeEach(module('dfile'));
    it('Given a dfile with style, should return a src url', inject(function(dfile, $rootScope, $compile) {
        var $scope = $rootScope.$new();
        $scope.testFid = 0;
        var element = angular.element('<elem d-file-src="testFid" image-style="foo1"></elem>');
        $compile(element)($scope);
        $scope.$digest();
        expect(element.attr('src')).toEqual('https://foo.boo/foo1.img');
    }))
});
