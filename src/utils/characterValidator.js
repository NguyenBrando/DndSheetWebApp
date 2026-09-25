export const validateCharacterData = (characterObj) => {

    if (characterObj["id"] != "Character") return new Error("Object's 'id' attribute must be 'character'");

    return characterObj;
}