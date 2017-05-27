// Imports
var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var rename = require("gulp-rename");
var GulpSSH = require('gulp-ssh');
var sequence = require('run-sequence');
var argv = require('yargs').argv;
var merge = require('merge-stream');
var node_ssh = require('node-ssh')

// Compiles typescript files
gulp.task('compile:ts', function () {
    return gulp
        .src(["./src/**/*.ts"], { base: './src' })
        .pipe(ts({ module: 'commonjs', target: 'es6', noImplicitAny: false }))
        .pipe(gulp.dest('./dist'));
});

// Removes compiled js files
gulp.task('clean', function () {
    return gulp
        .src([
            './dist/**/*.js'
        ], { read: false })
        .pipe(clean())
});


// Copies 'package.json' file to build directory
gulp.task('copy:package.json', function () {
    return gulp
        .src('./package.json')
        .pipe(gulp.dest('./dist'));
});

// Renames config file
gulp.task('rename:config', function () {
    return gulp.src('./dist/config.prod.js', { base: process.cwd() })
        .pipe(rename('config.js'))
        .pipe(gulp.dest('./dist'));
});


gulp.task('build', function (done) {
    sequence('clean', 'compile:ts', 'copy:package.json', 'rename:config', done);
});

gulp.task('build:dev', function (done) {
    sequence('clean', 'compile:ts', 'copy:package.json', done);
});

gulp.task('publish:source', function () {
    var config = {
        host: argv.host,
        port: 22,
        username: argv.username,
        password: argv.password
    };

    var gulpSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: config
    });

    return gulp
        .src(['./dist/**'])
        .pipe(gulpSSH.dest(argv.dest));
});

gulp.task('publish:modules', function (done) {
    var config = {
        host: argv.host,
        port: 22,
        username: argv.username,
        password: argv.password
    };

    var ssh = new node_ssh();

    ssh.connect({
        host: argv.host,
        username: argv.username,
        password: argv.password
    });

    ssh.execCommand('npm --prefix /opt/feature-toggle-service install').then(function (result) {
        done();
    }).catch(function (err) {
        console.log(err);
    });
});

gulp.task('publish:dockerfile', function () {
    var config = {
        host: argv.host,
        port: 22,
        username: argv.username,
        password: argv.password
    };

    var gulpSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: config
    });

    return gulp
        .src(['./Dockerfile'])
        .pipe(gulpSSH.dest(argv.dest));
});

gulp.task('deploy:dockerfile', function () {
    var config = {
        host: argv.host,
        port: 22,
        username: argv.username,
        password: argv.password
    };

    var gulpSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: config
    });

    var t1 = gulpSSH
        .exec('docker stop feature-toggle-service');

    var t2 = gulpSSH
        .exec('docker start feature-toggle-service');

    return merge(t1, t2);
});
