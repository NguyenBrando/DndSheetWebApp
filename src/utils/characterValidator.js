export const validateCharacterData = (characterObj) => {

    if (characterObj["id"] != "Character") return new Error("Object's 'id' attribute must be 'character'");
    
    const requiredFields = ["name", "level", "stats", "race", "class", "background"]

    for (const field of requiredFields)
        if (characterObj[field] === undefined || characterObj[field] === null) return new Error(`'${field}' is a required field`)


    return characterObj;
}