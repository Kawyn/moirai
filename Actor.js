
import { Component } from './components/Component.js';
import { Moirai } from './moirai.js';
import { State } from './State.js';
import { EventManager } from './universal/EventManager.js';

/**
 * 
 * @param {State[]} chain 
 */
const randomState = (chain) => {

    const sum = chain.reduce((acc, v) => acc + v.weight, 0);
    /* let value = Math.random() * sum;
 
     for (let state of chain) {
 
         value -= state.weight;
 
         if (value <= 0)
             return state;
     }
 */
    let max = 0;
    let result;
    for (let state of chain) {
        if (state.weight > max) {
            result = state;
            max = state.weight;
        }
    }

    return result;
    throw `Chain is empty`
}


export class Actor {

    EventManager = new EventManager();

    /** @type {Moirai} */
    owner;
    identifer;
    history = [];

    /**
     * @type {State}
     */
    get CurrentState() {
        return this.history[this.history.length - 1];
    }

    /** @type {Component[]} */
    #components = [];

    constructor(state) {
        this.history.push(state);
    }

    getComponentByIdentifier(identifier) {

        for (let component of this.#components) {

            if (component.identifier === identifier)
                return component;
        }

        return null;
    }

    getComponentByConstructor(name) {

        for (let component of this.#components) {

            if (component.constructor.name === name)
                return component;
        }

        return null;
    }

    /**
     * 
     * @param {Component} component 
     */
    pushComponent(component) {

        let low = 0;
        let mid = 0;
        let high = this.#components.length;

        while (low < high) {

            mid = (low + high) >>> 1;

            if (component.priority > this.#components[mid].priority)
                low = mid + 1;
            else
                high = mid;
        }

        component.actor = this;
        this.#components.splice(low, 0, component);

        if (this.owner && this.owner.CurrentTime != 0) {
            component.initialize();
            component.postInitialize();
        }
    }

    /**
     * 
     * @param {Component} component 
     */
    removeComponent(component) {

        component.preRemove();

        const idx = this.components.indexOf(component);
        this.components.splice(idx, 1);

        component.postRemove();
    }

    removeComponentByIdentifier(identifier) {

        const component = this.getComponentByIdentifier(identifier);
        this.removeComponent(component);
    }

    initialize() {

        for (let component of this.#components)
            component.initialize();
    }

    postInitialize() {

        for (let component of this.#components)
            component.postInitialize();
    }


    preRefresh() {

        for (let component of this.#components)
            component.preRefresh();
    }

    refresh() {

        const chain = [];

        for (let component of this.#components)
            component.refresh(chain);

        console.log(chain);
        const state = randomState(chain);

        if (state !== this.CurrentState)
            this.EventManager.riseEvent('on_state_change', { previousState: this.CurrentState, currentState: state });

        this.history.push(state);
    }

    static ON_STATE_CHANGE = 'on_state_change';

    postRefresh() {

        for (let component of this.#components)
            component.postRefresh();
    }
}
