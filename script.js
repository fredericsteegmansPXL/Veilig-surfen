const quizData = [
    {
        question: "Is het verstandig om tweefactorauthenticatie (2FA) in te schakelen voor je online accounts?",
        imagePath: "assets/Boom 8.png",
        options: ["Ja", "Nee"],
        answer: "Ja"
    },
    {
        question: "Wat is phishing?",
        imagePath: "assets/Nemo 1.png",
        options: ["Een methode om malware te verwijderen", "Een techniek waarbij criminelen proberen persoonlijke informatie te verkrijgen door zich voor te doen als een betrouwbare entiteit", "Een manier om je wachtwoorden te onthouden", "Een beveiligingsmaatregel om je netwerk te beschermen"],
        answer: "Een techniek waarbij criminelen proberen persoonlijke informatie te verkrijgen door zich voor te doen als een betrouwbare entiteit"
    },
    {
        question: "Wat betekent het als een website een SSL-certificaat heeft?",
        imagePath: "assets/Keuken 1.png",
        options: ["De website is gegarandeerd veilig en betrouwbaar", "De communicatie tussen je browser en de website is versleuteld", "De website is snel en efficiënt", "De website is gratis toegankelijk"],
        answer: "De communicatie tussen je browser en de website is versleuteld"
    },
    {
        question: "Is het veilig om je wachtwoorden op te slaan in je webbrowser?",
        imagePath: "assets/Snooker 3.png",
        options: ["Ja", "Nee"],
        answer: "Nee"
    },
    {
        question: "Wat betekent \"social engineering\" in de context van cybersecurity?",
        imagePath: "assets/Meetingroom.png",
        options: ["Het ontwerpen van sociale netwerken", "Het gebruik van sociale interactie om mensen te misleiden en gevoelige informatie te verkrijgen", "Het bouwen van beveiligde software", "Het beheren van online communities"],
        answer: "Het gebruik van sociale interactie om mensen te misleiden en gevoelige informatie te verkrijgen"
    },
    {
        question: "Wat is een VPN (Virtual Private Network)?",
        imagePath: "assets/Draak 9.png",
        options: ["Een netwerk dat alleen gebruikt wordt door overheidsinstanties", "Een beveiligingsprotocol voor draadloze netwerken", "Een technologie die je internetverbinding versleutelt en je anonimiteit online beschermt", "Een soort wachtwoordmanager"],
        answer: "Een technologie die je internetverbinding versleutelt en je anonimiteit online beschermt"
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

    questionElement.style.removeProperty('display');
    optionsElement.style.removeProperty('display');
    imageContainer.style.removeProperty('display');

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
            userAnswer = option;
            submitButton.style.display = "block";
            document.querySelectorAll('.option').forEach(btn => {
                btn.classList.remove("selected");
            });
            button.classList.add("selected");
        });
        optionsElement.appendChild(button);
    });
    submitButton.style.display = "none";
    restartButton.style.display = "none";
    resultElement.innerText = "";
}

function selectOption() {
    const currentQuizData = quizData[shuffledIndexes[currentQuestion]];
    if (userAnswer === currentQuizData.answer) {
        score++;
    }
    userAnswer = null;
}

function showResult() {
    resultElement.innerText = `Jouw score: ${score}/${quizData.length}`;

    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    imageContainer.style.display = "none";

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
        resultElement.appendChild(document.createElement("hr"));
    });

    submitButton.style.display = "none";
    restartButton.style.display = "block";
}

submitButton.addEventListener("click", () => {
    selectOption();
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}