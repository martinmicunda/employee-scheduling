module.exports = function (grunt) {

    grunt.config('nodemon', {
        dev: {
            script: '../app.js',
            options: {
                args: [],
                nodeArgs: ['--debug'],
                callback: function (nodemon) {
                    nodemon.on('log', function (event) {
                        console.log(event.colour);
                    });
                },
                env: {
                    PORT: 3000
                },
                cwd: __dirname,
                // refer to .nodemonignore
                ignore: [],
                ext: 'js',
                watch: ['../server'],
                delay: 1
            }
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');

};