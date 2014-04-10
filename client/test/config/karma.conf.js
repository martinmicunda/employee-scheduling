"use strict";

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../..',

        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // libraries
            'public/lib/jquery/dist/jquery.js',
            'public/lib/angular/angular.js',
            'public/lib/angular-mocks/angular-mocks.js',
            'public/lib/angular-cookies/angular-cookies.js',
            'public/lib/bootstrap/dist/js/bootstrap.js',
            'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
            'public/lib/lodash/dist/lodash.compat.js',
            'public/lib/restangular/dist/restangular.js',
            'public/lib/angular-ui-router/release/angular-ui-router.js',

            // our app
            'public/app/**/*-module.js',
            'public/app/**/!(*_test).js',

            // tests
            'public/app/**/*_test.js',

            // templates
//            'public/app/**/*.html'
        ],

        // list of files to exclude
        exclude: [
        ],

        // use dots reporter, as travis terminal does not support escaping sequences
        // possible values: 'dots', 'progress', 'junit'
        // CLI --reporters progress
        reporters: ['dots', 'junit', 'coverage'],

        junitReporter: {
            // will be resolved to basePath (in the same way as files/exclude patterns)
            outputFile: 'test/reports/unit-test-reports.xml',
            suite: 'unit'
        },

        preprocessors: {
            // source files, that you wanna generate coverage for - do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            '**/public/app/**/!(*_test).js': 'coverage'

            // generate js files from html templates
//            '**/public/app/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // strip this from the file path
//            stripPrefix: 'public/app/',
            // prepend this to the
//            prependPrefix: 'served/',
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
//            moduleName: 'st-templates'
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'test/reports/coverage/'
        },

        // web server port
        // CLI --port 9876
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        // CLI --colors --no-colors
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // CLI --log-level debug
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // CLI --auto-watch --no-auto-watch
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari
//        browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
        browsers: ['Chrome', 'Safari', 'Firefox'],

        // If browser does not capture in given timeout [ms], kill it
        // CLI --capture-timeout 5000
        captureTimeout: 20000,

        // Auto run tests on start (when browsers are captured) and exit
        // CLI --single-run --no-single-run
        singleRun: true,

        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 500,

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-safari-launcher',
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-ng-html2js-preprocessor'
        ]
    });
};