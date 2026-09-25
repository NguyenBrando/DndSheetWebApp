import { modFormat } from "../../utils/formatter"
import CharacterEquipmentList from "./ViewEquipmentContainer"

function CharacterCombatColumn({ displayData }) {
    return (
        <div className="centerContainer">
            <style>{`
                .centerContainer {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                    .combatStatsContainer {
                        display: grid;
                        grid-auto-flow: column;
                        grid-auto-columns: 1fr;
                    }
                    .combatStatsContainer div {
                        border: 1px solid var(--text);
                        padding: 20px 0;
                    }
                    
                    .hpStatsContainer {
                        display: grid;
                        grid-template-columns: 50% 1fr;
                        border: 1px solid var(--text);
                        padding: 14px;
                        gap: 16px;
                        align-items: center;
                    }
                    .hpStatsContainer > div {
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                    }
                    .hpStatsContainer > div > div {
                        display: flex;
                        gap: 2px;
                    }
                    .hpStatsContainer h2 {
                        border-bottom: 1px solid var(--border);
                    }
                    .hpStatsContainer input {
                        box-sizing: border-box;
                        width: 50%;
                    }
                    
                    .lifeStatsContainer {
                        display: grid;
                        grid-auto-flow: column;
                        grid-auto-columns: 1fr;
                    }
                    .lifeStatsContainer > div {
                        border: 1px solid var(--text);
                    }
                    .lifeStatsContainer > div > div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 16px 0 8px 0;
                    }
                        .hitDiceContainer > div {
                            display: flex;
                            justify-content: space-between;
                            gap: 12px;
                        }
                        .hitDiceContainer h3 {
                            border-bottom: 1px solid var(--border)
                        }
                        .deathSavesContainer > div {
                            display: flex;
                        }
            `}</style>

            <div className="combatStatsContainer">
                <div>
                    <h2>{displayData.armorClass}</h2>
                    <h6>Armor Class</h6>
                </div>
                <div>
                    <h2>{modFormat(displayData.initiative)}</h2>
                    <h6>Initiative</h6>
                </div>
                <div>
                    <h2>{displayData.speed}ft</h2>
                    <h6>Speed</h6>
                </div>
            </div>

            <div className="hpStatsContainer">
                <div>
                    <h2>{displayData.health?.current} HP</h2>
                    <h3>{displayData.health?.max} MAX HP</h3>
                </div>
                <div>
                    <h3>/ +{displayData.health?.temp} TEMP HP</h3>
                    <div>
                        <input type="number" defaultValue={0}/>
                        <button>-</button> 
                        <button>+</button>
                        <button>/+</button>
                    </div>
                </div>
            </div>

            <div className="lifeStatsContainer">
                <div>
                    <div className="hitDiceContainer">
                        <div>
                            <button>-</button>
                            <h3>{displayData.hitDice?.current} d{displayData.hitDice?.type}</h3>
                            <button>+</button>
                        </div>
                        <div>
                            <h4>{displayData.hitDice?.max} d{displayData.hitDice?.type} Total</h4>
                        </div>
                    </div>
                    <h3>Hit Dice</h3>
                </div>
                <div>
                    <div className="deathSavesContainer">
                        <h3></h3>
                        <div>
                            <h3>Successes: </h3>
                            <input type="radio"/> <input type="radio"/> <input type="radio"/>
                        </div>
                        <div>
                            <h3>Failures: </h3>
                            <input type="radio"/> <input type="radio"/> <input type="radio"/>
                        </div>
                    </div>
                    <h3>Death Saves</h3>
                </div>
            </div>

            <CharacterEquipmentList displayData={displayData}/>
        </div>
    )
}

export default CharacterCombatColumn