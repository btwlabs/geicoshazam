'use strict';

describe('dnode-example controller', function(){

    var $scope, DnodeExampleCtrl;

    beforeEach(module('btw-examples.dnode-example'));

    beforeEach(inject(function($controller, $rootScope) {
        $scope = $rootScope.$new();
        DnodeExampleCtrl = $controller('DnodeExampleCtrl', {$scope : $scope});
    }));

    // Expect a controller to be defined
    it('should be defined', inject(function($controller, $rootScope) {
        expect(DnodeExampleCtrl).toBeDefined();
    }));
});