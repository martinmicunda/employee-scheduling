'use strict';

//=============================================
//            DECLARE CORE VARIABLES
//=============================================

/**
 * Load required core dependencies. These are installed based on the versions listed
 * in 'package.json' when you do 'npm install' in this directory.
 */
var argv        = require('minimist')(process.argv.slice(2));
var gulp        = require('gulp');
var semver      = require('semver');
var browser      = require('tiny-lr')();
var wiredep     = require('wiredep').stream;
var runSequence = require('run-sequence');


//=============================================
//            DECLARE GULP VARIABLES
//=============================================

/**
 * Load required Gulp tasks. These are installed based on the versions listed
 * in 'package.json' when you do 'npm install' in this directory.
 */
var rev                  = require('gulp-rev');
var exec                 = require('gulp-exec');
var size                 = require('gulp-size');
var bump                 = require('gulp-bump');
var help                 = require('gulp-help')(gulp);
var gutil                = require('gulp-util');
var bower                = require('gulp-bower');
var ngmin                = require('gulp-ngmin');
var clean                = require('gulp-clean');
var karma                = require('gulp-karma');
var watch                = require('gulp-watch');
var inject               = require('gulp-inject');
var gulpif               = require('gulp-if');
var jshint               = require('gulp-jshint');
var header               = require('gulp-header');
var uglify               = require('gulp-uglify');
var usemin               = require('gulp-usemin');
var nodemon              = require('gulp-nodemon');
var csslint              = require('gulp-csslint');
var ghPages              = require("gulp-gh-pages");
var refresh              = require('gulp-livereload');
var cdnizer              = require("gulp-cdnizer");
var htmlhint             = require("gulp-htmlhint");
var imagemin             = require('gulp-imagemin');
var minifyCss            = require('gulp-minify-css');
var changelog            = require('gulp-conventional-changelog');
var protractor           = require("gulp-protractor").protractor;
var ngConstant           = require('gulp-ng-constant');
var minifyHtml           = require('gulp-minify-html');
var autoprefixer         = require('gulp-autoprefixer');
var templateCache        = require('gulp-angular-templatecache');
var coverageEnforcer     = require("gulp-istanbul-enforcer");
var webdriver_update     = require('gulp-protractor').webdriver_update;
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;


//=============================================
//            DECLARE CONSTANTS
//=============================================

/**
 * Declare environment constants that are use in gulpfile.js
 */
var PRODUCTION_URL       = 'http://rightdestinations.com';
var DEVELOPMENT_URL      = 'http://127.0.0.1:5000';
var PRODUCTION_CDN_URL   = 'http://static.rightdestinations.com';

/**
 * Declare constants that are use in gulpfile.js or angular app
 */
var ENV                  = !!argv.env ? argv.env : 'development';
var COLORS               = gutil.colors;
var BROWSERS             = !!argv.browsers ? argv.browsers : 'PhantomJS';
var CDN_BASE             = !!argv.nocdn ? DEVELOPMENT_URL : PRODUCTION_CDN_URL;
var MODULE_NAME          = 'ojng';
var API_VERSION          = '1.0';
var GIT_REMOTE_URL       = 'https://'+ process.env.GH_TOKEN +'@github.com/martinmicunda/employee-scheduling.git'; // git@github.com:martinmicunda/employee-scheduling.git
var LIVERELOAD_PORT      = 35729;
var TEMPLATE_BASE_PATH   = 'templates';
var BUILD_WITHOUT_TEST   = !!argv.notest ? true : false;
var APPLICATION_BASE_URL = ENV === 'development' ? DEVELOPMENT_URL : PRODUCTION_URL;


//=============================================
//            DECLARE VARIABLES
//=============================================
/**
 * Declare variables that are use in gulpfile.js
 */
var hasGitChanges   = '';
var isWatching      = false;


//=============================================
//            COMMAND LINE ERROR HANDLING
//=============================================

