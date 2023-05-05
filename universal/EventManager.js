/**
 * Manager responsible for sending, reciving events.
 */
export class EventManager {

    /** @type {Object<string, Function[]>} */
    #handlers = {};

    /**
     * Adds handler for given event.
     * @param {string} eventName Event to listen for
     * @param {Function} handler Handler to call
     */
    addEventListener(eventName, handler) {

        if (!this.#handlers[eventName])
            this.#handlers[eventName] = [];

        this.#handlers[eventName].push(handler);
    }

    /**
     * Removes handler for given event.
     * @param {string} eventName Event to remove handler for
     * @param {Function} handelr Handler to remove
     * @returns 
     */
    removeEventListener(eventName, handelr) {

        if (!this.#handlers[eventName])
            return;

        const idx = this.#handlers[eventName].indexOf(handelr);

        if (idx !== -1)
            this.#handlers[eventName] = this.#handlers[eventName].splice(idx, 1);
    }

    /**
     * Calls handlers for given event.
     * @param {string} eventName Event to rise
     * @param {*} data Data to pass to handlers
     */
    riseEvent(eventName, data) {

        if (!this.#handlers[eventName])
            return;

        for (let handler of this.#handlers[eventName])
            handler(data);
    }
}