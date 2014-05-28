/*jshint -W079*/
/*jshint -W098*/
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
    'use strict';

    // Init module configuration options
    var applicationModuleName = 'employee-scheduling';
    var applicationModuleVendorDependencies = ['restangular', 'ui.router', 'ui.bootstrap'];

    // Add a new vertical module
    var registerModule = function(moduleName) {
        // Create angular module
        angular.module(moduleName, []);

        // Add the module to the AngularJS configuration file
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();