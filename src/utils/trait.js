class BaseTrait {
    constructor(data) {
        this.name = data.name;
        this.type = data.type;
    }

    apply(character) {
        return character;
    }
}

class AbilityMod extends BaseTrait {
    constructor(data) {
        this.name = data.name;
        this.type = data.type;
    }
}