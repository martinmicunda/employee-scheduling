module.exports = function (grunt) {

    grunt.config('concat', {
        options: {
            banner: "<%= banner %>"
        }
//        files: {
//            '<%= dirs.build.js %>': '<%= dirs.client.js %>'
//        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

};