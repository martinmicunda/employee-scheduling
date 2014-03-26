module.exports = function (grunt) {

    grunt.config('copy', {
        prod: {
            files: [
                {
                    expand: true,
                    cwd: './',
                    src: [
                        'server/**',
                        'app.js',
                        'package.json',
                        '.gitignore',
                        'Procfile'
                    ],
                    filter: 'isFile',
                    dest: 'build/'
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

};