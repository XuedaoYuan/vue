/**
 * ============================
 * @Author: Xuedao Yuan
 * @DateTime: 2017-11-17
 * ============================
 */
 

function EventTarget() {
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function(type, handler) {
        if (typeof this.handlers[type] == 'undefined') {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function(type, event) {
        if (!event.target) {
            event.target = this;
        }
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i](event);
            }
        }
    },
    remove: function(type, handler) {
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i] === handler) {
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
};

export default new EventTarget();
