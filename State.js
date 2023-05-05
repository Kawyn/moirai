/**
 * States are states :upside_down: in which actor can be. <br />
 * By implementation, states does nothing, however they holds data which can be used by Components to modify Actor.
 */
export class State {

    /**
     * Identifier of component which manages state.
     * @type {string}
     */
    owner;

    /**
     * @param {string} name Name of state, doesn't have to be unique.
     * @param {number} weight Weight of State which impacts probability of chosing this State.
     * @param {{'owner': string, 'data': any}} data Unnecessary data.
     */
    constructor(name, weight, { owner = null, data = null } = {}) {

        this.name = name;
        this.weight = weight;

        this.owner = owner;

        this.data = data;

        Object.seal(this);
    }

    /**
     * @returns new State with soft copy of data.
     */
    clone() {

        return new State(this.name, this.weight, { owner: this.owner, data: this.data });
    }
}