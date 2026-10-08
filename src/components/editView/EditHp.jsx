import { useState } from "react";
import { useError } from "../ErrorDisplay";
import { clamp } from "../../utils/statCalculator";
import { useImmer } from "use-immer";

function EditHp({ rawData, updateData }) {
    const { showError, clearError } = useError();
    const [ clampRoll, setClamp ] = useState(false);
    const [ rolls, updateRolls ] = useImmer(rawData?.hp?.rolls ?? {})


    const hitDice = rawData?.class?.hitDice ?? 0;
    const rollAverage = Math.ceil(hitDice / 2 + (hitDice > 0 ? 1:0))

    function updateDataRoll(level, value) {
        updateData(draft => {
            if (!draft.hp) draft.hp = {}
            if (!draft.hp.rolls) draft.hp.rolls = {}
            draft.hp.rolls[level] = Number(value);
        })
    }

    function updateClamp(isClamped) {
        for (const [key,value] of Object.entries(rawData?.hp?.rolls ?? {})) {
            if (isClamped) updateDataRoll(key, clamp(value, rollAverage, hitDice));
            else updateDataRoll(key, rolls[key]);
        }
        setClamp(isClamped);
    }

    function updateRoll(level, value) {
        updateRolls(draft => {
            draft[level] = Number(value)
        })
        updateDataRoll(level, clampRoll ? clamp(value, rollAverage, hitDice) : value)
    }


    return (
        <div className="hp-container">
            <style>{`
                .hp-container {
                    display: grid;
                    grid-auto-columns: 1fr;
                }
                .hp-level {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 4px;
                    padding: 6px;
                    border: 1px solid var(--text);
                }
                .hp-level > input {
                    box-sizing: border-box;
                    width: 50px;
                }
            `}</style>

            <h2>HP Rolls</h2>
            <div>
                <label>Clamp Min ( {rollAverage} ) </label>
                <input type="checkbox" checked={clampRoll} onChange={(e) => updateClamp(e.target.checked)}/>
            </div>
            <div className="hp-level">
                <h4>Level 1:</h4>
                <p>[ {hitDice} ]</p>
                <h6>= +{hitDice}</h6>
            </div>
            {Array.from({length:19}, (_, index) => {
                const level = index + 2;
                return (
                    <div className="hp-level" key={index}>
                        <h4>Level {level}: </h4>
                        <input type="number" onChange={(e) => updateRoll(level, e.target.value)} defaultValue={rolls?.[level] ?? 0 } min="1" max={hitDice}/> 
                        <h6>= +{ rawData?.hp?.rolls?.[level] ?? 0 }</h6>
                    </div>
                )
            })}
        </div>
    )
}

export default EditHp;