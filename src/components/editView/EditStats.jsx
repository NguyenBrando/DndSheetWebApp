import { capitalFirst } from "../../utils/formatter";
import { abilityScores } from "../../utils/statLists";
import { useError } from "../ErrorDisplay";

function EditStats({ rawData, updateData }) {
    const { showError, clearError } = useError();

    function updateBaseStat(ability, value) {
        updateData(draft => {
            if (!draft.stats) draft.stats = {}
            draft.stats[ability] = value;
        })
    }

    return (
        <div className="scores-container">
            <style>{`
                .scores-container {
                    display: grid;
                    place-items: center;
                }
                .score-container {
                    padding: 24px 0px;
                    border: 1px solid var(--text);
                }
                .score-container > input {
                    font-size: 2.5rem;
                    width: 50%;
                }
            `}</style>

            <h3>Level 1 Ability Scores</h3>

            {abilityScores.map(ability => {
                return (
                    <div className="score-container" key={ability}>
                        <h5>{capitalFirst(ability)}</h5>
                        <input type="number" onChange={(e) => updateBaseStat(ability, e.target.value)} defaultValue={rawData?.stats?.[ability] ?? 10} min="1" max="20"/>
                    </div>
                )
            })}
        </div>
    )
}

export default EditStats;