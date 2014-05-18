#!/usr/bin/env node

'use strict';

console.log('#################################"');
console.log('####      CI Build     ##########"');
console.log('#################################"');

function init() {
    // If we are on Travis CI, set our git credentials to make the travis commits look better
    console.log(process.env.NODE);
    console.log(process.env.TRAVIS);

//    if [[ "$TRAVIS" == "true" ]]; then
//    git config --global user.name 'Travis-CI'
//    git config --global user.email 'yourgithub@email.com'
//    BUILD_NUMBER=$TRAVIS_BUILD_NUMBER
//    PULL_REQUEST=$TRAVIS_PULL_REQUEST
//    COMMIT=$TRAVIS_COMMIT
//    BRANCH=$TRAVIS_BRANCH
//    elif [[ -n "$JENKINS_HOME" ]]; then
//    echo "JENKINS"
//    BUILD_NUMBER=$BUILD_NUMBER
//    PULL_REQUEST=false
//    COMMIT=$GIT_COMMIT
//    BRANCH=$GIT_BRANCH
//else
//# For testing if we aren't on CI
//    BUILD_NUMBER=$RANDOM
//    PULL_REQUEST=false
//    COMMIT=$(git rev-parse HEAD)
//    BRANCH=origin/master
//    fi
}

function run() {
    init();
}

run();