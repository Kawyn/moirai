import { UUID } from '../utils.js';

import { State } from '../State.js';

import { Actor } from '../Actor.js';


/** @abstract */
export class Component {

    /** @type {string} */
    identifier;

    /** @type {Actor} */
    actor;

    /** 
     * Components refreshes starting from ones with biggest priority
     * @type {number}
     */
    priority;

    /**
     * 
     * @param {options} options 
     */
    constructor({ identifier, priority } = {}) {

        this.identifier = identifier || UUID();
        this.priority = priority || 0;
    }

    initialize() { }
    postInitialize() { }

    /** @virtual */
    preRefresh() { }

    /**
     * @param {State[]} chain 
     * @virtual
     */
    refresh(chain) { }

    /** @virtual */
    postRefresh() { }

    preRemove() { }
    postRemove() { }

    /**
     * @abstract
     * @returns {Component} Deep copy of component with new Identifier but without Owner
     */
    clone() { throw `${this.constructor.name} does not implement #clone`; }
}