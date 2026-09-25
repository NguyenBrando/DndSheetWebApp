import { calcAbilityMod, calcProf, clamp } from "../utils/statCalculator";
import { abilityScores, skills } from "../utils/statLists";
import { traitFactory } from "./trait";

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
        this.alignment = data.alignment; // verify

        /* Set up stats */
        this.stats = Object.fromEntries(abilityScores.map(ability => [ability, {value: clamp(data?.stats?.[ability] ?? 10, 1, 20), ops: []}]));
        this.savingThrows = Object.fromEntries(abilityScores.map(ability => [ability, {prof: 0}]));
        this.skills = Object.fromEntries(Object.entries(skills).map(([skill,ability]) => [skill, {ability: ability, prof: 0}]));

        /* Resources */
        this.health = {rolls: data.health?.rolls, current: data.health?.current ?? 0, temp: data.health?.temp ?? 0}
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

        /* Apply static traits */
        for (trait of this.traits) 
            if (trait.usage == "static")    
                trait.apply(this);

        /* Run final stat calculations */
        this.run_calculations();
    };

    /* Deconstruct race object */
    apply_race(race) {
        if (race === undefined || race.id != "race") {
            this.race = {};
            return;
        }
        
        this.race = race.name;
        this.creatureType = race.type;
        this.size = race.size;
        this.speed = race.speed;

        for (trait of race.traits) {
            this.traits.push(traitFactory(trait))
        }
    };

    /* Deconstruct background object */
    apply_background(bg) {
        if (bg === undefined || bg.id != "race") {
            this.background = {};
            return;
        }
        
        this.bg = bg.name;

        for (trait of bg.traits) {
            this.traits.push(traitFactory(trait))
        }
    };

    /* Deconstruct class object */
    apply_class(char_class) {
        if (char_class === undefined || char_class.id != "class") {
            this.class = {};
            return;
        }
        
        this.class = char_class.name;

        for (trait of char_class.traits) {
            this.traits.push(traitFactory(trait))
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
        const relavantHpRolls = this.health.rolls?.slice(0,this.level) ?? [];
        this.health.max = (
            (this.hitDice?.type ?? 0) + 
            (relavantHpRolls.reduce((accumulative, currVal) => accumulative + clamp(currVal,1,(this.hitDice?.type ?? 0)), 0)) + 
            (this.stats.constitution.mod * this.level)
        );
        this.health.current = clamp(this.health.current, 0, this.health.max)
    }
}