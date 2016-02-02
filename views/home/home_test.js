'use strict';

describe('btw.home controller', function(){

  var $scope, homeCtrl;

  beforeEach(module('btw.home'));

  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();
    homeCtrl = $controller('homeCtrl', {$scope : $scope});
  }));

  // Expect a controller to be defined
  it('should be defined', inject(function($controller, $rootScope) {
    expect(homeCtrl).toBeDefined();
  }));
});