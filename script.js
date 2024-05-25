const quizData = [
    {
        question: "Wat is de term voor het proces waarbij computers zelfstandig leren en verbeteren zonder expliciete programmering?",
        imagePath: "assets/computer.webp",
        options: ["Zelflerend programmeren", "Kunstmatige intelligentie", "Machine learning", "Augmented reality"],
        answer: "Machine learning"
    },
    {
        question: "Wat betekent \"VR\" in de context van moderne technologie?",
        imagePath: "assets/vr.webp",
        options: ["Virtuele realiteit", "Verrassende robotica", "Visuele reproductie", "Virtuele representatie"],
        answer: "Virtuele realiteit"
    },
    {
        question: "Wat is een van de belangrijkste toepassingen van blockchain-technologie?",
        imagePath: "assets/blockchain.png",
        options: ["Website design", "Cryptocurrency", "Biometrische identificatie", "Cloud computing"],
        answer: "Cryptocurrency"
    },
    {
        question: "Welke beroemde zakenman en filantroop staat bekend om zijn visie op AI en ruimteverkenning met bedrijven als Tesla en SpaceX?",
        imagePath: "assets/spacex.jpeg",
        options: ["Jeff Bezos", "Mark Zuckerberg", "Elon Musk", "Bill Gates"],
        answer: "Elon Musk"
    },
    {
        question: "Welke bekende zangeres en zakenvrouw heeft onlangs aangekondigd dat ze een AI-bedrijf gaat oprichten om kunstmatige intelligentie te gebruiken in de muziekwereld?",
        imagePath: "assets/DJ.png",
        options: ["Beyoncé", "Taylor Swift", "Ariana Grande", "Rihanna"],
        answer: "Rihanna"
    }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");
const restartButton = document.getElementById("restart");
const resultElement = document.getElementById("result");
const imageContainer = document.getElementById("image-container");

let currentQuestion = 0;
let score = 0;
let userAnswer = null;
let shuffledIndexes = Array.from({ length: quizData.length }, (_, index) => index);

loadQuiz();

function loadQuiz() {
    // Remove inline display styles
    questionElement.style.removeProperty('display');
    optionsElement.style.removeProperty('display');
    imageContainer.style.removeProperty('display');

    // Shuffle the indexes if it's the first question or all questions have been asked
    if (currentQuestion === 0 || currentQuestion >= quizData.length) {
        shuffledIndexes = shuffleArray(shuffledIndexes);
        currentQuestion = 0;
    }

    const currentQuizData = quizData[shuffledIndexes[currentQuestion]];
    imageContainer.querySelector("img").src = currentQuizData.imagePath;
    questionElement.innerText = currentQuizData.question;
    optionsElement.innerHTML = "";
    currentQuizData.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", () => {
            // Store the user's answer
            userAnswer = option;
            // Enable submit button
            submitButton.style.display = "block";
            // Remove 'selected' class from all option buttons
            document.querySelectorAll('.option').forEach(btn => {
                btn.classList.remove("selected");
            });
            // Add 'selected' class to the clicked button
            button.classList.add("selected");
        });
        optionsElement.appendChild(button);
    });
    // Hide submit button initially
    submitButton.style.display = "none";
    restartButton.style.display = "none";
    resultElement.innerText = ""; // Clear result paragraph
}

function selectOption() {
    const currentQuizData = quizData[shuffledIndexes[currentQuestion]];
    if (userAnswer === currentQuizData.answer) {
        score++;
    }
    // Clear the user's answer
    userAnswer = null;
}

function showResult() {
    resultElement.innerText = `Jouw score: ${score}/${quizData.length}`;

    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    imageContainer.style.display = "none"; // Hide image container

    // Loop through shuffledIndexes to display questions and answers in the same order they were asked
    shuffledIndexes.forEach((index, i) => {
        const quizItem = quizData[index];
        const question = document.createElement("p");
        question.textContent = `${i + 1}. ${quizItem.question}`;
        question.style.paddingTop = "30px";
        question.style.paddingBottom = "20px";
        const answer = document.createElement("h4");
        answer.textContent = `${quizItem.answer}`;
        answer.style.paddingBottom = "40px";
        resultElement.appendChild(question);
        resultElement.appendChild(answer);
        resultElement.appendChild(document.createElement("hr")); // Add a horizontal line between questions
    });

    submitButton.style.display = "none";
    restartButton.style.display = "block";
}

submitButton.addEventListener("click", () => {
    selectOption(); // Evaluate the user's answer
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    loadQuiz();
});

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
