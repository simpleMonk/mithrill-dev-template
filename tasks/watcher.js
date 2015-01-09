"use strict";

var chokidar = require('chokidar');

var watcher = function (fileOrDirectory, callBack) {
	return chokidar.watch(fileOrDirectory, {ignored: /[\/\\]\./, ignoreInitial: true})
		.on('add', function () {
			console.log("Event:ADD");
			callBack();
		})
		.on('change', function () {
			console.log("Event:CHANGE");
			callBack();
		})
		.on('unlink', function () {
			console.log("Event:DELETE");
			callBack();
		})
		.on('error', function (error) {
			console.error('Error happened', error);
		})
};

module.exports = watcher;