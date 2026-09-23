export const processJSON = (file) => {
    if (!file) return Promise.resolve(null);

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);
                resolve(jsonData);
            } catch (error) {
                alert("Invalid JSON file.")
                resolve(null);
            }
        };

        reader.onerror = () => {
            alert("Error reading file.");
            resolve(null);
        }
    })
}