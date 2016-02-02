'use strict';

angular.module('dwebform', ['ngResource', 'btw.api', 'dnode', 'formly', 'formlyBootstrap'])
.factory('dwebform', ['$resource', 'btwApi', 'dnode',
    function($resource, btwApi, dnode) {
        var webform = new Object;

        /**
         * Create a webform submission.
         */
        webform.create = function(id, data) {
            var api = $resource(btwApi.root + 'webform_submission/:id', {id: id});
            var submission = new api();
            for (var i in data) {
                // Add submission data to the submission object
                //var dataIndex = data[i].key;
                submission[i] = data[i];
            }
            // Post it to the server.
            return submission.$save();
        }

        /**
         * Update a webform submission.
         */
        webform.update = function(id, data) {

        }

        /**
         * Delete a webform submission.
         */
        webform.delete = function(id) {

        }

        /**
         * Retrieve a webform drupal node.
         */
        webform.retrieveForm = function(id) {
            return dnode.retrieve(id);
        }

        return webform;
}])
.directive('dWebform', ['$resource', 'btwApi', function($resource, btwApi) {

    var dwebformController = ['$scope', 'dwebform', function($scope, dwebform) {

        var convertComponent = function(component) {
            var result = {};
            result.key = component.form_key;
            result.className = component.extra.css_classes;
            result.defaultValue = component.value;
            result.templateOptions = {
                required: (parseInt(component.required) == 1),
                placeholder: component.extra.placeholder,
                name: component.name,
                description: component.extra.description
            }
            if (!(component.extra.title_display == 'none')) {
                result.templateOptions.label = component.name;
            }
            if (!(typeof component.extra.disabled == 'undefined')) {
                result.templateOptions.disabled = (component.extra.disabled == 1);
            }
            switch(component.type) {
                case 'textfield':
                    result.type = 'input';
                    result.templateOptions.type = 'text';
                    break;
                case 'email':
                    result.type = 'input';
                    result.templateOptions.type = 'email';
                    break;
                case 'textarea':
                    result.type = 'textarea';
                    result.templateOptions.rows = parseInt(component.extra.rows);
                    result.templateOptions.cols = parseInt(component.extra.cols);
                    break;
                default: result = false;
            }
            return result;
        }

        var parseComponents = function(components) {
            var result = [];
            for(var i in components) {
                var converted = convertComponent(components[i]);
                var converted = convertComponent(components[i]);
                if (converted) {
                    result[components[i].weight] = converted;
                }
            }
            return result;
        }

        // Grab the webform components from the server.
        var fetch = dwebform.retrieveForm($scope.wnid);
        fetch.then(function(data) {
            // Set fields to empty if the requested node has no webform.
            if (typeof data.webform == 'undefined') {
                return [];
            }
            // Parse the webform componenets into formly fields.
            $scope.fields = parseComponents(data.webform.components);
            /*var types = [];
            for (var i = 0; i < $scope.fields.length; i++) {
                types.push($scope.fields[i].key);
            }*/
        });

        // Add submit handler.
        $scope.submit = function(values) {
            // Post the results.
            var promise = dwebform.create($scope.wnid, values);
            promise.then(
                function(data) {
                    $scope.messageView = true;
                    $scope.message = 'Thank you for contacting us. We will be in touch asap!';
                },
                function(reason) {
                    $scope.messageView = true;
                    $scope.message = 'There was an error processing your contact form: ' + reason.status + ' - ' + reason.statusText;
                });
        }
    }];

    var dwebformLink = function($scope, iElement, iAttrs, controller) {

    };

    return {
        link: dwebformLink,
        controller: dwebformController,
        controllerAs: 'dwebformCntl',
        bindToController: false,
        scope: {
            wnid: '='
        },
        templateUrl: function(elem, attr) {
            if (!(typeof attr.tpl == 'undefined')) {
                return 'views/dwebform/dwebform--' + attr.tpl + '.html';
            }
            else {
                return 'components/dwebform/dwebform.html';
            }
        },
    };
}]);
