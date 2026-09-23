import { useLocation, useNavigate } from "react-router-dom"

import CharacterTopBar from '../components/sheetView/ViewTopBar'

import { processCharacterData } from "../utils/characterProcessor";
import { abilityScores, skills } from "../utils/statLists";
import { capitalFirst } from "../utils/formatter";
import CharacterStatsColumn from "../components/sheetView/ViewStatsColumn";
import CharacterCombatColumn from "../components/sheetView/ViewCombatColumn";
import CharacterTraitsColumn from "../components/sheetView/ViewTraitsColumn";

export default function View() {
    const location = useLocation()
    const navigate = useNavigate()

    const jsonCharacterData = location.state.uploadedData
    const displayData = processCharacterData(jsonCharacterData)
    console.log(displayData)

    return (
        <div className="screenContainer">
            <style>{`
                .screenContainer {
                    display: flex;
                    flex-direction: column;
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

            <h1>Character Display</h1>

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
    )
}