if(!ENV.match(new RegExp(/production|development/))) {
    gutil.log(COLORS.red('Error: The argument \'env\' has incorrect value \'' + ENV +'\'! Usage: gulp test:unit --env=(development|production)'));
    return process.exit(1);
}

if(!BROWSERS.match(new RegExp(/PhantomJS|Chrome|Firefox|Safari/))) {
    gutil.log(COLORS.red('Error: The argument \'browsers\' has incorrect value \'' + BROWSERS +'\'! Usage: gulp test:unit --env=(PhantomJS|Chrome|Firefox|Safari)'));
    return process.exit(1);
}


//=============================================
//            PRINT INFO MESSAGE
//=============================================
gutil.log(gutil.colors.blue('********** RUNNING IN ' + ENV + ' ENVIROMENT **********'));


//=============================================
//            DECLARE PATHS
//=============================================

var paths = {
    /**
     * The 'gulpfile' file is where our run tasks are hold.
     */
    gulpfile:   'gulpfile.js',
    /**
     * This is a collection of file patterns that refer to our client code (the
     * stuff in `client/`). These file paths are used in the configuration of
     * build tasks.
     *
     * - 'styles'       contains all project css styles
     * - 'images'       contains all project images
     * - 'fonts'        contains all project fonts
     * - 'scripts'      contains all project javascript except config-env.js and unit test files
     * - 'html'         contains main html files
     * - 'templates'    contains all project html templates
     * - 'config'       contains all client env config files
     * - 'test'         contains all project unit and e2e test code
     */
    client: {
        basePath:       'client/src/',
        styles:         'client/src/assets/styles/**/*.css',
        images:         'client/src/assets/images/**/*.{png,gif,jpg,jpeg}',
        fonts:          'client/src/assets/fonts/**/*',
        scripts:        ['client/src/app/**/*.js', '!client/src/app/config/config-env.js', '!client/src/app/**/*_test.js'],
        html:           'client/src/*.html',
        templates:      'client/src/app/**/*.html',
        config: {
            basePath:   'client/src/app/config/',
            file:       'client/src/app/config/config-env.json',
            template:   'client/src/app/config/config.tpl.ejs'
        },
        test: {
            unit:       'client/src/app/**/*_test.js',
            e2e:        'client/test/e2e/**/*_e2e.js'
        }
    },
    server:             'server/src/**/*',
    /**
     * The 'vendor' folder is where our bower dependencies are hold.
     */
    vendor:             'client/src/vendor/',
    /**
     * The 'tmp' folder is where our html templates are compiled to JavaScript during
     * the build process and then they are concatenating with all other js files and
     * copy to 'dist' folder.
     */
    tmp: {
        basePath:       '.tmp',
        scripts:        '.tmp/scripts/'
    },
    /**
     * The 'build' folder is where our app resides once it's
     * completely built.
     *
     * - 'dist'         application distribution source code
     * - 'testReports'  application test reports (coverage, failure screenshots etc.)
     * - 'docs'         application documentation
     */
    build: {
        basePath:       'build/',
        dist: {
            basePath:       'build/dist/',
            client: {
                basePath:   'build/dist/client/',
                images:     'build/dist/client/assets/images/',
                fonts:      'build/dist/client/assets/fonts/'
            },
            server: {
                basePath:   'build/dist/server/'
            }
        },
        testReports: {
            client: {
                coverage: 'build/test-reports/client/coverage/'
            },
            server: {
                coverage: ''
            }
        },
        docs:           'build/docs/'
    }
};


//=============================================
//            DECLARE BANNER DETAILS
//=============================================

/**
 * We read in our 'package.json' file so we can access the package name and
 * version. It's already there, so we don't repeat ourselves here.
 */
var pkg = require('./package.json');

/**
 * The banner is the comment that is placed at the top of our compiled
 * source files. It is first processed as a Grunt template, where the `<%=`
 * pairs are evaluated based on this very configuration object.
 */
