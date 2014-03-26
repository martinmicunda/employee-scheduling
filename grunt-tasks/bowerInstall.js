module.exports = function (grunt) {

    grunt.config('bowerInstall', {
        target: {
            src: [
                '<%= dirs.app.client.html %>'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-bower-install');

};