import { useNavigate } from "react-router-dom";
import { useError } from "../components/ErrorDisplay";
import { validateCharacterData } from "../utils/characterValidator";


export default function Create() {
    const navigate = useNavigate();
    const { showError } = useError();

    const genCharacter = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(formData.entries());

        formValues["id"] = "character"
        const validatedData = validateCharacterData(formValues);

        if (validatedData instanceof Error) {
            showError(validatedData.message);
            return;
        }

        navigate('/view', {state: {uploadedData: formValues}});
    }

    return (
        <form onSubmit={genCharacter}>
            <h1>New Character Creator</h1>
            <div>
                <label htmlFor='name'>Character Name: </label>
                <input type='text' id='name' name='name' required></input>
            </div>
            <div>
                <label htmlFor='player-name'>Player Name: </label>
                <input type='text' id='player-name' name='playerName'></input>
            </div>
            <div>
                <label htmlFor='level'>Level: </label>
                <input type='number' name='level' min='1' max='20'></input>
            </div>
            <button type='submit'> Generate Character Sheet </button>
        </form>
    )
}