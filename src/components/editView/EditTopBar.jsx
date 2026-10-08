import { processJSON } from "../../utils/fileValidator";
import { useError } from "../ErrorDisplay";

function EditTopBar({ rawData, updateData }) {
    const { showError, clearError } = useError();

    function updateDataKey(key, value) {
        updateData(draft => {
            draft[key] = value
        })
    }

    const handleFile = async (type, file) => {
        const jsonData = await processJSON(file);

        if (jsonData == null || jsonData.id != type) {
            showError(`There was a problem with the ${type} file`)
            return;
        }

        updateDataKey(type, jsonData)
    }

    return (
        <div className="top-bar">
            <style>{`
                .top-bar {
                    width: 90%;
                    margin: 1.5rem auto 0 auto;

                    display: grid;
                    grid-template-columns: 40% 1fr;
                    align-items: center;
                }
                .top-bar > * {
                    border: 1px solid var(--text-h);
                    padding: 8px;

                    border-collapse: collapse;
                    table-layout: fixed;
                }
                .top-bar tr:nth-child(odd) {
                    border-bottom: 1px solid var(--border)
                }
                .top-bar th, td {
                    width: 33%;
                    text-align: left;
                    padding: 2px 12px;
                }
                .top-bar td {
                    padding: 8px 12px;
                }
                .top-bar input[type="file"] {
                    width: 100%;
                }
            `}</style>

            <div>
                <input type="text" value={rawData.name} onChange={(e) => updateDataKey('name',e.target.value)}/>
                <h6>Character Name: </h6>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td><input type="file" accept=".json" onChange={(e) => handleFile('class',e.target.files[0])}/></td>
                        <td><input type="file" accept=".json" onChange={(e) => handleFile('race',e.target.files[0])}/></td>
                        <td><input type="file" accept=".json" onChange={(e) => handleFile('background',e.target.files[0])}/></td>
                    </tr>
                    <tr>
                        <th><h6>Class:</h6></th>
                        <th><h6>Race:</h6></th>
                        <th><h6>Background:</h6></th>
                    </tr>
                    <tr>
                        <td><input type="number" min="0" max="20" value={rawData.level} onChange={(e) => updateDataKey('level',e.target.value)}/></td>
                        <td><input type="text" value={rawData.alignment} onChange={(e) => updateDataKey('alignment',e.target.value)}/></td>
                        <td><input type="text" value={rawData.playerName} onChange={(e) => updateDataKey('playerName',e.target.value)}/></td>
                    </tr>
                    <tr>
                        <th><h6>Level:</h6></th>
                        <th><h6>Alignment:</h6></th>
                        <th><h6>Player Name:</h6></th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default EditTopBar;