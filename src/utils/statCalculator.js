import { statFormat } from "./formatter";

export const calcProf = (level) => {
    return statFormat(Math.ceil(level / 4) + 1)
}

export const calcAbilityMod = (abilityScore) => {
    return statFormat(Math.floor(abilityScore / 2) - 5);
}

export const applyOperator = (x, operator, y) => {
    switch (operator) {
        case '+':
            return x + y;
        case '-':
            return x - y;
    }
}