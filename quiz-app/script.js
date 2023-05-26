const startBtn = document.querySelector("#start-btn");
const rulesBox = document.querySelector("#rule-box");
const exitBtn = document.querySelector(".exit-btn");
const continueBtn = document.querySelector(".continue-btn");
const quizBox = document.querySelector(".quiz-box");

//When start button is clicked
startBtn.addEventListener("click", () => {
    rulesBox.classList.add("active");
});

//On click of exit button
exitBtn.addEventListener("click", () => {
    rulesBox.classList.remove("active");
});

// On click of continue button
continueBtn.addEventListener("click", () => {
    rulesBox.classList.remove("active");
    quizBox.classList.add("active");
    showQuestions(0);
    qCounter(1);
});

//
let qCount = 0;
let qNumber = 1;

// On click of next question button
const nextBtn = quizBox.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
    if (qCount < questions.length - 1) {
        qCount++;
        showQuestions(qCount);

        qNumber++;
        qCounter(qNumber);
    } else {
        console.log("Final Question");
    }
});

//Get questions and options from array
function showQuestions(index) {
    //Get questions
    const questionText = document.querySelector(".question");
    let questionTag = questions[index].numb + ". " + questions[index].question;
    questionText.innerText = questionTag;

    //Get options
    const optionList = document.querySelector(".option-list");
    let optionTag = `<p class="option">${questions[index].options[0]}</p>` + `<p class="option">${questions[index].options[1]}</p>` + `<p class="option">${questions[index].options[2]}</p>` + `<p class="option">${questions[index].options[3]}</p>`;
    optionList.innerHTML = optionTag;
}

function qCounter(index) {
    const questionCounter = quizBox.querySelector(".total-que");
    let totalQCountTag = `<span>${index}</span> of <span>${questions.length}</span> questions`;

    questionCounter.innerHTML = totalQCountTag;
}
