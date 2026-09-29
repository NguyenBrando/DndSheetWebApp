import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { useError } from "../components/ErrorDisplay";

import CharacterTopBar from '../components/sheetView/ViewTopBar'
import CharacterStatsColumn from "../components/sheetView/ViewStatsColumn";
import CharacterCombatColumn from "../components/sheetView/ViewCombatColumn";
import CharacterTraitsColumn from "../components/sheetView/ViewTraitsColumn";

import EditView from '../components/editView/EditView'

import { processCharacterData } from "../models/character"
import { processJSON } from "../utils/fileValidator";
import { formatDate } from "../utils/formatter";

export default function View() {
    const { showError, clearError } = useError();
    const location = useLocation();
    const [rawData, updateData] = useImmer({});
    const [isEditing, setIsEditing] = useState(false);

    var displayData = processCharacterData(rawData);

    /* Use uploaded data if available */
    useEffect(() => {
        if (location.state?.uploadedData) updateData(location.state.uploadedData);
    }, [location]);

    /* Enforce data consistency */
    useEffect(() => {
        clearError()
        if (displayData.sourceData.id !== "character")
            showError("'id' field must be 'character'");
    }, [displayData.sourceData.id]);

	/* Export reminder */
	useEffect(() => {
		const handleBeforeUnload = (event) => {
			event.preventDefault();
			event.returnValue = ''; 
		};
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

    /* Import file */
    const importNew = async (event) => {
        const file = event.target.files[0];
        const jsonData = await processJSON(file);

        if (jsonData == null) return;

        updateData(jsonData)
    }

    /* Export file */
    const exportData = () => {
        try {
            const jsonData = JSON.stringify(rawData, null, 2)
            const blob = new Blob([jsonData], {type: "application/json;charset=utf-8;"})
            
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `export_data_${formatDate(Date.now())}.json`; 
            
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

            <button onClick={() => setIsEditing(!isEditing)}>Toggle Edit {isEditing ? "Off" : "On"}</button>

            {displayData.sourceData.id !== "character" ? null : (
                isEditing ? (
                    <EditView rawData={rawData} updateData={updateData}/>
                ) : (
                    <div>
                        <CharacterTopBar displayData={displayData} />

                        <div className="bodyContainer">
                            <CharacterStatsColumn displayData={displayData} updateData={updateData}/>

                            <CharacterCombatColumn displayData={displayData} updateData={updateData}/>

                            <CharacterTraitsColumn displayData={displayData} updateData={updateData}/>                
                        </div>

                        <div className="bodyContainer">
                            <h1>Column 1</h1>
                            <h1>Column 2</h1>
                            <h1>Column 3</h1>
                        </div>
                    </div>
                )
            )}
            
        </div>
    )
}