var banner = ['/**',
    ' * Employee Scheduling v<%= pkg.version %> (<%= pkg.homepage %>)',
    ' * Copyright <%= date.getFullYear() %>(c) <%= pkg.author %>',
    ' * Licensed under <%= pkg.license %>',
    ' */',
    ''].join('\n');


//=============================================
//               SUB TASKS
//=============================================

gulp.task('develop', function () {
    var options = {
        script: 'server/src/server.js',
        ext: 'js json',
        ignore: ['client/**', 'node_modules/**'],
        stdout: false,
        stderr: false,
        nodeArgs: ['--debug'],
        watch: ["server/**/*"]
    };

    nodemon(options)
        .on('change', ['jshint:server'])
        .on('restart', function (files) {
            gutil.log('[server] App restarted due to: ', COLORS.cyan(files));
        }).on('stdout', function(raw) {
            var msg = raw.toString('utf8');
            gutil.log('[server]', COLORS.green(msg));
            if(msg.indexOf('avisi-website has started') !== -1) {
                refresh(browser)
            }
        }).on('stderr', function(err) {
            var msg = err.toString('utf8');

            // For some reason debugger attachment gets logged on 'stderr', so we catch it here...
            if (msg.indexOf('debugger listening on port') === 0) {
                gutil.log('[server]', COLORS.green(msg));
            } else {
                gutil.log('Node server ' + COLORS.red(err));
            }
        });
});

/**
 * The 'clean' task delete 'build' and '.tmp' directories.
 */
gulp.task('clean', 'Delete \'build\' and \'.tmp\' directories', function () {
    return gulp.src([paths.build.basePath, paths.tmp.basePath], {read: false}) // Not necessary to read the files (will speed up things), we're only after their paths
        .pipe(clean());
});

/**
 * The 'copy' task just copies files from A to B. We use it here to copy
 * our files that haven't been copied by 'compile' task e.g. (fonts, etc.) into 'build`.
 */
gulp.task('copy', 'Copy project files that haven\'t been copied by \'compile\' task e.g. (fonts, etc.) into \'build\' folder.', function () {
    gulp.src([
        'client/src/*.{ico,png,txt}'
    ])
        .pipe(gulp.dest(paths.build.dist.client.basePath));
    gulp.src(paths.client.fonts)
        .pipe(gulp.dest(paths.build.dist.client.fonts));
    gulp.src(paths.server)
        .pipe(gulp.dest(paths.build.dist.server.basePath));
    gulp.src(['package.json', 'Procfile'])
        .pipe(gulp.dest(paths.build.dist.basePath));
});

/**
 * The 'csslint' task defines the rules of our linter as well as which files we
 * should check. This file, all css sources.
 */
gulp.task('csslint', 'Lint CSS files', function () {
    var hasCssLintError = false;

    var errorReporter = function() {
        if(!isWatching && hasCssLintError) {
            return process.exit(1);
        }
    };

    return gulp.src(paths.client.styles)
        .pipe(csslint())
        .pipe(csslint.reporter(function(file) {
            if(!file.csslint.success) {
                var errorCount = file.csslint.errorCount;
                var plural = errorCount === 1 ? '' : 's';
                gutil.log(COLORS.cyan(errorCount) + ' error' + plural + ' found in ' + COLORS.magenta(file.path));
                file.csslint.results.forEach(function(result) {
                    gutil.log(COLORS.red('[csslint L' + result.error.line  + ':C' + result.error.col + '] ' + result.error.message));
                });
                hasCssLintError = true;
            }
        }))
        .pipe(refresh(browser))
        .pipe(size())
        .on('end', errorReporter);
});

/**
 * The 'jshint' task defines the rules of our hinter for client as well as which files we
 * should check. This file, all javascript sources.
 */
