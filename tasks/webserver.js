"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('./config');

gulp.task('run-dev-server', function () {
	connect.server({
		root: [config.development],
		port: 8000,
		livereload: true
	});
});