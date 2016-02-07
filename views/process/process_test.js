'use strict';

describe('btw.process controller', function(){

  var $scope, processCtrl;

  beforeEach(module('btw.process'));

  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();
    processCtrl = $controller('processCtrl', {$scope : $scope});
  }));

  // Expect a controller to be defined
  it('should be defined', inject(function($controller, $rootScope) {
    expect(processCtrl).toBeDefined();
  }));
});