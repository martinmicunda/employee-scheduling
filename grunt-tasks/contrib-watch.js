module.exports = function (grunt) {

    grunt.config('watch', {
        options: {
            livereload: true
        },
        js: {
            files: ['<%= dirs.client.js %>', '<%= dirs.server.js %>'],
            tasks: ['jshint'],
            options: {
                livereload: true,
                spawn: false
            }
        },
        css: {
            files: ['<%= dirs.client.css %>'],
            tasks: ['csslint']
        },
        html: {
            files: ['<%= dirs.client.html %>'],
            tasks: []
        },
        img: {
            files: ['<%= dirs.client.img %>'],
            tasks: []
        },
        jade: {
            files: ['<%= dirs.server.jade %>'],
            tasks: ['jade:dev']
        },
        stylus: {
            files: ['<%= dirs.client.stylus %>'],
            tasks: ['stylus:dev']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

};