'use strict';

describe('btw.version module', function() {
  beforeEach(module('btw.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
