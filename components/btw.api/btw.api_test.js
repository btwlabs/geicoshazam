'use strict';

describe('api service', function() {
    beforeEach(module('btw.api'));
    it('should be able to return a variable', inject(function(btwApi, $httpBackend) {
        $httpBackend.expect('GET', btwApi.root).respond(200);
    }));
});
