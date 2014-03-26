module.exports = function (grunt) {

    grunt.config('rev', {
        prod: {
            files: {
                src: [
                    '<%= dirs.build.css %>',
                    '<%= dirs.build.js %>',
                    '<%= dirs.build.img %>'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-rev');

};