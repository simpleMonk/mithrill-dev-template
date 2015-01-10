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
	var mReuseModule = function (templateModule, config) {
		var mod = Object.create(templateModule);
		mod.controller = mod.controller.bind(mod.controller, config);
		return mod;
	};

	var module = {};

	module.eventHandlers = function (ctrl) {
		return{
			onmouseover: ctrl.onmouseover,
			onmouseout: ctrl.onmouseout
		};
	};

	module.controller = function (config) {
		var self = this;

		console.log("config", config);

		this.config = config || {};

		this.message = "Hello World from Mithril!";

		this.onmouseover = function (event) {
			$c.addClass(event.toElement, self.config.className || 'selected');
		};
		this.onmouseout = function (event) {
			$c.removeClass(event.fromElement, self.config.className || 'selected');
		};

		return this;
	};

	module.getView = function (ctrl) {
		var arrView = [];
		for (var i = 0, len = 10; i < len; i++) {
			arrView.push(m('div.initial', module.eventHandlers(ctrl), ctrl.message + "-" + i));
		}
		return arrView;
	};

	module.view = function (ctrl) {
		return module.getView(ctrl);
	};

	m.module(document.getElementById('hello'), mReuseModule(module, {}));
	m.module(document.getElementById('hello-1'), mReuseModule(module, {className: 'selected-mod'}));


})();


