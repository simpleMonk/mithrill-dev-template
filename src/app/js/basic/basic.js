(function () {
	"use strict";

	var module = {};

	module.controller = function () {
		this.message = "Hello World from Mithril!";
	};

	var eventHandlers = {
		onmouseover: function (event) {
			event.toElement.className += " " + "selected";
		},
		onmouseout: function (event) {
			event.fromElement.className = event.fromElement.className.replace(/(?:^|\s)selected(?!\S)/, '');
		}
	};

	var classNames = {class: 'initial'};

	module.getView = function (ctrl) {
		var arrView = [];
		for (var i = 0, len = 10; i < len; i++) {
			arrView.push(m('div.initial',eventHandlers, ctrl.message + "-" + i));
		}
		return arrView;
	};

	module.view = function (ctrl) {
		return module.getView(ctrl);
	};

	m.module(document.getElementById('hello'), module);

})();


