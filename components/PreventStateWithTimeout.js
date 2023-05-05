import { Component } from './Component.js';

import { State } from '../State.js';

export class PreventStateWithTimeout extends Component {

    constructor(timer, { identifier }) {
        super({ identifier, priority: 1000 });

        this.time = timer;
        this.remainingTime = timer;
    }

    /**
     * 
     * @param {State[]} chain 
     */
    refresh(chain) {

        chain.length = 0;
        chain.push(this.owner.CurrentState);

        this.remainingTime--;

        if (this.remainingTime <= 0)
            this.owner.removeComponent(this);
    }

    clone() { return new PreventStateWithTimeout(this.time, { identifier: this.identifier }); }
}