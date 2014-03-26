module.exports = function (grunt) {

    grunt.config('cssmin', {
        options: {
            banner: "<%= banner %>"
        }
//        files: {
//            src: '<%= dirs.build.root %><%= dirs.client.css %>',
//            dest: '<%= dirs.build.css %>'
//        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');

};