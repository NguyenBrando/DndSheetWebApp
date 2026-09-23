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
                        grid-template-columns: 60% 1fr;
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
                    .hpStatsContainer h2 {
                        border-bottom: 1px solid var(--border);
                    }
                    .hpStatsContainer input {
                        box-sizing: border-box;
                        width: 100%;
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
                    <h2>{Number(displayData.stats.dexterity.mod)+ 10}</h2>
                    <h6>Armor Class</h6>
                </div>
                <div>
                    <h2>{displayData.stats.dexterity.mod}</h2>
                    <h6>Initiative</h6>
                </div>
                <div>
                    <h2>{displayData.race.speed}ft</h2>
                    <h6>Speed</h6>
                </div>
            </div>

            <div className="hpStatsContainer">
                <div>
                    <h2>100 HP</h2>
                    <h3>100 MAX HP</h3>
                </div>
                <div>
                    <h3>+0 TEMP HP</h3>
                    <input type="number" defaultValue={0}/>
                    <button>Apply Damage</button>
                </div>
            </div>

            <div className="lifeStatsContainer">
                <div>
                    <div className="hitDiceContainer">
                        <div>
                            <button>-</button>
                            <h3>1 d8</h3>
                            <button>+</button>
                        </div>
                        <div>
                            <h4>{displayData.level} d8 Total</h4>
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