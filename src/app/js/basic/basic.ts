class App {

    _addEvents = (ctrl)=> {
        var listOfEvents = ['onclick', 'ondbclick', 'ondrag', 'onmouseover'];
        var events = {};
        listOfEvents.map(event=> {
            events[event] = ctrl["eventCapture"];
        })

        return events;
    }

    controller = (config)=> {
        var message = m.prop(config.message);
        var eventName = m.prop('');
        var eventCapture = (event)=> {
            eventName(event.type)
        };
        return {
            message: message,
            onHoverView: eventCapture,
            eventName: eventName,
            eventCapture: eventCapture
        }
    }

    view = (ctrl)=> {
        var events = this._addEvents(ctrl);
        return m('div', events, [
            ctrl.message(),
            m('div#eventDetail', ctrl.eventName())
        ]);
    }
}

var app = new App();
app.controller = app.controller.bind(app.controller, {message: "Hoe hoe1"});

//window.onload = function () {
m.module(document.getElementById('hello'), app);
//}

