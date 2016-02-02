'use strict';
describe('Drupal node service', function() {
    beforeEach(module('dnode'));
    it('should have a REST create method that returns a promise', inject(function(dnode) {
        var promise = dnode.create({});
        expect(typeof promise.then == 'function').toBe(true);
    }));
    it('should have a REST retrieve method that returns a promise', inject(function(dnode) {
        var promise = dnode.retrieve(0);
        expect(typeof promise.then == 'function').toBe(true);
    }));
    it('should have a REST update method that returns a promise', inject(function(dnode) {
        var promise = dnode.update({});
        expect(typeof promise.then == 'function').toBe(true);
    }));
    it('should have a REST delete method that returns a promise', inject(function(dnode) {
        var promise = dnode.delete(0);
        expect(typeof promise.then == 'function').toBe(true);
    }));
    it('should have a REST index method that returns a promise', inject(function(dnode) {
        var promise = dnode.index({types:'page'});
        expect(typeof promise.then == 'function').toBe(true);
    }));
});

describe('Drupal node directive', function() {
    beforeEach(module('dnode'));
    beforeEach(module('PreprocessedTemplates'));
    it('Given a dnode nid should return a node with a nid', inject(function(dnode, $rootScope, $compile) {
        var $scope = $rootScope.$new();
        var element = angular.element('<d-node dnid="0" dnode="dnode"></d-node>');
        $compile(element)($scope);
        $scope.$digest();
        expect($scope.dnode.nid).toEqual(0);
    }))
});

describe('Drupal node index (list) directive', function() {
    beforeEach(module('dnode'));
    beforeEach(module('PreprocessedTemplates'));
    it('Given a node type should return an element with a correct class', inject(function(dnode, $rootScope, $compile) {
        var $scope = $rootScope.$new();
        var element = angular.element('<d-node-list types="test"></d-node-list>');
        $compile(element)($scope);
        $scope.$digest();
        expect(element.hasClass('node-list')).toBe(true);
    }))
});
