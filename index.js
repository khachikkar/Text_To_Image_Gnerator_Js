const input = document.getElementById('input');
const button = document.getElementById('button');
const img = document.getElementById("img");
const loadingIndicator = document.getElementById("loading");
let inputval = ""
const downloadButton = document.getElementById("downloadButton");

// Add a loading indicator element
async function query(data) {
    console.log(data)
    loadingIndicator.style.display = "block";
    input.value = ""
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
            {
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        if (!response.ok) {
            const error = await response.json();
            console.error("API error:", error);
            return error;
        }
        const result = await response.blob();
        console.log(result);
        const imgUrl = URL.createObjectURL(result);
        console.log(imgUrl);


        img.src = imgUrl
        downloadButton.style.display = "block";
        loadingIndicator.style.display = "none";


        downloadButton.onclick = () => {
            const a = document.createElement("a");
            a.href = imgUrl;
            a.download = "generated_image.jpg";
            a.click();
        };


    } catch (error) {
        console.error("Network or other error:", error);
        loadingIndicator.style.display = "none";
    }

}


input.addEventListener("change", (e) => {
    inputval = e.target.value;

})

button.addEventListener("click", () => {
    query({"inputs": inputval});
})

