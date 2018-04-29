var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var server = require('gulp-develop-server');
var mocha = require('gulp-mocha');

var serverTS = ["**/*.ts", "!node_modules/**", '!bin/**'];

var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', ['clean'], function() {
    return gulp
        .src(serverTS, {base: './'})
        .pipe(tsProject())
        .pipe(gulp.dest('./'));
});

gulp.task('clean', function () {
    return gulp
        .src([
            'app.js',
            '**/*.js',
            '**/*.js.map',
            '!node_modules/**',
            '!gulpfile.js',
            '!bin/**'
        ], {read: false})
        .pipe(clean())
});

gulp.task('load:fixtures', function (cb) {
    var load = require('./fixtures/load');
    return load.loadData(cb);
});

gulp.task('server:start', ['ts'], function() {
    server.listen({path: 'bin/www'}, function(error) {
        console.log(error);
    });
});

gulp.task('server:restart', ['ts'], function() {
    server.restart();
});

gulp.task('default', ['server:start'], function() {
    gulp.watch(serverTS, ['server:restart']);
});

gulp.task('run-tests', function(){
    return gulp.src('tests/**/*.spec.ts')
        .pipe(mocha({
            reporter: 'nyan',
            require: ['ts-node/register']
        }));
});
