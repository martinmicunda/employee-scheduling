module.exports = function (grunt) {

    grunt.config('csslint', {
        strict: {
            options: {
                import: 2
            },
            src: '<%= dirs.build.css %>'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-csslint');

};