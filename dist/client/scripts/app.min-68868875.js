/**
 * Employee Scheduling v0.0.0 (http://employee-scheduling.herokuapp.com)
 * Copyright 2014(c) [object Object]
 * Licensed under 
 */
var ApplicationConfiguration=function(){"use strict";var n="employee-scheduling",e=["restangular","ui.router","ui.bootstrap"],o=function(e){angular.module(e,[]),angular.module(n).requires.push(e)};return{applicationModuleName:n,applicationModuleVendorDependencies:e,registerModule:o}}();!function(){"use strict";angular.module(ApplicationConfiguration.applicationModuleName,ApplicationConfiguration.applicationModuleVendorDependencies),angular.element(document).ready(function(){angular.bootstrap(document,[ApplicationConfiguration.applicationModuleName])})}(),function(){"use strict";angular.module("ojng.config.env",[]).constant("name","ojng.config.env").constant("ENV",{name:"production",apiVersion:"1.0",templateBasePath:"templates/",cdnBaseUrl:"http://127.0.0.1:3000"})}();