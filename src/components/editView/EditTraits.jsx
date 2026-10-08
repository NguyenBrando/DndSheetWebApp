import { useEffect, useState } from "react";

import { capitalFirst } from "../../utils/formatter";


function EditTraitsColumn({ rawData, updateData }) {
    const [ sorting, setSorting ] = useState({sortBy:"usage", order:1});

    function updateSorting(field, value) { setSorting({...sorting, [field]:value}) };

    const getChoiceTraits = () => {
        const traits = [
            ...(rawData.race?.traits ?? []), 
            ...(rawData.class?.traits ?? []), 
            ...(rawData.background?.traits ?? [])
        ];
        const filteredTraits = [...traits].filter(trait =>
            trait.effects?.some(effect => effect.mode == "choice") ?? false
        );
        return filteredTraits;
    }

    return (
        <div className="rightContainer">
            <style>{`
                .rightContainer {
                    border: 1px solid var(--text);
                    margin: 8px;
                }
                    .traitHeader {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .traitHeader > * {
                        width: 28%;
                    }

                    .traitsContainer {
                        overflow-y: auto;
                        scrollbar-width: thin;
                    }
                    .traitsContainer > div {
                        border: 1px solid var(--border);
                        padding: 8px;
                        text-align: left;
                    }
                    .traitsContainer > div > div {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding-bottom: 2px;
                    }
                    .traitsContainer > div > div > input[type="checkbox"] {
                        content: "*";
                        accent-color: yellow;
                    }
            `}</style>

            
            <div className="traitHeader">
                <select value={sorting.sortBy} onChange={(e) => updateSorting("sortBy",e.target.value)}>
                    <option value="usage">Usage Type</option>
                    <option value="source">Trait Source</option>
                </select>
                <h3>Traits List</h3>
                <select value={sorting.order} onChange={(e) => updateSorting("order",Number(e.target.value))}>
                    <option value='1'>Ascending</option>
                    <option value='-1'>Descending</option>
                </select>
            </div>
            <div className="traitsContainer">
                {getChoiceTraits().map((trait) => (
                    <div key={trait.name}>
                        <div>
                            <h6>{trait.name}</h6>
                            <h5>{trait.level ? `Level ${trait.level}`:""}</h5>
                        </div>
                        <p>{trait.desc}</p>
                    </div>
                ))}
            </div>
        </div>
            
    )
}

export default EditTraitsColumn;