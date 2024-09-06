document.getElementById("predictionForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Get input values from the form
    const sepalLength = document.getElementById("sepalLength").value;
    const sepalWidth = document.getElementById("sepalWidth").value;
    const petalLength = document.getElementById("petalLength").value;
    const petalWidth = document.getElementById("petalWidth").value;

    // Prepare the data to send in the POST request
    const data = {
        features: [parseFloat(sepalLength), parseFloat(sepalWidth), parseFloat(petalLength), parseFloat(petalWidth)]
    };

    try {
        // Send POST request to Flask API
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Get the response and display it on the page
        const result = await response.json();
        document.getElementById("result").innerHTML = `Prediction: ${result.prediction}`;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerHTML = "An error occurred while predicting.";
    }
});
