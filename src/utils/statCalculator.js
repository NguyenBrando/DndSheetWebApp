export const calcProf = (level) => {
    return Math.ceil(level / 4) + 1;
}

export const calcAbilityMod = (abilityScore) => {
    return Math.floor(abilityScore / 2) - 5;
}

export const applyOperator = (x, operator, y) => {
    switch (operator) {
        case '+':
            return x + y;
        case '-':
            return x - y;
    }
}

export const clamp = (val, min, max) => {
    return Math.min(Math.max(val, min), max);
}