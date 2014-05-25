#!/usr/bin/env node

'use strict';

console.log('#################################');
console.log('####      CI Build     ##########');
console.log('#################################');

var exec = require('child_process').exec;
var BUILD_NUMBER, PULL_REQUEST, COMMIT, BRANCH;

function init() {
    // If we are on Travis CI, set our git credentials to make the travis commits look better
    if(process.env.TRAVIS) {
        console.log(process.env.TRAVIS);
        exec('git config --global user.name "Travis-CI"');
        exec('git config --global user.email "travis@travis-ci.org"');
        BUILD_NUMBER = process.env.TRAVIS_BUILD_NUMBER;
        PULL_REQUEST = process.env.TRAVIS_PULL_REQUEST;
        COMMIT = process.env.TRAVIS_COMMIT;
        BRANCH = process.env.TRAVIS_BRANCH;
    } else if(process.env.JENKINS_HOME) {
        BUILD_NUMBER = process.env.TRAVIS_BUILD_NUMBER;
        PULL_REQUEST = false;
        COMMIT = process.env.GIT_COMMIT;
        BRANCH = process.env.GIT_BRANCH;
    } else {
        // For testing if we aren't on CI
        BUILD_NUMBER = Math.floor((Math.random() * 100) + 1);
        PULL_REQUEST= false;
        COMMIT = exec('(git rev-parse HEAD)');
        BRANCH = 'origin/master';
    }

    console.log('BRANCH=' + BRANCH);
    console.log('BUILD_NUMBER=' + BUILD_NUMBER);
    console.log('PULL_REQUEST=' + PULL_REQUEST);
    console.log('COMMIT=' + COMMIT);
}

var installDependencies = function(callback) {

    console.log('Installing NPM packages...');

    var install = exec('npm install', function(error) {
        if (error !== null) {
            console.error('Error installing NPM packages: ' + error);
            process.exit(1);
        } else {
            callback();
        }
    });

    install.stdout.pipe(process.stdout);
    install.stderr.pipe(process.stderr);

};

var gulpBuild = function(callback) {

    console.log('Build production app code...');

    var install = exec('gulp build --notest --nocdn', function(error) {
        if (error !== null) {
            console.error('Error build production app code: ' + error);
            process.exit(1);
        } else {
            callback();
        }
    });

    install.stdout.pipe(process.stdout);
    install.stderr.pipe(process.stderr);

};

var gulpTest = function() {

    console.log('Running unit tests...');

    var install = exec('gulp test:unit', function(error) {
        if (error !== null) {
            console.error('Error running unit tests: ' + error);
            process.exit(1);
        }
    });

    install.stdout.pipe(process.stdout);
    install.stderr.pipe(process.stderr);

};

function run() {
    init();

    installDependencies(function cb() {
        gulpBuild(function cb() {
            gulpTest();
        });
    });


}

run();