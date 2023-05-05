import { State } from '../../../State.js';
import { ValuesProvider } from '../../ValuesProvider/ValuesProvider.js';
import { Interactions_TODO_rename } from '../Testing.js';

export class Interactions_TODO_rename_StateProvider extends Interactions_TODO_rename.Interactions_StateProvider {

    /** @type {ValuesProvider} */
    #valuesProvider;

    constructor(identifier) {
        super({ identifier: identifier });
    }

    postInitialize() {
        this.#valuesProvider = this.actor.getComponentByIdentifier(ValuesProvider.DEFAULT_IDENTIFIER)
    }

    getState() {

        return new State('test', this.#valuesProvider.values['social'], { owner: this });
    }

    clone() {
        return new Interactions_TODO_rename_StateProvider(this.identifier);
    }
}