import { Actor } from '../../Actor.js';
import { State } from '../../State.js';
import { Component } from '../Component.js';

class Invitation {

    /**
     * 
     * @param {Actor} from 
     * @param {Actor[]} to 
     * @param {State} state 
     */
    constructor(from, to, state) {

        this.from = from;
        this.to = to;

        this.state = state;
    }
}

class StateData {

    targets;
    owner;

    participants;
}

export class Interactions extends Component {

    static INVITE = 'interactions_invite';
    static ACCEPT_INVITATION = 'interactions_accept';

    static ON_SUCCES = 'interactions_on_succes';
    static ON_FAIL = 'interactions_on_fail';

    static DEFAULT_IDENTIFIER = 'interactions_default_identifier';

    static StateData = StateData;
    static Invitation = Invitation;

    /** @type {Invitation[]} */
    #invitationsWithoutAnswer = [];

    /** @type {''|'somebody_is_comming'|'wait_for_answers'} */
    #handshake = '';

    constructor() {
        super({ identifier: Interactions.DEFAULT_IDENTIFIER, priority: 2500 });
    }

    postInitialize() {

        this.actor.EventManager.addEventListener(Interactions.INVITE, (data) => this.#onInvite(data));
        this.actor.EventManager.addEventListener(Interactions.ACCEPT_INVITATION, (data) => this.#onAccept(data));
    }

    preRefresh() {

        console.log(this.actor.identifer, this.#handshake)
        if (this.#handshake === '')
            this.#inviteToState();

        else {

            if (this.#handshake === 'somebody_is_comming')
                this.actor.EventManager.riseEvent(Interactions.ON_SUCCES, this.actor.CurrentState);
            if (this.#handshake === 'wait_for_answers')
                this.actor.EventManager.riseEvent(Interactions.ON_FAIL, this.actor.CurrentState);

            this.#handshake = '';
        }
    }

    refresh(chain) {

        if (this.#handshake === 'wait_for_answers') {

            chain.length = 0;
            chain.push(this.actor.CurrentState);
            console.log(this.actor.identifer, 'waiting')
            return;
        }


        for (let invitation of this.#invitationsWithoutAnswer)
            chain.push(invitation.state);
    }

    postRefresh() {

        this.#answerInvitations();
    }


    #inviteToState() {

        /** @type {StateData} */
        const data = this.actor.CurrentState.data;

        if (!data)
            return;

        if (!data.owner || !data.targets)
            return;

        if (data.owner !== this.actor)
            return;

        this.actor.CurrentState.data.participants = [this.actor];

        for (let actor of data.targets) {
            console.log(this.actor.identifer, 'zaprasza', actor.identifer);
            actor.EventManager.dispatchEvent(Interactions.INVITE, new Invitation(this.actor, data.targets, this.actor.CurrentState));
        }
        this.#handshake = 'wait_for_answers';
    }

    #answerInvitations() {

        console.log(this.actor.identifer, this.actor.CurrentState);
        for (let invitation of this.#invitationsWithoutAnswer) {

            if (invitation.state === this.actor.CurrentState) {

                console.log(this.actor, 'zaaceptował', invitation.from.identifer);
                invitation.from.EventManager.riseEvent(Interactions.ACCEPT_INVITATION, this.actor);
                invitation.state.data.participants.push(this);
            }
        }

        this.#invitationsWithoutAnswer.length = 0;
    }

    #onInvite(data) {

        this.#invitationsWithoutAnswer.push(data);
    }

    #onAccept(_) {

        this.#handshake = 'somebody_is_comming';
    }

    clone() {

        return new Interactions();
    }
}