"use strict";

var gulp = require('gulp');
var rimraf = require('rimraf');
var gutil = require('gulp-util');
var del = require('del');

function clean(globFolder, cb) {
	rimraf(globFolder, cb);
}

exports.clean = clean;