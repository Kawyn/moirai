import { Moirai } from "./moirai.js";
import { Actor } from "./Actor.js";
import { Component } from "./components/Component.js";
import { ValuesProvider_ModifyValueOverTime } from "./components/ValuesProvider/ValuesProvider_ModifyValueOverTime.js";
import { ValuesProvider } from "./components/ValuesProvider/ValuesProvider.js";
import { PreventState } from "./components/PreventState.js";
import { State } from "./State.js";
import { StateWithWeightFromValuesProvider } from "./components/StatesProvider/StateWithWeightFromValuesProvider.js";
import { Interactions } from "./components/Interactions/Interactions.js";
import { Interactions_TODO_rename } from "./components/Interactions/Testing.js";
import { Interactions_TODO_rename_StateProvider } from "./components/Interactions/StateProviders/Example.js";


const createDefaultAgent = (name) => {

    const agent = new Actor(new State('wait', 0));
    agent.identifer = name;
    const provider = new ValuesProvider({
        name: name,

        hunger: Math.floor(Math.random() * 10),
        energy: Math.floor(Math.random() * 10),
        social: Math.floor(Math.random() * 10),
    });

    agent.pushComponent(provider);

    const hunger = new ValuesProvider_ModifyValueOverTime('hunger', (value) => value + 1, ValuesProvider_ModifyValueOverTime.WhenToModify.POST_REFRESH);
    agent.pushComponent(hunger);

    const energy = new ValuesProvider_ModifyValueOverTime('energy', (value) => value + 1, ValuesProvider_ModifyValueOverTime.WhenToModify.POST_REFRESH);
    agent.pushComponent(energy);

    const social = new ValuesProvider_ModifyValueOverTime('social', (value) => value + 5, ValuesProvider_ModifyValueOverTime.WhenToModify.POST_REFRESH);
    agent.pushComponent(social);


    const interactions = new Interactions();
    agent.pushComponent(interactions);

    const eeee = new Interactions_TODO_rename('testing', []);
    const testingProvider = new Interactions_TODO_rename_StateProvider('testing');

    agent.pushComponent(eeee);
    agent.pushComponent(testingProvider);

    const eat = new StateWithWeightFromValuesProvider('eat', 'hunger', (value) => value);
    const sleep = new StateWithWeightFromValuesProvider('sleep', 'energy', (value) => value);
    agent.EventManager.riseEvent(Interactions.ON_SUCCES, () => console.log("???"));
    agent.EventManager.riseEvent(Interactions.ON_FAIL, () => console.log("???fail"));

    agent.pushComponent(eat);
    agent.pushComponent(sleep);

    return agent;
}

const andrzej = createDefaultAgent('Andrzej');


const marta = createDefaultAgent('Marta');
export const moirai = new Moirai([
    andrzej,
    marta
]);

moirai.EventManager.addEventListener('post_refresh', (data) => {

    for (let agent of moirai.Actors)
        console.log(moirai.CurrentTime, agent.getComponentByIdentifier(ValuesProvider.DEFAULT_IDENTIFIER).values, agent.CurrentState);
});

moirai.refresh();
moirai.refresh();
moirai.refresh();
moirai.refresh();
moirai.refresh();
moirai.refresh();


console.log(`Ready as I'll ever be!`);

