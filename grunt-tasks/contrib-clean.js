module.exports = function (grunt) {

    grunt.config('clean', {
        prod: ['build/', '.tmp/']
    });

    grunt.loadNpmTasks('grunt-contrib-clean');

};