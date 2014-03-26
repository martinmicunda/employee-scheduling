module.exports = function (grunt) {

    grunt.config('jshint', {
        options: {
            jshintrc: '.jshintrc',
            // use a nice JSHint reporter
            reporter: require('jshint-stylish')
        },
        all: [
            '<%= dirs.gruntfile %>',
            '<%= dirs.client.js %>'
        ]
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

};