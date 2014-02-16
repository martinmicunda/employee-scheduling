'use strict';

module.exports = function(grunt) {

    // Initialize the project config
    grunt.initConfig({
        distdir: 'build',
        /*
         * The project metadata that can be loaded from the package.json and reused in the Gruntfile.js
         */
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' +
            ' * Employee Scheduling v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %>(c) <%= pkg.author %>\n' +
            ' * Licensed under <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
            ' */\n\n',
        /*
         * The definition of all the sources files and their location.
         */
        dirs: {
            gruntfile: 'Gruntfile.js',
            server: {
                jade: './server/src/app/view/**/*.jade',
                src: 'server/**/*.js',
                test: 'test/server/**/*.js'
            },
            client: {
                js: './client/src/app/**/*.js',
                css: './client/src/assets/**/*.css',
                img: './client/src/assets/img',
                tests: {
                    integration: {
                        config: 'test/karma/integration.conf.js',
                        src: 'test/karma/integration/**/*.js'
                    },
                    unit: {
                        config: './client/test/config/karma-unit.conf.js',
                        src: './client/test/unit/**/*.js'
                    }
                }
            }
        }
    });

    // Displays the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    // Load all grunt tasks from `./grunt/` folder
    grunt.loadTasks('grunt');

    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });

    // Register alias tasks.
    grunt.registerTask('cleann', 'Deploy site via gh-pages.', ['clean']);

};