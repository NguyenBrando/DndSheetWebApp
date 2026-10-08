import { capitalFirst, modFormat } from "../utils/formatter";
import { abilityScores, skills } from "../utils/statLists";

export function effectFactory(type, id, source, effect) {
    const effectType = EffectRegistry[type];
    if (!effectType) return new BaseEffect(id, source, effect);
    return new effectType(id, source, effect)
}


class BaseEffect {
    constructor(id, source, data) {
        this.id = id;
        this.source = source;
        this.type = data.type;
    };

    apply(character) { return; }
}


class AbilityMod extends BaseEffect {
    constructor(id, source, data) {
        super(id, source, data);
        this.mode = data.mode;
        this.target = data.target;
        this.value = data.value;
    }

    apply(character) {
        if (character.stats[this.target] ?? false) {
            character.stats[this.target].value += this.value;
            character.stats[this.target].ops.push(`${capitalFirst(this.source)}: ${modFormat(this.value)}`)
        }
    }
}

class Proficiency extends BaseEffect {
    constructor(id, source, data) {
        super(id, source, data);
        this.mode = data.mode;
        this.category = data.category;
        this.value = data.value;
    }

    apply(character) {
        if (this.category == "savingThrows" && abilityScores.includes(this.value))
            character.savingThrows[this.value].prof += 1;
        else if (this.category == "skills" && skills.includes(this.value))
            character.skills[this.value].prof += 1
        else if (this.value) {
            if (character.proficiencies[this.category] ?? false)
                character.proficiencies[this.category].push(this.value);   
            else character.proficiencies[this.category] = [this.value];
        }
    }
}

const EffectRegistry = {
    "abilityMod": AbilityMod,
    "proficiency": Proficiency
}