"use strict";

var gulp = require('gulp');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var concatcss = require('gulp-concat-css');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var minifyCSS = require('gulp-minify-css');
var gulpMerge = require('gulp-merge');
var ts = require('gulp-typescript');


var config = require('./tasks/config.js');
var clean = require('./tasks/clean.js').clean;
var watcher = require('./tasks/watcher.js');
require('./tasks/webserver.js');

gulp.task('clean-dev', function (cb) {
	clean(config.development, cb);
});

gulp.task('copy-all-files', function (cb) {
	runSequence('copy-js-files', 'copy-style', 'copy-html', 'copy-spec-files', cb);
});

gulp.task('copy-js-files', function () {
	var vendorFiles = config.vendorjs;
	var tsFiles = [config.src + "/app/**/*.ts"];
	gulpMerge(
		gulp.src(vendorFiles),
		gulp.src(tsFiles)
			.pipe(ts({
				declarationFiles: true,
				noExternalResolve: true
			})))
		//.pipe(uglify())
		.pipe(concat("bundle.js"))
		.pipe(gulp.dest(config.development))
		.pipe(connect.reload())
		.on('end', function () {
			gutil.log('successfully copied js files');
		})
		.on('error', function (err) {
			gutil.log(err);
		});
});

gulp.task('copy-spec-files', function () {
	var specFiles = [];
	for (var i = 0; i < config.vendorjs.length; i++) {
		specFiles.push(config.vendorjs[i]);
	}

	var specTsFiles = [];
	specTsFiles.push(config.src + "/app/**/*.ts");
	specTsFiles.push("./typings/**/*.d.ts");
	specTsFiles.push("./spec/**/*.ts");

	gulpMerge(
		gulp.src(specFiles),
		gulp.src(specTsFiles)
			.pipe(ts({
				declarationFiles: true,
				noExternalResolve: true
			})))
		.pipe(concat("spec.js"))
		.pipe(gulp.dest(config.development + "/spec"))
		.pipe(connect.reload())
		.on('end', function () {
			gutil.log('successfully copied spec files');
		})
		.on('error', function (err) {
			gutil.log(err);
		});
});

gulp.task('copy-style', function () {
	var styleFiles = [];
	styleFiles.push(config.vendor + "/**/*.scss");
	styleFiles.push(config.vendor + "/**/*.css");
	styleFiles.push(config.src + "/**/*.scss");
	styleFiles.push(config.src + "/**/*.css");

	gulp.src(styleFiles)
		.pipe(sass())
		.pipe(concatcss('app.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.development))
		.pipe(connect.reload())
		.on('end', function () {
			gutil.log('successfully copied css files');
		})
		.on('error', function (err) {
			gutil.log(err);
		});
});

gulp.task('copy-html', function () {
	gulp.src(config.src + "/app/index.html")
		.pipe(gulp.dest(config.development))
		.pipe(connect.reload())
		.on('end', function () {
			gutil.log('successfully copied index.html');
		})
		.on('error', function (err) {
			gutil.log(err);
		});
});

gulp.task('prepare-dev', ['clean-dev'], function (cb) {
	runSequence('copy-all-files', cb);
});

gulp.task('watch', function () {
	watcher([config.src, config.spec], function () {
		gulp.start('prepare-dev');
	});
});

gulp.task('default', function (cb) {
	runSequence('prepare-dev', 'watch', 'run-dev-server', cb);
});

