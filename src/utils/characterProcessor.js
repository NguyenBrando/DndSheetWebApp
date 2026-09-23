import { traitFactory } from "../models/trait";
import { statFormat } from "./formatter";
import { calcAbilityMod, calcProf } from "./statCalculator";
import { abilityScores, skills } from "./statLists";

export const processCharacterData = (characterObj) => {
    const formattedObj = { ...characterObj };

    initializeFormat(formattedObj);

    for (const trait of formattedObj.traits) {
        trait.apply(formattedObj)
    }

    calculateStats(formattedObj);

    return formattedObj;
}

const initializeFormat = (characterObj) => {
    /* Ability Scores */
    const formattedStats = Object.fromEntries(
        Object.entries(characterObj.stats).map(([ability, value]) => [
            ability, { value: value, ops: [String(value)] }
        ])
    );
    characterObj.stats = formattedStats;

    /* Saving Throws */
    characterObj.savingThrows = Object.fromEntries(
        abilityScores.map(ability => [ability, {"prof": 0}])
    );

    /* Skills */
    characterObj.skills = Object.fromEntries(
        Object.keys(skills).map(skill => [skill, {"prof": 0}])
    );

    /* Initialize and set up traits */
    characterObj.traits  = [];
    for (const trait of characterObj.race.traits) {
        trait.source = "race";
        characterObj.traits.push(traitFactory(trait));
    };
    for (const trait of characterObj.class.traits) {
        trait.source = "class";
        characterObj.traits.push(traitFactory(trait));
    };
    for (const trait of characterObj.background.traits) {
        trait.source = "background";
        characterObj.traits.push(traitFactory(trait));
    };
};

const calculateStats = (characterObj) => {
    /* Proficiency Bonus */
    characterObj["profBonus"] = calcProf(characterObj["level"]);

    /* Ability Modifiers */
    Object.values(characterObj.stats).map((statObj) => 
        statObj.mod = calcAbilityMod(statObj.value)
    );

    /* Saving Throws */
    abilityScores.map((ability) => 
        characterObj.savingThrows[ability].mod = statFormat(
            Number(characterObj.stats[ability].mod) +
            (characterObj.savingThrows[ability].prof * Number(characterObj.profBonus))
        )
    );

    /* Skills */
    Object.entries(skills).map(([skill, ability]) => {
        characterObj.skills[skill].mod = statFormat(
            Number(characterObj.stats[ability].mod) +
            (characterObj.skills[skill].prof * Number(characterObj.profBonus))
        );
    });
};

