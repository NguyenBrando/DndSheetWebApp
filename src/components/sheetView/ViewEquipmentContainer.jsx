function CharacterEquipmentList({ displayData }) {
    return (
        <div className="equipmentContainer">
            <style>{`
                .equipmentContainer {
                        height: 100%;
                        border: 1px solid var(--text);
                        padding: 8px;
                    }
                .equipmentContainer > div {
                    overflow-y: auto;
                    scrollbar-width: thin;
                    border: 1px solid var(--border);
                    margin: 8px 0;
                    padding: 8px;
                    text-align: left;
                }
                .equipmentContainer > div > div {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-bottom: 2px;
                }
            `}</style>

            <h3>Equipment List</h3>
            <div>
                
            </div>
        </div>
    )
}

export default CharacterEquipmentList;