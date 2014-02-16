'use strict';

module.exports = function(grunt) {

    grunt.config('clean', {
        all: ['build']
    });

    grunt.loadNpmTasks('grunt-contrib-clean');

};