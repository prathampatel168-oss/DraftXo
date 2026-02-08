
export const DELIMITER = "\n\n---DRAFTXO-STATE---\n";

export const parseProjectFile = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const content = event.target.result;
            try {
                let flowData = null;

                // Case 1: PDF with embedded data
                if (content.includes(DELIMITER.trim())) {
                    const parts = content.split(DELIMITER.trim());
                    if (parts.length > 1) {
                        // The last part is the JSON
                        const jsonStr = parts[parts.length - 1];
                        flowData = JSON.parse(jsonStr);
                    }
                }

                // Case 2: Pure JSON file
                if (!flowData) {
                    try {
                        flowData = JSON.parse(content);
                    } catch (e) {
                        // Not a JSON file
                    }
                }

                if (flowData && (flowData.nodes || flowData.edges)) {
                    resolve(flowData);
                } else {
                    reject(new Error("Invalid project file format"));
                }
            } catch (err) {
                reject(err);
            }
        };

        reader.onerror = (err) => reject(err);

        // Read as text to find the delimiter/JSON
        // Note: For binary PDFs this might be messy but strictly for our appended text method it works 
        // because the appended text is valid UTF-8 at the end of the binary stream.
        reader.readAsText(file);
    });
};
