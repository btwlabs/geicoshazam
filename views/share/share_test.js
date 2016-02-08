'use strict';

describe('btw.share controller', function(){

  var $scope, shareCtrl;

  beforeEach(module('btw.share'));

  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();
    shareCtrl = $controller('shareCtrl', {$scope : $scope});
  }));

  // Expect a controller to be defined
  it('should be defined', inject(function($controller, $rootScope) {
    expect(shareCtrl).toBeDefined();
  }));
});