'use strict';

angular.module('btw.version', [
  'btw.version.interpolate-filter',
  'btw.version.version-directive'
])

.value('version', '0.1');
