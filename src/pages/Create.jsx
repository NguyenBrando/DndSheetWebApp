import { useNavigate } from "react-router-dom";

export default function Create() {
    const navigate = useNavigate();

    const genCharacter = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        navigate('/view', {state: {uploadedData: formValues}});
    }

    return (
        <form onSubmit={genCharacter}>
            <h1>New Character Creator</h1>
            <div>
                <label for='name'>Character Name: </label>
                <input type='text' id='name' name='name' required></input>
            </div>
            <div>
                <label for='player-name'>Player Name: </label>
                <input type='text' id='player-name' name='playerName'></input>
            </div>
            <div>
                <label>Level: </label>
                <input type='number' name='level' min='1' max='20'></input>
            </div>
            <button type='submit'> Generate Character Sheet </button>
        </form>
    )
}