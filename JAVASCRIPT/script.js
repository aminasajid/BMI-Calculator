function calculateBMI() {
    // Get the selected gender
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        alert('Please select your gender.');
        return;
    }

    // Get height and weight
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert height to meters
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight.');
        return;
    }

    // Calculate BMI
    const bmi = weight / (height * height);

    // Define bar height based on max height (change this to fit your chart's max height)
    const maxBarHeight = 300;

    // Reset all bars to default height and color
    document.querySelectorAll('.bar').forEach(bar => {
        bar.style.height = '2%'; // Reset height
        bar.style.backgroundColor = 'grey'; // Reset color
    });

    // Prepare the text to display and speak
    let resultText = '';
    let speechText = '';

    // Determine BMI category and set text and color
    if (bmi < 18.5) {
        resultText = 'Your BMI is ' + bmi.toFixed(2) + '. You are underweight.';
        document.getElementById("underweight").style.backgroundColor = "lightblue";
        document.getElementById('underweight').style.height = maxBarHeight * 0.5 + 'px'; // Example height
        speechText = 'Your BMI is ' + bmi.toFixed(2) + '. You are underweight. It is important to eat a balanced diet and consult with a healthcare provider for advice.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        resultText = 'Your BMI is ' + bmi.toFixed(2) + '. You have a normal weight.';
        document.getElementById("normal").style.backgroundColor = "green"; // Green for normal weight
        document.getElementById('normal').style.height = maxBarHeight * 0.5 + 'px'; // Example height
        speechText = 'Your BMI is ' + bmi.toFixed(2) + '. You have a normal weight. Keep maintaining a balanced diet and regular exercise for good health.';
    } else if (bmi >= 25 && bmi < 30) {
        resultText = 'Your BMI is ' + bmi.toFixed(2) + '. You are overweight.';
        document.getElementById("overweight").style.backgroundColor = "orange"; // Orange for overweight
        document.getElementById('overweight').style.height = maxBarHeight * 0.5 + 'px'; // Example height
        speechText = 'Your BMI is ' + bmi.toFixed(2) + '. You are overweight. It is advisable to follow a healthy diet and increase physical activity. Consult with a healthcare provider for personalized advice.';
    } else {
        resultText = 'Your BMI is ' + bmi.toFixed(2) + '. You are obese.';
        document.getElementById("obesity").style.backgroundColor = "red"; // Red for obesity
        document.getElementById('obesity').style.height = maxBarHeight * 0.5 + 'px'; // Example height
        speechText = 'Your BMI is ' + bmi.toFixed(2) + '. You are obese. It is important to consult with a healthcare provider to create a plan for a healthier lifestyle.';
    }

    // Display the result in the 'result' div
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = resultText; // Show the result text
    resultDiv.style.display = 'block'; // Make sure the result is visible
    resultDiv.style.color = 'white'; // Set the text color to white for better visibility
    resultDiv.style.backgroundColor = 'black'; // Add a background color to make the text more readable
    resultDiv.style.textAlign = 'center'; // Center the text

    // Use the Web Speech API to speak the result
    const utterance = new SpeechSynthesisUtterance(speechText);
    speechSynthesis.speak(utterance);
}
