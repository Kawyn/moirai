import { Component } from './Component.js';

import { State } from '../State.js';
import { UUID } from '../utils.js';

export class PreventState extends Component {

    /**
     * 
     * @param {string?} identifier 
     */
    constructor(identifier) { super({ identifier: identifier }); }

    /**
     * 
     * @param {State[]} chain 
     */
    refresh(chain) {

        chain.length = 0;
        chain.push(this.owner.CurrentState);
    }
}