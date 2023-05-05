import { EventManager } from './universal/EventManager.js';

import { Actor } from './Actor.js';


export class Moirai {

    EventManager = new EventManager();

    CurrentTime = 0;

    /**
     * @type {Actor[]}
     * @readonly 
     */
    #actors = [];

    get Actors() {
        return [...this.#actors]
    }
    /**
     * 
     * @param {Actor[]} agents 
     */
    constructor(agents) {

        this.#actors = agents;
        // TODO: agents instancing for each simulation

        for (let agent of this.#actors)
            agent.owner = this;
    }

    pushAgent() {
        throw 'Now implemented';
    }

    initialize() {
        for (let agent of this.#actors)
            agent.initialize();
    }

    postInitialize() {

        for (let agent of this.#actors)
            agent.postInitialize();
    }

    refresh() {

        if (this.CurrentTime === 0) {
            this.initialize();
            this.postInitialize();
        }

        this.CurrentTime++;


        for (let agent of this.#actors)
            agent.preRefresh();

        for (let agent of this.#actors)
            agent.refresh();

        for (let agent of this.#actors)
            agent.postRefresh();

        this.EventManager.riseEvent('post_refresh', null);
    }
}
