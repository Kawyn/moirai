import { Component } from '../Component.js';
import { ValuesProvider } from '../ValuesProvider/ValuesProvider.js';

import { State } from '../../State.js';

export class StateWithWeightFromValuesProvider extends Component {

    /** @type {ValuesProvider} */
    #provider;

    constructor(name, value, formula, data, { identifier, priority } = {}) {
        super({ identifier: identifier, priority: priority });

        this.name = name;

        this.value = value;
        this.formula = formula;

        this.data = data;
    }

    postInitialize() {

        this.#provider = this.actor.getComponentByIdentifier(ValuesProvider.DEFAULT_IDENTIFIER);
    }

    /**
     * @param {State[]} chain 
     */
    refresh(chain) {

        const state = new State(this.name, this.formula(this.#provider.values[this.value]), { data: this.data, owner: this });
        chain.push(state);
    }

    /**
     * @returns {StateWithWeightFromValuesProvider} Deep copy of component without deep copy of data
     */
    clone() {

        return new StateWithWeightFromValuesProvider(this.name, this.value, this.formula, {
            identifier: this.identifier, priority: this.priority, data: this.data
        })
    }
}

