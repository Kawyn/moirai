import { Actor } from '../../Actor.js';

import { Component } from '../Component.js';

import { State } from '../../State.js';
import { Interactions } from './Interactions.js';

class Interactions_StateProvider extends Component {

    /** @returns {State} */
    getState() { throw `${this.constructor.name} does not implement 'getState'`; }
}

class Interactions_Condition extends Component {

    /**
     * @param {Actor[]} actors Actors which are possible to interact.
     * @returns {Actor[]} New array of actors possible to interact
     */
    filter(actors) { throw `${this.constructor.name} does not implement 'filter'`; }
}


export class Interactions_TODO_rename extends Component {

    static Interactions_StateProvider = Interactions_StateProvider;
    static Interactions_Condition = Interactions_Condition;

    /** @type {string} */ #providerIdentifier;
    /** @type {Interactions_StateProvider} */ #provider;

    /** @type {string[]} */ #conditionsIdentifiers;
    /** @type {Interactions_Condition[]} */ #conditions = [];

    /**
     * 
     * @param {string} providerIdentifier 
     * @param {string[]} conditionsIdentifiers 
     */
    constructor(providerIdentifier, conditionsIdentifiers) {
        super();

        this.#providerIdentifier = providerIdentifier;
        this.#conditionsIdentifiers = conditionsIdentifiers;
    }

    postInitialize() {

        this.#provider = this.actor.getComponentByIdentifier(this.#providerIdentifier);

        if (!this.#provider)
            console.error(`Can't get component with identifier ${this.#providerIdentifier}`);

        for (let identifier of this.#conditionsIdentifiers) {

            const component = this.actor.getComponentByIdentifier(identifier);

            if (!component)
                console.error(`Can't get component with identifier ${this.#providerIdentifier}`);

            this.#conditions.push(component);
        }
    }

    refresh(chain) {

        let targets = this.actor.owner.Actors.filter(actor => actor !== this.actor);

        for (let condition of this.#conditions)
            targets = condition.filter(targets);

        if (targets.length === 0)
            return;

        const state = this.#provider.getState();
        const data = new Interactions.StateData();

        data.owner = this.actor;
        data.targets = targets;

        data.participants = [this.actor];

        state.data = data;

        chain.push(state);
    }

    /** @returns {Interactions_TODO_rename} */
    clone() {
        return new Interactions_TODO_rename(this.#providerIdentifier, [...this.#conditionsIdentifiers]);
    }
}