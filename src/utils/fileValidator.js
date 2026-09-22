const processJSON = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (e) => {
        try {
            const jsonData = JSON.parse(e.target.result)
            navigate('/view', {state: {uploadedData: jsonData}})
        } catch (error) {
            alert("Invalid JSON file.")
        }
    }

    return jsonObj
}