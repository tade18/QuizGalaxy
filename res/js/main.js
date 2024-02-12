const questionHeadline = document.getElementById("questionHeadline");
const submit = document.getElementById("submit");
const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");
const btnC = document.getElementById("btnC");
const btnD = document.getElementById("btnD");
const result = document.getElementById("result");
const correctCounter = document.getElementById("correctCounter");
const againButton = document.getElementById("againButton");

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
//BUILD QUIZ---------------------------------------------
const buildQuiz = async() =>{
    const file = await fetch("./res/data/questions.json");
    const data = await file.json();
    if (questionNumber <= data.length-1) {
            /*vypíše do konzole jakou odpověď uživatel zvolil*/
    console.log("Odpověď: "+answerValue);
    const totalQuestions = data.length;
    /*
    * aktualizovaný counter správných odpovědí
    * counter se aktualizuje při stisknutí tlačítka submit
    */
    correctCounter.innerText = "Správně zodpovězeno: " + counter + "/" + totalQuestions;
    /*zobrazí se aktuální otázka*/
    questionHeadline.innerText = data[questionNumber].question;
    /*zobrazí se možné odpovědí*/
    btnA.innerText = data[questionNumber].answers.a;
    btnB.innerText = data[questionNumber].answers.b;
    btnC.innerText = data[questionNumber].answers.c;
    btnD.innerText = data[questionNumber].answers.d;
    /*js zjistí správnou odpověď na otázku*/
    correctValue = data[questionNumber].correctAnswer;
    return correctValue;
    }
    else{
        result.style.color = "green";
        result.innerText = "Gratulujeme!";
        showElement(result);
        questionHeadline.innerText = "Konec hry";
        resetUserAnswer();
        hideElement(btnA);
        hideElement(btnB);
        hideElement(btnC);
        hideElement(btnD);
        hideElement(submit);
        showElement(againButton);
    }


};
window.onload = async () =>{
    buildQuiz();
};
    
//AGAIN BUTTON---------------------------------------
againButton.onclick = () =>{
    resetCounter();
    resetQuestionNumber();
    buildQuiz();
    showElement(btnA);
    showElement(btnB);
    showElement(btnC);
    showElement(btnD);
    showElement(submit);
    hideElement(againButton);
    resetResult();
};



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

submit.onclick = () => {
    clearButton();
    if (answerValue == correctValue) {
        showElement(result);
        resetUserAnswer();
        result.style.color = "green";
        result.innerText = "Správná odpověď";
        counter ++;
        hideElement(submit);
        setTimeout(() => {
            questionNumber++;
            showElement(submit);
            buildQuiz();
            hideElement(result);
            result.style.color = null;
            resetResult();
        }, 1200);
        return counter;
    }
    else if(answerValue == ""){
        result.style.color = "yellow";
        result.innerText = "Nebyla zaznamenána odpověď!";
        showElement(result);
    }
    else{
        showElement(result);
        result.style.color = "red";
        result.innerText = "Špatně";
        questionHeadline.innerText = "Konec hry";
        resetUserAnswer();
        hideElement(btnA);
        hideElement(btnB);
        hideElement(btnC);
        hideElement(btnD);
        hideElement(submit);
        showElement(againButton);
    };
};