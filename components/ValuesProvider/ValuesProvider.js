import { Component } from '../Component.js';

/**
 * @todo docs
 */
export class ValuesProvider extends Component {

    static DEFAULT_IDENTIFIER = 'values_provider'

    values = {};

    constructor(defaultValues) {

        super({ identifier: ValuesProvider.DEFAULT_IDENTIFIER });

        this.values = defaultValues || {};
    }
} 