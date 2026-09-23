import { useNavigate } from "react-router-dom";
import { useError } from "../components/ErrorDisplay";
import styles from './new.module.css';

import { processJSON } from "../utils/fileValidator";
import { validateCharacterData } from "../utils/characterValidator";


export default function Create() {
    const navigate = useNavigate();
    const { showError } = useError();

    const genCharacter = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        const cleanForm = formValues;

        /* Handle file inputs */
        cleanForm["race"] = processJSON(formValues["race"]);
        cleanForm["class"] = processJSON(formValues["class"]);
        cleanForm["background"] = processJSON(formValues["background"]);

        /* Centralize Stats */
        const { strength, dexterity, constitution, intelligence, wisdom, charisma } = cleanForm;
        cleanForm["stats"] = { strength, dexterity, constitution, intelligence, wisdom, charisma };
        const abilityTypes = ["strength", "dexterity", "intelligence", "wisdom", "charisma"];
        abilityTypes.forEach(key => delete cleanForm[key])
        
        /* Validate inputs */
        formValues["id"] = "character"
        const validatedData = validateCharacterData(formValues);

        if (validatedData instanceof Error) {
            showError(validatedData.message);
            return;
        }

        navigate('/view', {state: {uploadedData: formValues}});
    }

    return (
        <div>
            <h1>New Character Creator</h1>
            <form className={styles.form} onSubmit={genCharacter}>
            <div>
                <label htmlFor='name'>
                    <span className={styles.red}>*</span> Character Name: <input type='text' id='name' name='name' required /> 
                </label>
            </div>
            <div>
                <label htmlFor='player-name'>
                    Player Name: <input type='text' id='player-name' name='playerName' /> 
                </label>
            </div>
            <div>
                <label htmlFor='level'>
                    <span className={styles.red}>*</span> Level: <input type='number' name='level' min='1' max='20' required /> 
                </label>
            </div>
            <div>
                <h3><span className={styles.red}>*</span> Stats: </h3>
                <label htmlFor='strength'>
                    Strength: <br/> <input type='number' name='strength' min='1' max='20' required /> 
                </label>
                <label htmlFor='dexterity'>
                    Dexterity: <br/> <input type='number' name='dexterity' min='1' max='20' required /> 
                </label>
                <label htmlFor='constitution'>
                    Constitution: <br/> <input type='number' name='constitution' min='1' max='20' required /> 
                </label>
                <label htmlFor='intelligence'>
                    Intelligence: <br/> <input type='number' name='intelligence' min='1' max='20' required /> 
                </label>
                <label htmlFor='wisdom'>
                    Wisdom: <br/> <input type='number' name='wisdom' min='1' max='20' required /> 
                </label>
                <label htmlFor='charisma'>
                    Charisma: <br/> <input type='number' name='charisma' min='1' max='20' required /> 
                </label>
            </div>
            <div>
                <label htmlFor='race'>
                    <span className={styles.red}>*</span> Race: <br/> <input type='file' name='race' required /> 
                </label>
            </div>
            <div>
                <label htmlFor='class'>
                    <span className={styles.red}>*</span> Class: <br/> <input type='file' name='class' required /> 
                </label>
            </div>
            <div>
                <label htmlFor='background'>
                    <span className={styles.red}>*</span> Background: <br/> <input type='file' name='background' required /> 
                </label>
            </div>
            <button type='submit'> Generate Character Sheet </button>
        </form>
        </div>
    )
}