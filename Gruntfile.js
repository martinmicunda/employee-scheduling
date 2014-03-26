'use strict';

module.exports = function(grunt) {

    // Initialize the project config
    grunt.initConfig({
        /*
         * The project metadata that can be loaded from the package.json and reused in the Gruntfile.js
         */
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' +
            ' * Employee Scheduling v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %>(c) <%= pkg.author %>\n' +
            ' * Licensed under <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
            ' */\n',
        /*
         * The definition of all the sources files and their location.
         */
        dirs: {
            app: {
                gruntfile: 'Gruntfile.js',
                app: './app.js',
                server: {
                    jade: '/server/views/**/*.jade',
                    js: '/server/**/*.js',
                    test: '/test/server/**/*.js'
                },
                client: {
                    js: '/client/app/**/*.js',
//                    css: 'client/assets/**/*.css',
                    css: 'client/assets/css/app.css',
                    stylus: './client/assets/**/*.styl',
                    html: './client/app/**/*.html',
                    img: './client/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
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
            },
            build: {
                root: 'build/',
                css: 'build/client/css/{,*/}*.css',
                js: 'build/client/js/{,*/}*.js',
                img: 'build/client/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            },
            tmp: {
                root: '.tmp/'
            }
        }
    });

    // Displays the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    // Load all grunt tasks from `./grunt/` folder
    grunt.loadTasks('grunt-tasks');

    //--------------------------------
    // Default Task
    //--------------------------------
    grunt.registerTask('default',
        'Default development task',
        ['jshint', 'stylus:dev', 'csslint', 'concurrent']); // (martin) maybe add test task in the future

    //--------------------------------
    // Test Tasks
    //--------------------------------

    //--------------------------------
    // Build Tasks
    //--------------------------------
    grunt.registerTask('build',
        'Build and package the app', [
            'clean:prod',
//            'bowerInstall',
//            'jshint',
            'useminPrepare',
//            'stylus:prod',
            'csslint',
            'concat',
            'cssmin',
            'uglify',
//            'copy:prod',
            'rev',
            'usemin'
        ]
    );

};