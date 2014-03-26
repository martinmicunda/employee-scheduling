module.exports = function (grunt) {

    grunt.config('jade', {
        options: {
            data: {
//                config: require('../config/app'),
            }
        },
        dev: {
            files: [
                {
                    expand: true,
                    cwd: '<%= dirs.server.jade %>',
                    src: ['*.jade'],
                    dest: './build',
                    ext: '.html'
                }
            ],
            options: {
                client: false,
                pretty: true
            }
        },
        prod: {
            files: '<%= stylus.dev.files %>'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');

};