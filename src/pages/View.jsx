import { useLocation, useNavigate } from "react-router-dom"
import styles from './view.module.css';

import { processCharacterData } from "../utils/characterProcessor";
import { abilityScores, skills } from "../utils/statLists";
import { capitalFirst } from "../utils/formatter";

export default function View() {
    const location = useLocation()
    const navigate = useNavigate()

    const jsonCharacterData = location.state.uploadedData
    const displayData = processCharacterData(jsonCharacterData)
    console.log(displayData)

    return (
        <div className={styles.screenContainer}>
            <h1>Character Display</h1>

            <div className={styles.topBar}>
                <div className={styles.hardBorder}>
                    <h2>{displayData.name}</h2>
                    <h6>Character Name: </h6>
                </div>
                <table className={styles.hardBorder}>
                    <tbody>
                        <tr className={styles.underlined}>
                            <td><h3>{displayData.class.name}</h3></td>
                            <td><h3>{displayData.level}</h3></td>
                            <td><h3>{displayData.background.name}</h3></td>
                        </tr>
                        <tr>
                            <th><h6>Class:</h6></th>
                            <th><h6>Level:</h6></th>
                            <th><h6>Background:</h6></th>
                        </tr>
                        <tr className={styles.underlined}>
                            <td><h3>{displayData.race.name}</h3></td>
                            <td><h3>{displayData.alignment}</h3></td>
                            <td><h3>{displayData.playerName}</h3></td>
                        </tr>
                        <tr>
                            <th><h6>Race:</h6></th>
                            <th><h6>Alignment:</h6></th>
                            <th><h6>Player Name:</h6></th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={styles.bodyContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.abilityScoresContainer}>
                        {abilityScores.map((ability) => (
                            <div key={ability} title={displayData.stats[ability].ops.join('\n')}>
                                <h6>{capitalFirst(ability)}</h6>
                                <h2>{displayData.stats[ability].value}</h2>
                                <h3>{displayData.stats[ability].mod}</h3>
                            </div>
                        ))}
                    </div>

                    <div className={styles.proficienciesContainer}>
                        <div className={styles.stackedListEntry}>
                            <h3>0</h3><h6>Inspiration Points</h6>
                        </div>
                        <div className={styles.stackedListEntry}>
                            <h3>{displayData.profBonus}</h3> <h6>Proficiency Bonus</h6>
                        </div>

                        <div className={styles.skillsBox}>
                            {abilityScores.map((ability) => (
                                <div key={ability}>
                                    <input type='radio' checked={displayData.savingThrows[ability].prof == 1} disabled={displayData.savingThrows[ability].prof != 1}/>
                                    <h4 className={styles.underlined}>{displayData.savingThrows[ability].mod}</h4>
                                    <h6>{capitalFirst(ability)}</h6>
                                </div>
                            ))}
                            <h5>Saving Throws</h5>
                        </div>

                        <div className={styles.skillsBox}>
                            {Object.entries(skills).map(([skill, ability]) => (
                                <div key={skill}>
                                    <input type='radio' checked={displayData.savingThrows[ability].prof == 1} disabled={displayData.savingThrows[ability].prof != 1}/>
                                    <h4 className={styles.underlined}>{displayData.skills[skill].mod}</h4>
                                    <h6>{capitalFirst(skill)} <i>({capitalFirst(ability.slice(0,3))})</i></h6>
                                </div>
                            ))}
                            <h5>Skills</h5>
                        </div>
                    </div>
                </div>

                <div className={styles.centerContainer}>
                    <div className={styles.combatStatsContainer}>
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
                    <div className={styles.hpStatsContainer}>
                        <div>
                            <h2 className={styles.underlined}>100 HP</h2>
                            <h3>100 MAX HP</h3>
                        </div>
                        <div>
                            <h3>+0 TEMP HP</h3>
                            <input type="number" defaultValue={0}/>
                            <button>Apply Damage</button>
                        </div>
                    </div>
                    <div className={styles.lifeStatsContainer}>
                        <div>
                            <div className={styles.hitDiceContainer}>
                                <div>
                                    <button>+</button>
                                    <h3 className={styles.underlined}>1 d8</h3>
                                    <button>-</button>
                                </div>
                                <div>
                                    <h4>{displayData.level} d8 Total</h4>
                                </div>
                            </div>
                            <h3>Hit Dice</h3>
                        </div>
                        <div>
                            <div className={styles.deathSavesContainer}>
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
                    <div className={styles.equipmentContainer}>
                        <h3>Equipment List</h3>
                        <div>
                            
                        </div>
                    </div>
                </div>

                <div className={styles.rightContainer}>
                    <h3>Traits List</h3>
                    <div className={styles.traitsContainer}>
                        {displayData.traits.map((trait) => (
                            <div key={trait.name}>
                                <div>
                                    <h6>{trait.name}</h6>
                                    <input type="checkbox" checked={trait.favorite}/>
                                </div>
                                <div>
                                    <h5>{capitalFirst(trait.source)} Trait</h5>
                                    <h5>{capitalFirst(trait.usage )}</h5>
                                </div>
                                <p>{trait.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.bodyContainer}>
                <h1>Column 1</h1>
                <h1>Column 2</h1>
                <h1>Column 3</h1>
            </div>
        </div>
    )
}