gulp.task('jshint:client', 'Hint client JavaScripts files', function () {
    return gulp.src(paths.client.scripts)
        .pipe(jshint('client/.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
//        .pipe(gulpif(!isWatching, jshint.reporter('fail')))
        .pipe(refresh(browser))
        .pipe(size());
});

/**
 * The 'jshint' task defines the rules of our hinter for server as well as which files we
 * should check. This file, all javascript sources.
 */
gulp.task('jshint:server', 'Hint server JavaScripts files', function () {
    return gulp.src(paths.server + 'js')
        .pipe(jshint('server/.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
//        .pipe(gulpif(!isWatching, jshint.reporter('fail')))
        .pipe(refresh(browser))
        .pipe(size());
});

/**
 * The 'htmlhint' task defines the rules of our hinter as well as which files we
 * should check. This file, all html sources.
 */
gulp.task('htmlhint', 'Hint HTML files', function () {
    var hasHtmlHintError = false;

    var errorReporter = function() {
        if(!isWatching && hasHtmlHintError) {
//            return process.exit(1);
        }
    };

    return gulp.src([paths.client.html, paths.client.templates])
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter(function(file) {
            if(!file.htmlhint.success) {
                var errorCount = file.htmlhint.errorCount;
                var plural = errorCount === 1 ? '' : 's';
                gutil.log(COLORS.cyan(errorCount) + ' error' + plural + ' found in ' + COLORS.magenta(file.path));

                file.htmlhint.messages.forEach(function(result){
                    var message = result.error,
                        evidence = message.evidence,
                        line = message.line,
                        col = message.col,
                        detail = typeof message.line !== 'undefined' ?
                            COLORS.red('htmlhint L' + line) + COLORS.red(':') + COLORS.red('C' + col) : COLORS.yellow('GENERAL]');

                    if (col === 0) {
                        evidence = COLORS.yellow('?') + evidence;
                    } else if (col > evidence.length) {
                        evidence = COLORS.yellow(evidence + ' ');
                    } else {
                        evidence = evidence.slice(0, col - 1) + evidence[col - 1] + evidence.slice(col);
                    }

                    gutil.log(COLORS.red('[') + detail + COLORS.red(']') + COLORS.red(' ' + message.message) + ' (' + message.rule.id + ')');
                    gutil.log(COLORS.yellow(evidence));
                });
                hasHtmlHintError = true;
            }
        }))
        .pipe(refresh(browser))
        .pipe(size())
        .on('end', errorReporter);
});

/**
 * The 'images' task minify all project images.
 */
gulp.task('images', 'Minify the images', function () {
    return gulp.src(paths.client.images)
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(paths.build.dist.client.images))
        .pipe(size());
});

/**
 * The 'templates' task replace local links with CDN links, minify all project templates and create template cache js file.
 */
gulp.task('templates', 'Minify html templates and create template cache js file', function() {
    gulp.src(paths.client.templates)
        .pipe(cdnizer({defaultCDNBase: CDN_BASE, relativeRoot: '/', files: ['**/*.{gif,png,jpg,jpeg}']}))
        .pipe(minifyHtml({empty:true}))
        .pipe(templateCache({
            module: MODULE_NAME,
            root: TEMPLATE_BASE_PATH
        }))
        .pipe(gulp.dest(paths.tmp.scripts));
});

/**
 * The 'compile' task compile all js, css and html files.
 *
 * 1. it compiles and minify html templates to js template cache
 * 2. css      - replace local path with CDN url, minify, add revision number, add banner header
 *    css_libs - minify, add revision number
 *    js       - annotates the sources before minifying, minify, add revision number, add banner header
 *    js_libs  - minify, add revision number
 *    html     - replace local path with CDN url, minify
 */
gulp.task('compile', 'Does the same as \'csslint\', \'jshint:client\', \'jshint:server\', \'htmlhint\', \'images\', \'templates\' tasks but also compile all JS, CSS and HTML files',
    ['csslint', 'jshint:client', 'jshint:server', 'htmlhint', 'images', 'templates'], function () {
        var projectHeader = header(banner, { pkg : pkg, date: new Date } );

        return gulp.src(paths.client.html)
            .pipe(inject(gulp.src(paths.tmp.scripts + 'templates.js', {read: false}),
                {
                    starttag: '<!-- inject:templates:js -->',
                    ignorePath: [paths.tmp.basePath]
                }
            ))
            .pipe(usemin({
                css:        [cdnizer({defaultCDNBase: CDN_BASE, relativeRoot: 'assets/styles', files: ['**/*.{gif,png,jpg,jpeg}']}), autoprefixer('last 2 version'), minifyCss(), rev(), projectHeader],
                css_libs:   [minifyCss(), rev()],
                js:         [ngmin(), uglify(), rev(), projectHeader],
                js_libs:    [uglify(), rev()],
                html:       [cdnizer({defaultCDNBase: CDN_BASE, files: ['**/*.{js,css}']}), minifyHtml()]
            }))
            .pipe(gulp.dest(paths.build.dist.client.basePath))
            .pipe(size());
});

/**
 * The 'bower' task install all bower components specify in bower.json from bower repository.
 */
gulp.task('bower', 'Install all bower dependencies specify in bower.json from bower repository', function () {
    return bower();
});

/**
 * The 'bower-install' does the same as 'bower' task but also inject bower components to index.html.
 */
gulp.task('bower-install', 'Does the same as \'bower\' task but also inject bower components to index.html', ['bower'], function () {
    return gulp.src(paths.client.html)
        .pipe(wiredep({
            directory: paths.vendor,
            ignorePath: paths.client.basePath
        }))
        .pipe(gulp.dest(paths.client.basePath))
        .pipe(size());
});

/**
 * For rapid development, we have a watch set up that checks to see if
 * any of the files listed below change, and then to execute the listed
 * tasks when they do. This just saves us from having to type "gulp" into
 * the command-line every time we want to see what we're working on; we can
 * instead just leave "gulp watch" running in a background terminal.
 */
gulp.task('watch', 'Watch client files for changes', function () {

    // Listen on port 35729
    server.listen(LIVERELOAD_PORT, function (err) {
        if (err) {
            return console.log(err)
        };

        gulp.watch([
            paths.client.html,
            paths.client.templates,
            paths.client.images,
            paths.client.fonts
        ], function (event) {
            return gulp.src(event.path)
                .pipe(refresh(browser));
        });

        // Watch css files
        gulp.watch(paths.client.styles, ['csslint']);

        // Watch js files
        gulp.watch(paths.client.scripts, ['jshint:client']);

        // Watch js files
        gulp.watch([paths.client.html, paths.client.templates], ['htmlhint']);

        // Watch bower file
        gulp.watch('bower.json', ['bower-install']);
    });

});

/**
 * Configuration Angular app for development environment.
 */
gulp.task('config:dev', 'Configuration Angular app for development environment (pass env constants to angular app)', function () {
    return gulp.src(paths.client.config.file)
        .pipe(ngConstant({
            templatePath: paths.client.config.template,
            constants: { ENV: {'name': 'development', 'apiVersion': API_VERSION, templateBasePath: 'app/'} }
        }))
        .pipe(gulp.dest(paths.client.config.basePath));
});

/**
 * Configuration Angular app for production environment.
 */
gulp.task('config:prod', 'Configuration Angular app for production environment (pass env constants to angular app)', function () {
    return gulp.src(paths.client.config.file)
        .pipe(ngConstant({
            templatePath: paths.client.config.template,
            constants: { ENV: {'name': 'production', 'apiVersion': API_VERSION, templateBasePath: TEMPLATE_BASE_PATH + '/', 'cdnBaseUrl': CDN_BASE} }
        }))
        .pipe(gulp.dest(paths.client.config.basePath));
});

/**
 * Increase version number in package.json & bower.json.
 */
gulp.task('bump', 'Increase version number in package.json & bower.json', function () {
    return gulp
        .src(['package.json', 'bower.json'])
        .pipe(bump())
        .pipe(gulp.dest(paths.build.dist.client.basePath));
});

/**
 * Update/install the selenium webdriver.
 */
gulp.task('webdriver_update', 'Update/install the selenium webdriver', webdriver_update);

/**
 * Check if there are any changes to commit.
 */
gulp.task('check', 'Check if there are any changes to commit', function (cb) {
    require('child_process').exec('git status --porcelain', function (err, stdout) {
        hasGitChanges = stdout;
        cb(err);
    });
});

/**
 * Publish 'build' folder to GitHub 'gh-pages' branch.
 */
gulp.task('gh-pages', 'Publish \'build\' folder to GitHub \'gh-pages\' branch', function () {
    gulp.src(paths.build.basePath + '**/*')
        .pipe(ghPages(GIT_REMOTE_URL));
});


//=============================================
//                MAIN TASKS
//=============================================

/**
 * The 'install' task is to build env and install bower.
 */
gulp.task('install', 'Build env and install bower',  function (cb) {
    runSequence(['bower-install', 'config-dev'], cb);
});

/**
 * The 'default' task is to build env, install bower dependencies and run watch.
 */
gulp.task('default', 'Build env, install bower dependencies and run watch', function (cb) {
    // set to 'true' to avoid process exit on error for csslint, jshint and htmlhint
    isWatching = true;

    runSequence(['bower-install', 'config-dev'],
        ['csslint', 'jshint:client', 'jshint:server', 'htmlhint', 'watch'],
        cb);
});

/**
 * Run unit tests.
 */
// TODO (martin): there is an issue in 'gulp-karma' when this plugin doesn't pull file list from karma.conf.js https://github.com/lazd/gulp-karma/issues/9 and './idontexist' it's just workaround for now
gulp.task('test:unit', 'Run unit tests', function () {
    var options = {
        thresholds : {
            statements : 95,
            branches : 90,
            lines : 95,
            functions : 95
        },
        coverageDirectory : paths.build.testReports.client.coverage,
        rootDirectory : 'build/'
    };

    // remove 'coverage' directory before each test
    gulp.src(paths.build.testReports.client.coverage, {read: false})
        .pipe(clean());

    return gulp.src('./idontexist')
        .pipe(karma({
            configFile: 'client/test/config/karma.conf.js',
            action: 'run',
            browsers: [BROWSERS],
            env: ENV
        }))
//        .pipe(coverageEnforcer(options))
        .on('error', function (error) {
            gutil.log(COLORS.red('Error: Unit test failed ' + error));
            return process.exit(1);
        });
});

/**
 * Run e2e tests.
 */
gulp.task('test:e2e', 'Run e2e tests', ['webdriver_update'], function () {
    //TODO: (martin) remove this code once the issue with PhantomJS is resolved. This code is already declared at the top of this file.
    var BROWSERS = !!argv.browsers ? argv.browsers : 'chrome';
//    if(!BROWSERS.match(new RegExp(/phantomjs|chrome|firefox|safari/))) {
//        gutil.log(COLORS.red('Error: The argument \'browsers\' has incorrect value \'' + BROWSERS +'\'! Usage: gulp test:unit --env=(phantomjs|chrome|firefox|safari)'));
//        return process.exit(1);
//    }

    //TODO: (martin) might also use this plugin https://www.npmjs.org/package/gulp-protractor-qa
    gulp.src('./idontexist')
        .pipe(protractor({
            configFile: 'client/test/config/protractor.conf.js',
            args: ['--baseUrl', APPLICATION_BASE_URL, '--capabilities.browserName', BROWSERS.toLowerCase(), '--env', ENV]
        })).on('error', function () {
            // Make sure failed tests cause gulp to exit non-zero
            gutil.log(COLORS.red('Error: E2E test failed'));
            return process.exit(1);
        });
});

/**
 * The 'compile' task gets app ready for deployment by concatenating,
 * minifying etc.
 */
gulp.task('build', 'Build application for deployment', function (cb) {
    if(BUILD_WITHOUT_TEST) {
        gutil.log(COLORS.red('********** BUILDING RELEASE VERSION WITHOUT TEST **********'));
        // this task should run when user doesn't want to run test (this task is also running in CI server as CI server specify against what browsers the test should be running)
        runSequence(['clean', 'bower-install', 'config:prod'],
            ['compile', 'copy'],
            // the reason why config-dev is running at the end is because when we generate build on local env it create production config-env.js file
            // and if developers want to run app in dev env after gulp build they are getting error because they forgot run gulp install to generate development config-env.js file
            ['config:dev'],
            cb);
    } else {
        gutil.log(COLORS.blue('********** BUILDING RELEASE VERSION **********'));
        // this task should run when user has decide to manually upload files to production server as this task run all unit and e2e test
        runSequence(['clean', 'bower-install', 'config:prod'],
            ['test:unit'],
            ['test:e2e'],
            ['compile', 'copy'],
            // the reason why config-dev is running at the end is because when we generate build on local env it create production config-env.js file
            // and if developers want to run app in dev env after gulp build they are getting error because they forgot run gulp install to generate development config-env.js file
            ['config:dev'],
            cb);
    }
});

/**
 * Bump version number in package.json & bower.json.
 */
gulp.task('bump', 'Bump version number in package.json & bower.json', ['csslint', 'jshint:client', 'jshint:server', 'htmlhint', 'test:unit'], function () {
    var HAS_REQUIRED_ATTRIBUTE = !!argv.type ? !!argv.type.match(new RegExp(/major|minor|patch/)) : false;

    if (!HAS_REQUIRED_ATTRIBUTE) {
        gutil.log(COLORS.red('Error: Required bump \'type\' is missing! Usage: gulp bump --type=(major|minor|patch)'));
        return process.exit(1);
    }

    if (!semver.valid(pkg.version)) {
        gutil.log(COLORS.red('Error: Invalid version number - ' + pkg.version));
        return process.exit(1);
    }

    if(process.env.TRAVIS === 'true') {
        return gulp.src(['build/dist/package.json'])
            .pipe(bump({type: argv.type}))
            .pipe(gulp.dest('./build/dist/'));
    } else {
        return gulp.src(['package.json', 'bower.json'])
            .pipe(bump({type: argv.type}))
            .pipe(gulp.dest('./'));
    }
});

/**
 * Generate changelog.
 */
gulp.task('changelog','Generate changelog', function () {
    return gulp.src(['package.json', 'CHANGELOG.md']) // pass package.json to read data-from
        .pipe(changelog())
        .pipe(gulp.dest('.'))
        .on('error', function (err) {
            gutil.log(COLORS.red('Error: Failed to generate changelog ' + err));
            return process.exit(1);
        });
});

/**
 * The 'release' task push package.json and CHANGELOG.md to GitHub.
 */
gulp.task('release', 'Release bumped version number to GitHub repo', ['check'], function () {
    if (!semver.valid(pkg.version)) {
        gutil.log(COLORS.red('Error: Invalid version number - ' + pkg.version + '. Please fix the the version number in package.json and run \'gulp publish\' command again.'));
        return process.exit(1);
    }

    if (hasGitChanges === '') {
        gutil.log(COLORS.red('Error: No changes detected in this repo. Aborting release.'));
        return process.exit(1);
    }

    gutil.log(COLORS.blue('Pushing to GitHub ...'));
    var commitMsg = 'chore(release): v' + pkg.version;
    return gulp.src('package.json')
        .pipe(exec('git add CHANGELOG.md package.json'))
        .pipe(exec('git commit -m "' + commitMsg + '" --no-verify'))
        .pipe(exec('git push origin master'));
});