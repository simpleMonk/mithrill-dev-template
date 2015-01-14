/// <reference path="../../../../typings/mithril/mithril.d.ts" />

class App {
    message:any = m.prop();

    controller() {
        this.message = m.prop('Hello World one two three!');
    }

    view(ctrl) {
        return m('div', ctrl.message());
    }
}

var app = new App();

window.onload = function () {
    m.module(document.getElementById('hello'), app);
}

