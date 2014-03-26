module.exports = function (grunt) {

    grunt.config('useminPrepare', {
        prod: {
            html: '<%= dirs.app.client.html %>',
            options: {
                dest: '<%= dirs.build.root %>'
//                patterns: {
//                    jade: require('usemin-patterns').jade
//                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-usemin');

};