import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

import CharacterTopBar from '../components/sheetView/ViewTopBar'
import CharacterStatsColumn from "../components/sheetView/ViewStatsColumn";
import CharacterCombatColumn from "../components/sheetView/ViewCombatColumn";
import CharacterTraitsColumn from "../components/sheetView/ViewTraitsColumn";

import { processCharacterData } from "../models/character"
import { processJSON } from "../utils/fileValidator";
import { useError } from "../components/ErrorDisplay";

export default function View() {
    const { showError, clearError } = useError();
    const location = useLocation();
    const [rawData, setData] = useState(location.state.uploadedData);

    var displayData = processCharacterData(rawData);

    useEffect(() => {
        clearError()
        if (displayData.sourceData.id !== "character")
            showError("'id' field must be 'character'");
    }, [displayData.sourceData.id]);

    const updateData = (key, val) => {
        setData(
            prev => ({
                ...prev,
                [key]: val
            })
        )
    }

    const importNew = async (event) => {
        const file = event.target.files[0];
        const jsonData = await processJSON(file);

        if (jsonData == null) return;

        setData(jsonData)
    }

    const exportData = () => {
        try {
            const jsonData = JSON.stringify(rawData, null, 2)
            const blob = new Blob([jsonData], {type: "application/json;charset=utf-8;"})
            
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `export_data_${Date.now()}.json`; 
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(url);
        } catch (error) {
            showError(error.message)
        }
    }

    return (
        <div className="screenContainer">
            <style>{`
                .screenContainer {
                    display: flex;
                    flex-direction: column;
                }
                    .titleBar {
                        display: flex;
                        justify-content: space-around;
                        margin-bottom: 12px;
                    }   
                    .titleBar > div > * {
                        width: 200px;
                    }
                    .titleBar > div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        gap: 8px;
                        margin-top: 8px;
                    }   
                    .bodyContainer {
                        display: grid;
                        grid-auto-flow: column;
                        grid-auto-columns: 1fr;
                        height: 820px;
                        margin: 8px 0;
                    }
                    .bodyContainer > * > * {
                        margin: 8px;
                    }
            `}</style>

            <div className="titleBar">
                <div>
                    <label>Import New Character</label>
                    <input type="file" accept=".json" onChange={importNew}/>
                </div>
                <h1>Character Display</h1>
                <div>
                    <label>Export Character Data</label>
                    <button onClick={exportData}>Export Character Data</button>
                </div>
            </div>

            <button>Toggle Edit</button>

            {displayData.sourceData.id !== "character" ? null : (
                <div>
                    <CharacterTopBar displayData={displayData} />

                    <div className="bodyContainer">
                        <CharacterStatsColumn displayData={displayData}/>

                        <CharacterCombatColumn displayData={displayData}/>

                        <CharacterTraitsColumn displayData={displayData}/>                
                    </div>

                    <div className="bodyContainer">
                        <h1>Column 1</h1>
                        <h1>Column 2</h1>
                        <h1>Column 3</h1>
                    </div>
                </div>
            )}
            
        </div>
    )
}