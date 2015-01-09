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

gulp.task('copy-js-files', ['lint-js-files'], function () {
	var srcFiles = config.vendorjs;
	srcFiles.push(config.src + "/app/**/*.js");
	//srcFiles.push("!./spec/**/*.js");

	gulp.src(srcFiles)
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

gulp.task('copy-spec-files', ['lint-spec-files', 'copy-fixtures'], function () {
	var specFiles = [];
	for (var i = 0; i < config.vendorjs.length; i++) {
		specFiles.push(config.vendorjs[i]);
	}
	specFiles.push(config.src + "/app/**/*.js");
	specFiles.push("./spec/**/*.js");

	gulp.src(specFiles)
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

gulp.task('lint-js-files', function () {
	gulp.src(config.src + "/app/**/*.js")
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

});

gulp.task('lint-spec-files', function () {
	var lintSpecFiles = [];
	lintSpecFiles.push(config.src + "/app/**/*.js");
	lintSpecFiles.push("!./spec/config/**");
	lintSpecFiles.push(config.spec + "/**/*.js");

	gulp.src(lintSpecFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

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

gulp.task('copy-fixtures', function () {
	gulp.src(config.spec + "/**/*.html")
		.pipe(gulp.dest(config.development + "/spec"))
		.pipe(connect.reload())
		.on('end', function () {
			gutil.log('successfully copied fixtures');
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

