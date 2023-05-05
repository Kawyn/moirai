import { Component } from '../Component.js';
import { ValuesProvider } from './ValuesProvider.js';

export class ValuesProvider_ModifyValueOverTime extends Component {

    static WhenToModify = { PRE_REFRESH: -1, REFRESH: 0, POST_REFRESH: 1 };

    /** @type {ValuesProvider} */
    #provider = undefined;

    /**
     * @param {string} value
     * @param {Function} formula 
     * @param {number} type 
     */
    constructor(value, formula, type, { identifier, priority } = {}) {

        super({ identifier: identifier, priority: priority });

        this.value = value;
        this.formula = formula;

        this.type = type;
    }

    postInitialize() {

        this.#provider = this.actor.getComponentByIdentifier(ValuesProvider.DEFAULT_IDENTIFIER);
    }

    preRefresh() {

        if (this.type !== ValuesProvider_ModifyValueOverTime.WhenToModify.PRE_REFRESH)
            return;

        const currentValue = this.#provider.values[this.value];
        this.#provider.values[this.value] = this.formula(currentValue);
    }

    refresh() {

        if (this.type !== ValuesProvider_ModifyValueOverTime.WhenToModify.REFRESH)
            return;

        const currentValue = this.#provider.values[this.value];
        this.#provider.values[this.value] = this.formula(currentValue);
    }

    postRefresh() {

        if (this.type !== ValuesProvider_ModifyValueOverTime.WhenToModify.POST_REFRESH)
            return;

        const currentValue = this.#provider.values[this.value];
        this.#provider.values[this.value] = this.formula(currentValue);
    }

    clone() {

        return new ValuesProvider_ModifyValueOverTime(this.value, this.formula, this.type, {
            identifier: this.identifier, priority: this.priority
        });
    }
}