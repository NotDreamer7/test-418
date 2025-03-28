async function solveQuestion() {
    let question = document.getElementById("questionInput").value;
    document.getElementById("response").innerHTML = "Solving...";
    
    let response = await fetch(`https://api.mathsolver.com/solve?query=${encodeURIComponent(question)}`);
    let data = await response.json();
    
    document.getElementById("response").innerHTML = `<strong>Solution:</strong> ${data.solution}`;
}

function handleImageUpload() {
    let file = document.getElementById("imageInput").files[0];
    let reader = new FileReader();
    
    reader.onload = async function() {
        let imageData = reader.result;
        document.getElementById("response").innerHTML = "Processing Image...";
        
        let response = await fetch("https://api.ocrsolver.com/read", {
            method: "POST",
            body: JSON.stringify({ image: imageData }),
            headers: { "Content-Type": "application/json" }
        });
        let data = await response.json();
        
        document.getElementById("questionInput").value = data.text;
        solveQuestion();
    };
    
    reader.readAsDataURL(file);
}

// Quiz Feature
let quizData = {
    question: "What is 2 + 2?",
    options: ["1", "2", "3", "4"],
    correct: 3
};
document.getElementById("quiz-question").innerText = quizData.question;
quizData.options.forEach((opt, i) => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    document.getElementById("options").appendChild(btn);
});

function checkAnswer(index) {
    let buttons = document.getElementById("options").children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.background = "white";
    }
    if (index === quizData.correct) {
        buttons[index].style.background = "green";
    } else {
        buttons[index].style.background = "red";
    }
}
