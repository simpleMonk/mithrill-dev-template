(function () {
	"use strict";

	var $c = {
		hasClass: function (elem, className) {
			return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
		},
		addClass: function (elem, className) {
			if (!this.hasClass(elem, className)) {
				elem.className += ' ' + className;
			}
		},
		removeClass: function (elem, className) {
			var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
			if (this.hasClass(elem, className)) {
				while (newClass.indexOf(' ' + className + ' ') >= 0) {
					newClass = newClass.replace(' ' + className + ' ', ' ');
				}
				elem.className = newClass.replace(/^\s+|\s+$/g, '');
			}
		}
	};

	var module = {};

	module.controller = function () {
		this.message = "Hello World from Mithril!";
	};


	var eventHandlers = {
		onmouseover: function (event) {
			$c.addClass(event.toElement, "selected");
		},
		onmouseout: function (event) {
			$c.removeClass(event.fromElement, 'selected');
		}
	};

	module.getView = function (ctrl) {
		var arrView = [];
		for (var i = 0, len = 10; i < len; i++) {
			arrView.push(m('div.initial', eventHandlers, ctrl.message + "-" + i));
		}
		return arrView;
	};

	module.view = function (ctrl) {
		return module.getView(ctrl);
	};

	m.module(document.getElementById('hello'), module);

})();


