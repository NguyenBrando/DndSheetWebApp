import { calcAbilityMod, calcProf, clamp } from "../utils/statCalculator";
import { abilityScores, skills } from "../utils/statLists";
import { BaseTrait, traitFactory } from "./trait";

export const processCharacterData = (rawData) => {
    return new CharacterDisplayData(rawData)
}

class CharacterDisplayData {
    constructor(data) {
        /* Raw Text */
        this.name = data.name;
        this.playerName = data.playerName;

        /* Verification */
        this.level = clamp(data.level ?? 1, 1, 20);
        this.proficiency = calcProf(data.level);
        this.alignment = data.alignment;

        /* Set up stats */
        this.stats = Object.fromEntries(abilityScores.map(ability => [ability, {value: clamp(data?.stats?.[ability] ?? 10, 1, 20), ops: [], cap: 20}]));
        this.savingThrows = Object.fromEntries(abilityScores.map(ability => [ability, {prof: 0}]));
        this.skills = Object.fromEntries(Object.entries(skills).map(([skill,ability]) => [skill, {ability: ability, prof: 0}]));
        this.proficiencies = {}

        /* Resources */
        this.hp = {rolls: data.hp?.rolls, current: data.hp?.current ?? 0, temp: data.hp?.temp ?? 0}
        this.hitDice = {current: data.hitDice ?? data.level, max: data.level}
        this.inspiration = data.inspiration;
        this.deathSaves = data.deathSaves;
        this.equipment = data.equipment;

        /* Extract complex component data */
        this.traits = []
        this.apply_race(data.race);
        this.apply_background(data.background);
        this.apply_class(data.class);

        /* Save data */
        this.sourceData = data

        /* Apply initial traits */
        for (const trait of this.traits) 
            trait.apply(this);
        
        /* Run final stat calculations */
        this.run_calculations();
    };

    /* Deconstruct race object */
    apply_race(race) {
        if (race === undefined || race.id != "race") return;
        
        this.race = race.name;
        this.creatureType = race.type;
        this.size = race.size;
        this.speed = race.speed;
        
        for (const [index,trait] of race.traits.entries()) {
            this.traits.push(new BaseTrait(index, "race", trait))
        }
    };

    /* Deconstruct background object */
    apply_background(background) {
        if (background === undefined || background.id != "background") return;
        
        this.background = background.name;

        for (const [index,trait] of background.traits.entries()) {
            this.traits.push(new BaseTrait(index, "background", trait));
        }
    };

    /* Deconstruct class object */
    apply_class(char_class) {
        if (char_class === undefined || char_class.id != "class") return;
        
        this.class = char_class.name;
        this.hitDice.type = char_class.hitDice;

        for (const [index,trait] of char_class.traits.entries()) {
            this.traits.push(new BaseTrait(index, "class", trait))
        }
    };

    /* Calculate character stats */
    run_calculations() {
        /* Proficiency Bonus */
        this.profBonus = calcProf(this.level)

        /* Stats and Saving Throws */
        abilityScores.map(ability => {
            this.stats[ability].mod = calcAbilityMod(this.stats[ability].value)
            this.savingThrows[ability].mod = this.stats[ability].mod + (this.profBonus * this.savingThrows[ability].prof)
        })

        /* Skills */
        Object.entries(skills).map(([skill,ability]) => {
            this.skills[skill].mod = this.stats[ability].mod + (this.profBonus * this.skills[skill].prof)
        })

        /* Dex Based Stats */
        this.armorClass = 10 + this.stats.dexterity.mod
        this.initiative = this.stats.dexterity.mod

        /* HP */
        const relavantHpRolls = Array.from(
            {length: this.level - 1},
            (_,i) => this.hp?.rolls?.[2+i] ?? 0
        );

        const rollsSum = (relavantHpRolls.reduce((accumulative, currVal) => accumulative + clamp(currVal,0,(this.hitDice?.type ?? 0)), 0))
        
        this.hp.max = (
            (this.hitDice?.type ?? 0) + 
            (rollsSum) + 
            (this.stats.constitution.mod * this.level)
        );

        this.hp.ops = []
        this.hp.ops.push(`Lvl 1 Hit Die: ${this.hitDice?.type ?? 0}`)
        this.hp.ops.push(`Rolls Sum: +${rollsSum}`)
        this.hp.ops.push(`Con Mod: +${this.stats.constitution.mod * this.level}`)

        this.hp.current = clamp(this.hp.current ?? this.hp.max, 0, this.hp.max);
    }

    get_stat(stat_id) {
        if (typeof stat_id === "number") return stat_id;
        switch (stat_id) {
            case "@proficiency":
                return this.profBonus;
        }
    };
}