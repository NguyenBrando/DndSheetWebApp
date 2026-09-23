import { useNavigate } from 'react-router-dom';
import { useError } from '../components/ErrorDisplay';
import { processJSON } from '../utils/fileValidator'

export default function Home() {
    const navigate = useNavigate();

    const { showError } = useError();

    const handleCharacterFile = async (event) => {
        const file = event.target.files[0];
        const jsonData = await processJSON(file);

        if (jsonData == null) return;

        navigate('/view', {state: {uploadedData: jsonData}});
    }

    return (
        <div>
            <h1> Home </h1>
            <a href="/new_character">Create New Character</a>

            <h5>Upload Character JSON</h5>
            <input type="file" accept=".json" onChange={handleCharacterFile}></input>

            <h5>About</h5>
            <h6>
                Welcome to Brandomonkey's Dungeons and Dragons Character Sheet Manager <br></br>
                The way it works is by compartmentalizing all of your character data into different simlified JSON objects. <br></br>
                Each part of your character (race, class, background) is organized into a different container with a unique list of traits. <br></br>
                The program is built to be highly customizable, but it requires some effort with organizing JSON files in your local directory. 
            </h6>
        </div>
    )
}