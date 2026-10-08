import EditHp from "./EditHp";
import EditStats from "./EditStats";
import EditTopBar from "./EditTopBar";
import EditTraitsColumn from "./EditTraits";

function EditView({ rawData, updateData }) {

    return (
        <div>
            <style>{`
                .scoresContainer {
                    display: flex;
                }
            `}</style>

            <EditTopBar rawData={rawData} updateData={updateData}/>

            <div className="bodyContainer">
                <div className="scoresContainer">
                    <EditStats rawData={rawData} updateData={updateData}/>
                    <EditHp rawData={rawData} updateData={updateData}/>
                </div>
                
                <div/>

                <EditTraitsColumn rawData={rawData} updateData={updateData}/>
            </div>
        </div>
    )
}

export default EditView;