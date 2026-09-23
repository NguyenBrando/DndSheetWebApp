import { applyOperator } from "../utils/statCalculator";
import { abilityScores } from "../utils/statLists";


export const traitFactory = (jsonTrait) => {
    const TraitClass = TraitRegistry[jsonTrait.type];
    if (!TraitClass) return new BaseTrait(jsonTrait);
    return new TraitClass(jsonTrait);
}


class BaseTrait {
    constructor(data) {
        this.name = data.name;
        this.type = data.type;
        this.desc = data.desc;
        this.usage = data.usage;
        this.source = data.source;

        this.value = data.value;
        this.operator = data.operator;
        this.definites = data.definites;
        this.options = data.options;
    };

    apply(character) {
        return
    };
}

class AbilityMod extends BaseTrait {
    apply(character) {
        for (const option of this.definites) {
            if (abilityScores.includes(option)) {
                console.log(character.stats[option])
                character.stats[option].value = applyOperator(character.stats[option].value, this.operator, this.value);
                character.stats[option].ops.push(`${this.operator} ${this.value} (${character.race.name})`)
            }
        };
        for (const option of this.options) {
            if (abilityScores.includes(option)) {
                console.log(character.stats[option])
                character.stats[option].value = applyOperator(character.stats[option].value, this.operator, this.value);
                character.stats[option].ops.push(`${this.operator} ${this.value} (${character.race.name})`)
            }
        };
    };
}


const TraitRegistry = {
    "abilityMod": AbilityMod
}