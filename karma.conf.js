module.exports = function(config){
    config.set({

    basePath : './',

    files : [
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-route/angular-route.js',
        'app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/api-check/dist/api-check.js',
        'app/bower_components/angular-formly/dist/formly.js',
        'app/bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
        'app/bower_components/angular-mocks/angular-mocks.js',
        'app/components/**/*.js',
        'app/view*/**/*.js',
        'app/view*/**/*.html',
        'app/components*/**/*.html',
    ],

    preprocessors: {
        'app/components*/**/*.html': ['ng-html2js'],
        'app/view*/**/*.html': ['ng-html2js'],
    },

    ngHtml2JsPreprocessor: {
        // strip this from the file path
        stripPrefix: 'app/',
        moduleName: 'PreprocessedTemplates'
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

    });
};
