import { Component } from '../Component.js';

export class OnEvent_PushComponent extends Component {

    static Target = { OWNER: 0, WORLD: 1 };

    /**
     * @param {string} value
     * @param {Function} formula 
     * @param {number} type 
     */
    constructor(event, component, target = OnEvent_PushComponent.Target.OWNER, { identifier, priority } = {}) {

        super({ identifier: identifier, priority: priority });

        this.event = event;
        this.component = component.clone();

        this.target = target;
    }

    postInitialize() {

        let target;

        if (this.target === OnEvent_PushComponent.Target.OWNER)
            target = this.owner;
        else if (this.target === OnEvent_PushComponent.Target.WORLD)
            target = this.owner.owner;

        target.EventManager.addEventListener(this.event, () => this.owner.pushComponent(this.component));
    }

    clone() {

        return new OnEvent_PushComponent(this.event, this.component.clone(), this.target, {
            identifier: this.identifier, priority: this.priority
        });
    }
}