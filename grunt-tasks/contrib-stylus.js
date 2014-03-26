module.exports = function (grunt) {

    grunt.config('stylus', {
        dev: {
            files: [
                {
                    src: '<%= dirs.app.client.stylus %>',
                    dest: '<%= dirs.app.client.css %>'
                }
            ],
            options: {
                compress: false
            }
        },
        prod: {
            files: '<%= stylus.dev.files %>'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-stylus');

};