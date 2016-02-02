'use strict';
describe('Drupal view service', function() {
    beforeEach(module('dview'));
    it('should have a REST index method that returns a promise', inject(function(dview) {
        var promise = dview.index({types:'page'});
        expect(typeof promise.then == 'function').toBe(true);
    }));
});

describe('Drupal view directive', function() {
    beforeEach(module('dview'));
    beforeEach(module('PreprocessedTemplates'));
    it('Given a dview id should return a list of objects', inject(function(dview, $rootScope, $compile) {
        var $scope = $rootScope.$new();
        var element = angular.element('<d-view id="test"></d-view>');
        $compile(element)($scope);
        $scope.$digest();
        expect(element.hasClass('drupal-view')).toBe(true);
    }))
});
