module.exports = function (grunt) {

    grunt.config('uglify', {
        options: {
            banner: "<%= banner %>"
        }
//        files: {
//            '<%= dirs.build.js %>': '<%= dirs.client.js %>'
//        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

};