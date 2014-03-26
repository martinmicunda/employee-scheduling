module.exports = function (grunt) {

    grunt.config('concurrent', {
        tasks: ['nodemon:dev', 'watch'],
        options: {
            logConcurrentOutput: true
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');

};