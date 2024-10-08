const questionHeadline = document.getElementById("questionHeadline");
const submit = document.getElementById("submit");
const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");
const btnC = document.getElementById("btnC");
const btnD = document.getElementById("btnD");
const result = document.getElementById("result");
const correctCounter = document.getElementById("correctCounter");
const againButton = document.getElementById("againButton");
const menuButton = document.getElementById("menuButton");
const classicMode = document.getElementById("classicMode");
const menuArea = document.getElementById("menuArea");
const quizArea = document.getElementById("quizArea");
const time = document.getElementById("time");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

//AUDIO-----------------------------------------------
const correct = new Audio("./res/audio/correct.mp3");
const wrong = new Audio("./res/audio/wrong.mp3");
const start = new Audio("./res/audio/start.mp3");
const timeRunOut = new Audio("./res/audio/timeRunOut.mp3");

//GET ANSWER------------------------------------------
const getAnswer = () => {
    console.log("Odpověď: "+answerValue);
};

//RESET ANSWER----------------------------------------
const resetUserAnswer = () =>{
    answerValue = "";
}

//CLEAR BUTTON----------------------------------------
const clearButton = () =>{
    btnA.style = null;
    btnB.style = null;
    btnC.style = null;
    btnD.style = null;
};

//COUNTER RESET---------------------------------------
const resetCounter = () =>{
    counter = 0;
};

//QUESTION NUMBER RESET-------------------------------
const resetQuestionNumber = () =>{
    questionNumber = 0;
};

//HIDE ELEMENT----------------------------------------
const hideElement = (element) => {
    element.style.display = "none";
};
//SHOW ELEMENT----------------------------------------
const showElement = (element) => {
    element.style.display = "initial"};
    
//COUNTER SPRÁVNÝCH ODPOVĚDÍ-------------------------
let counter = 0;

let correctNum = 0;
   
//ČÍSLO OTÁZKY---------------------------------------
let questionNumber = 0;
    
//SPRÁVNÁ ODPOVĚĎ NA OTÁZKU--------------------------
let correctValue = "";
    
//USER ODPOVĚĎ NA OTÁZKU-----------------------------
let answerValue = "";
    
//RESULT RESET---------------------------------------
/*po vypsání "správně" nebo "špatně" se text vymaže*/
const resetResult = () =>{
    result.innerText = "";
};

function displayUtilButttons() {
    showElement(againButton);
    showElement(menuButton);
};

function hideUtilButtons() {
    hideElement(againButton);
    hideElement(menuButton);
};
function displayAnswers() {
    showElement(btnA);
    showElement(btnB);
    showElement(btnC);
    showElement(btnD);
};
function hideAnswers() {
    hideElement(btnA);
    hideElement(btnB);
    hideElement(btnC);
    hideElement(btnD);
}

const endQuiz = () =>{
    clearInterval(timeProgress);
    hideElement(time);
    result.style.color = "green";
    result.innerText = "Gratulujeme!";
    hideElement(correctCounter);
    showElement(result);
    questionHeadline.innerText = "Konec hry";
    resetUserAnswer();
    hideElement(btnA);
    hideElement(btnB);
    hideElement(btnC);
    hideElement(btnD);
    hideElement(submit);
    displayUtilButttons();
    console.log(generatedNumbers);
    generatedNumbers = [];
}

const badEndQuiz = () =>{
    clearInterval(timeProgress);
    hideElement(time);
    result.style.color = "red";
    result.innerText = "Čas vypršel!";
    timeRunOut.play();
    hideElement(correctCounter);
    showElement(result);
    questionHeadline.innerText = "Konec hry";
    hideElement(btnA);
    hideElement(btnB);
    hideElement(btnC);
    hideElement(btnD);
    resetUserAnswer();
    hideElement(submit);
    displayUtilButttons();
    console.log(generatedNumbers);
    generatedNumbers = [];
}

