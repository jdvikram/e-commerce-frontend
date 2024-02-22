// EventBus.js
class EventBus {
    constructor() {
        this.listeners = {};
    }

    subscribe(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    publish(event, data) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event].forEach(callback => callback(data));
    }
}

const eventBus = new EventBus();
export default eventBus;
