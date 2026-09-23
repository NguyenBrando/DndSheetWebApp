import { capitalFirst } from "../../utils/formatter";

function CharacterTraitsColumn({ displayData }) {
    return (
        <div className="rightContainer">
            <style>{`
                .rightContainer {
                    border: 1px solid var(--text);
                    margin: 8px;
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

            
            <h3>Traits List</h3>
            <div className="traitsContainer">
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
            
    )
}

export default CharacterTraitsColumn;