let generatedNumbers = [];
//BUILD QUIZ---------------------------------------------
const buildQuiz = async() =>{
    showElement(time);
    hideUtilButtons();
    displayAnswers();
    showElement(submit);
    showElement(correctCounter);
    const file = await fetch("./res/data/questions.json");
    const data = await file.json();

/*Generování náhodných čísel které se nebudou opakovat*/
function generateRandomNumber() {
    time.value = 30;
    timeProgress =  setInterval(()=>{
        time.value-=0.03;
        if(time.value==0){
            badEndQuiz();
        }
    },10)
    if (generatedNumbers.length === data.length) {
        generatedNumbers = [];
    }

    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * data.length); //náhodné číslo od 0 do 20
    } while (generatedNumbers.includes(randomNumber)); // Pokud se číslo již nachází v poli, generuje nové

    generatedNumbers.push(randomNumber); // Přidání číslo do pole generovaných čísel
    return randomNumber;
    }

    let actualNum = generateRandomNumber();
    console.log(generatedNumbers);
    if (questionNumber < 10) {
            /*vypíše do konzole jakou odpověď uživatel zvolil*/
    console.log("Odpověď: "+answerValue);

    /*
    * aktualizovaný counter správných odpovědí
    * counter se aktualizuje při stisknutí tlačítka submit
    */
    correctCounter.innerText = "Správně zodpovězeno: " + counter + "/" + 10;
    /*zobrazí se aktuální otázka*/
    questionHeadline.innerText = data[actualNum].question;
    /*zobrazí se možné odpovědí*/
    btnA.innerText = data[actualNum].answers.a;
    btnB.innerText = data[actualNum].answers.b;
    btnC.innerText = data[actualNum].answers.c;
    btnD.innerText = data[actualNum].answers.d;
    /*js zjistí správnou odpověď na otázku*/
    correctValue = data[actualNum].correctAnswer;
    return correctValue;
    }
    else{
        /*Konec hry*/
        endQuiz();
    } 
   };

//AGAIN BUTTON---------------------------------------
againButton.onclick = () =>{
    resetCounter();
    resetQuestionNumber();
    buildQuiz();
    displayAnswers();
    showElement(submit);
    hideUtilButtons();
    showElement(correctCounter);
    resetResult();
};

menuButton.onclick = () =>{
    resetCounter();
    resetQuestionNumber();
    resetResult();
    hideElement(quizArea);
    showElement(menuArea);
}
//CLASSIC MODE---------------------------------------
classicMode.onclick = () =>{
    hideElement(menuArea);
    buildQuiz();
    showElement(quizArea);
    start.play();
};

//ODPOVEDI--------------------------------------------
btnA.onclick = () => {
    clearButton();
    btnA.style.backgroundColor = "blue";
    answerValue = btnA.value;
    getAnswer();
};

btnB.onclick = () => {
    clearButton();
    btnB.style.backgroundColor = "blue";
    answerValue = btnB.value;
    getAnswer();
};

btnC.onclick = () => {
    clearButton();
    btnC.style.backgroundColor = "blue";
    answerValue = btnC.value;
    getAnswer();
};

btnD.onclick = () => {
    clearButton();
    btnD.style.backgroundColor = "blue";
    answerValue = btnD.value;
    getAnswer();
};

//SUMBIT--------------------------------------------
submit.onclick = () => {
    clearButton();
    /*Správná odpověď*/
    if (answerValue == correctValue) {
        showElement(result);
        resetUserAnswer();
        result.style.color = "green";
        result.innerText = "Správná odpověď";
        correct.play();
        clearInterval(timeProgress);
        counter ++;
        hideElement(submit);
        setTimeout(() => {
            questionNumber++;
            showElement(submit);
            buildQuiz();
            hideElement(result);
            resetResult();
        }, 1200);
        return counter;
    }
    /*Žádná odpověď*/
    else if(answerValue == ""){
        result.style.color = "yellow";
        result.innerText = "Nebyla zaznamenána odpověď!";
        showElement(result);
    }
    else{
        /*Špatná odpověď*/
        showElement(result);
        result.style.color = "red";
        result.innerText = "Špatně";
        hideElement(time);
        clearInterval(timeProgress);
        //wrong.play();
        questionHeadline.innerText = "Konec hry";
        generatedNumbers = [];
        resetUserAnswer();
        hideElement(btnA);
        hideElement(btnB);
        hideElement(btnC);
        hideElement(btnD);
        hideElement(submit);
        displayUtilButttons();
    }
};