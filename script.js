let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
    {
        question: "What is HTML?",
        answer: "HTML stands for HyperText Markup Language."
    },
    {
        question: "What is CSS?",
        answer: "CSS is used to style and design web pages."
    },
    {
        question: "What is JavaScript?",
        answer: "JavaScript is a programming language used to make websites interactive."
    }
];

let currentCard = 0;


// Display flashcard
function displayCard() {

    const question = document.getElementById("question");
    const answer = document.getElementById("answer");
    const cardNumber = document.getElementById("cardNumber");
    const showButton = document.getElementById("showAnswerBtn");

    question.textContent = flashcards[currentCard].question;

    answer.textContent = flashcards[currentCard].answer;

    answer.style.display = "none";

    showButton.textContent = "Show Answer";

    cardNumber.textContent =
        `${currentCard + 1} / ${flashcards.length}`;
}


// Show answer
function showAnswer() {

    const answer = document.getElementById("answer");
    const button = document.getElementById("showAnswerBtn");

    if (answer.style.display === "none") {

        answer.style.display = "block";
        button.textContent = "Hide Answer";

    } else {

        answer.style.display = "none";
        button.textContent = "Show Answer";
    }
}


// Next card
function nextCard() {

    if (currentCard < flashcards.length - 1) {

        currentCard++;

    } else {

        currentCard = 0;
    }

    displayCard();
}


// Previous card
function previousCard() {

    if (currentCard > 0) {

        currentCard--;

    } else {

        currentCard = flashcards.length - 1;
    }

    displayCard();
}


// Add new card
function addCard() {

    const question = prompt("Enter the question:");

    if (!question) {
        return;
    }

    const answer = prompt("Enter the answer:");

    if (!answer) {
        return;
    }

    flashcards.push({
        question: question,
        answer: answer
    });

    saveCards();

    currentCard = flashcards.length - 1;

    displayCard();

    alert("Flashcard added successfully!");
}


// Edit card
function editCard() {

    const oldQuestion = flashcards[currentCard].question;
    const oldAnswer = flashcards[currentCard].answer;

    const question = prompt(
        "Edit question:",
        oldQuestion
    );

    if (!question) {
        return;
    }

    const answer = prompt(
        "Edit answer:",
        oldAnswer
    );

    if (!answer) {
        return;
    }

    flashcards[currentCard].question = question;
    flashcards[currentCard].answer = answer;

    saveCards();

    displayCard();

    alert("Flashcard updated successfully!");
}


// Delete card
function deleteCard() {

    if (flashcards.length === 1) {

        alert("You must keep at least one flashcard.");
        return;
    }

    const confirmDelete = confirm(
        "Are you sure you want to delete this flashcard?"
    );

    if (!confirmDelete) {
        return;
    }

    flashcards.splice(currentCard, 1);

    if (currentCard >= flashcards.length) {
        currentCard = flashcards.length - 1;
    }

    saveCards();

    displayCard();

    alert("Flashcard deleted successfully!");
}


// Save cards in browser
function saveCards() {

    localStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );
}


// Load first card
displayCard();