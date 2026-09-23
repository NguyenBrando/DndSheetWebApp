import { capitalFirst } from "../../utils/formatter"
import { abilityScores, skills } from "../../utils/statLists"

function CharacterStatsColumn({ displayData }) {
    return (
        <div className="leftContainer">
            <style>{`
                .leftContainer {
                    display: grid;
                    grid-template-columns: 32% 1fr;
                }
                .leftContainer > div {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                
                    .abilityScoresContainer div {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: center;
                        border: 1px solid var(--text);
                        padding: 8px 0 0 0;
                    }
                    .abilityScoresContainer h2 {
                        padding: 8px;
                    }
                    .abilityScoresContainer h3 {
                        border: 1px solid var(--text);
                        border-radius: 100% 100% 0 0;
                        padding: 6px 12px 0px 12px;
                        margin-bottom: -1px;
                    }

                        .stackedListEntry {
                            display: grid;
                            grid-template-columns: 20% 1fr;
                        }
                        .stackedListEntry > * {
                            border: 1px solid var(--text);
                            padding: 6px 0;
                        }

                        .skillsBox {
                            display: flex;
                            flex-direction: column;
                            gap: 4px;
                            border: 1px solid var(--text);
                            padding: 8px;
                        }
                        .skillsBox > div {
                            display: flex;
                            gap: 8px;
                        }
                        .skillsBox h4 {
                            border-bottom: 1px solid var(--border);
                        }
                        .skillsBox i {
                            color: var(--text);
                            font-size-adjust: 0.4;
                        }

            `}</style>


            <div className="abilityScoresContainer">
                {abilityScores.map((ability) => (
                    <div key={ability} title={displayData.stats[ability].ops.join('\n')}>
                        <h6>{capitalFirst(ability)}</h6>
                        <h2>{displayData.stats[ability].value}</h2>
                        <h3>{displayData.stats[ability].mod}</h3>
                    </div>
                ))}
            </div>

            <div className="proficienciesContainer">
                <div className="stackedListEntry">
                    <h3>0</h3><h6>Inspiration Points</h6>
                </div>
                <div className="stackedListEntry">
                    <h3>{displayData.profBonus}</h3> <h6>Proficiency Bonus</h6>
                </div>

                <div className="skillsBox">
                    {abilityScores.map((ability) => (
                        <div key={ability}>
                            <input type='radio' checked={displayData.savingThrows[ability].prof == 1} disabled={displayData.savingThrows[ability].prof != 1}/>
                            <h4>{displayData.savingThrows[ability].mod}</h4>
                            <h6>{capitalFirst(ability)}</h6>
                        </div>
                    ))}
                    <h5>Saving Throws</h5>
                </div>

                <div className="skillsBox">
                    {Object.entries(skills).map(([skill, ability]) => (
                        <div key={skill}>
                            <input type='radio' checked={displayData.savingThrows[ability].prof == 1} disabled={displayData.savingThrows[ability].prof != 1}/>
                            <h4>{displayData.skills[skill].mod}</h4>
                            <h6>{capitalFirst(skill)} <i>({capitalFirst(ability.slice(0,3))})</i></h6>
                        </div>
                    ))}
                    <h5>Skills</h5>
                </div>
            </div>
        </div>
    )
}

export default CharacterStatsColumn
