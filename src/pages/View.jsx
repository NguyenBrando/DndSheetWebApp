import { useLocation, useNavigate } from "react-router-dom"
import styles from './view.module.css';

export default function View() {
    const location = useLocation()
    const navigate = useNavigate()

    const jsonCharacterData = location.state.uploadedData
    var characterData = location.state.uploadedData

    return (
        <div className={styles.screenContainer}>
            <h1>Character Display</h1>
            <div className={styles.topBar}>
                <div className={styles.hardBorder}>
                    <h2>{characterData.name}</h2>
                    <h6>Character Name: </h6>
                </div>
                <table className={styles.hardBorder}>
                    <tbody>
                        <tr className={styles.underlined}>
                            <td><h3>{characterData.level}</h3></td>
                            <td><h3>{characterData.level}</h3></td>
                            <td><h3>{characterData.level}</h3></td>
                        </tr>
                        <tr>
                            <th><h6>Class:</h6></th>
                            <th><h6>Level:</h6></th>
                            <th><h6>Background:</h6></th>
                        </tr>
                        <tr className={styles.underlined}>
                            <td><h3>{characterData.race.name}</h3></td>
                            <td><h3>{characterData.alignment}</h3></td>
                            <td><h3>{characterData.playerName}</h3></td>
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
                <div className={styles.statsContainer}>
                    <div className={styles.abilityScoresContainer}>
                        <div>
                            <h6>Strength</h6>
                            <h2 title={"Add\ned"}>{characterData.stats.strength.base}</h2>
                            <h3>+1</h3>
                        </div>
                        <div>
                            <h6>Dexterity</h6>
                            <h2>{characterData.stats.strength.base}</h2>
                            <h3>+1</h3>
                        </div>
                        <div>
                            <h6>Constitution</h6>
                            <h2>{characterData.stats.strength.base}</h2>
                            <h3>+1</h3>
                        </div>
                        <div>
                            <h6>Intelligence</h6>
                            <h2>{characterData.stats.strength.base}</h2>
                            <h3>+1</h3>
                        </div>
                        <div>
                            <h6>Wisdom</h6>
                            <h2>{characterData.stats.strength.base}</h2>
                            <h3>+1</h3>
                        </div>
                        <div>
                            <h6>Charisma</h6>
                            <h2>{characterData.stats.strength.base}</h2>
                            <h3>+1</h3>
                        </div>
                    </div>
                    <div className={styles.proficienciesContainer}>
                        <div className={styles.stackedListEntry}>
                            <h3>1</h3><h6>Inspiration Points</h6>
                        </div>
                        <div className={styles.stackedListEntry}>
                            <h3>+1</h3><h6>Proficiency Bonus</h6>
                        </div>
                        <div className={styles.skillsBox}>
                            <div>
                                <input type='radio' disabled/><h4 className={styles.underlined}>+1</h4><h6>Strength</h6>
                            </div>
                            <div>
                                <input type='radio' disabled/><h4 className={styles.underlined}>+1</h4><h6>Dexterity</h6>
                            </div>
                            <div>
                                <input type='radio' disabled/><h4 className={styles.underlined}>+1</h4><h6>Constitution</h6>
                            </div>
                            <div>
                                <input type='radio' disabled/><h4 className={styles.underlined}>+1</h4><h6>Intelligence</h6>
                            </div>
                            <div>
                                <input type='radio' disabled/><h4 className={styles.underlined}>+1</h4><h6>Wisdom</h6>
                            </div>
                            <div>
                                <input type='radio' disabled/><h4 className={styles.underlined}>+1</h4><h6>Charisma</h6>
                            </div>
                            <h5>Saving Throws</h5>
                        </div>
                        <div className={styles.skillsBox}>
                            <div>
                                <input type='radio' disabled/><h4 className={styles.underlined}>+1</h4><h6>Acrobatics <i>(Dex)</i></h6>
                            </div>
                            <div>
                                <input type='radio' disabled/><h4 className={styles.underlined}>+1</h4><h6>Animal Handling <i>(Wis)</i></h6>
                            </div>
                            <div>
                                <input type='radio' disabled/><h4 className={styles.underlined}>+1</h4><h6>Constitution</h6>
                            </div>
                            <div>
                                <input type='radio' disabled/><h4 className={styles.underlined}>+1</h4><h6>Intelligence</h6>
                            </div>
                            <div>
                                <input type='radio' disabled/><h4 className={styles.underlined}>+1</h4><h6>Wisdom</h6>
                            </div>
                            <div>
                                <input type='radio' disabled/><h4 className={styles.underlined}>+1</h4><h6>Charisma</h6>
                            </div>
                            <h5>Skills</h5>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.bodyContainer}>
                        <div>
                            <h2>10</h2>
                            <h6>Armor Class</h6>
                        </div>
                        <div>
                            <h2>+1</h2>
                            <h6>Initiative</h6>
                        </div>
                        <div>
                            <h2>30 ft</h2>
                            <h6>Speed</h6>
                        </div>
                    </div>
                </div>
                <div>
                    <h5>Traits List</h5>
                </div>
            </div>
        </div>
    )
}