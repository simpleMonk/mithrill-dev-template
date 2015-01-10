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

	module.taskModel = function (data) {
		this.description = m.prop(data.description);
		this.isCompleted = m.prop(data.isCompleted || false);
	};

	module.controller = function () {
		this.rawTasks = [
			{ description: 'Task1', isCompleted: true},
			{ description: 'Task2', isCompleted: false},
			{ description: 'Task3', isCompleted: false}
		];

		this.inputTask = {
			description: m.prop('My Placeholder')
		};

		this.tasks = this.rawTasks.map(function (task) {
			return new module.taskModel(task);
		});

		this.addNewTodo = function (event) {
			if (event.which != 13) {
				return;
			}
			this.tasks.push(new module.taskModel({description: this.inputTask.description(), isCompleted: false}));
			this.inputTask.description('');
		};

		this.completeTodo = function (todo, index, event) {
			todo.isCompleted(true);
		};


	};

	function getNewTodo(ctrl) {
		return [m('input#new-todo[placeholder="What needs to be done?"]',
			{value: ctrl.inputTask.description(),
				oninput: m.withAttr('value', ctrl.inputTask.description),
				onkeydown: ctrl.addNewTodo.bind(ctrl)}),
			m('div', ctrl.inputTask.description())];
	}


	module.view = function (ctrl) {
		return [getNewTodo(ctrl), ctrl.tasks.map(function (todo, index) {
			return m('div', {class: todo.isCompleted() ? 'done' : 'active', onclick: ctrl.completeTodo.bind(ctrl, todo, index)}, todo.description() + '-' + todo.isCompleted());
		})];

	};


	m.module(document.getElementById('hello'), module);


})();


