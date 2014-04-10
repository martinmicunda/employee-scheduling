exports.config = {
    // The address of a running selenium server.
    seleniumServerJar: '../../node_modules/protractor/selenium/selenium-server-standalone-2.40.0.jar',
    //seleniumAddress: 'http://localhost:4444/wd/hub',

    // ----- What tests to run -----
    //
    // Spec patterns are relative to the location of this config.
    specs: [
        '../e2e/**/*.js'
    ],

    baseUrl: 'http://127.0.0.1:3000',

    // Capabilities to be passed to the webdriver instance.
//    capabilities: {
//        'browserName': 'chrome'
//    },

    multiCapabilities: [
        {
            'browserName': 'chrome'
        },
        {
            'browserName': 'safari'
        },
        {
            'browserName': 'firefox'
        }
    ],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};