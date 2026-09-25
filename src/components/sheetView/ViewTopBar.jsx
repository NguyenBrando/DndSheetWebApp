function CharacterTopBar({ displayData }) {
    return (
        <div className="top-bar">
            <style>{`
                .top-bar {
                    width: 90%;
                    margin: 1.5rem auto 0 auto;

                    display: grid;
                    grid-template-columns: 40% 1fr;
                    align-items: center;
                }
                .top-bar > * {
                    border: 1px solid var(--text-h);
                    padding: 8px;

                    border-collapse: collapse;
                    table-layout: fixed;
                }
                .top-bar tr:nth-child(odd) {
                    border-bottom: 1px solid var(--border)
                }
                .top-bar th, td {
                    width: 33%;
                    text-align: left;
                    padding: 3px 12px;
                }
            `}</style>

            <div>
                <h2>{displayData.name}</h2>
                <h6>Character Name: </h6>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td><h3>{displayData.class?.name}</h3></td>
                        <td><h3>{displayData.level}</h3></td>
                        <td><h3>{displayData.background?.name}</h3></td>
                    </tr>
                    <tr>
                        <th><h6>Class:</h6></th>
                        <th><h6>Level:</h6></th>
                        <th><h6>Background:</h6></th>
                    </tr>
                    <tr>
                        <td><h3>{displayData.race?.name}</h3></td>
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
    )
}

export default CharacterTopBar;