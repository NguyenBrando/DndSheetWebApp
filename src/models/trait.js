import { applyOperator } from "../utils/statCalculator";
import { abilityScores } from "../utils/statLists";
import { effectFactory } from "./effect";


export const traitFactory = (jsonTrait) => {
    return new BaseTrait(jsonTrait);
}


export class BaseTrait {
    constructor(id, source, data) {
        this.id = id;
        this.source = source;

        this.name = data.name;
        this.desc = data.desc;
        this.type = data.type;
        this.level = data.level ?? 0;
        this.favorite = data.favorite;
        this.resource = data.resource;

        this.effects = []
        data.effects?.forEach((effect, index) => this.effects.push(effectFactory(data.type, index, this.source, effect)));
    };

    apply(character) {
        this.effects.map(effect => effect.apply(character))
    };
}

