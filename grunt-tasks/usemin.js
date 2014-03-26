module.exports = function (grunt) {

    grunt.config('usemin', {
        html: '<%= dirs.build.root %><%= dirs.app.client.html %>',
        options: {
//            dirs: ['<%= dirs.build.root %>'],
            assetsDirs: ['<%= dirs.build.root %>/client']
//            patterns: {
//                jade: require('usemin-patterns').jade
//            }
        }
    });

    grunt.loadNpmTasks('grunt-usemin');

};