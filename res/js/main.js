const questionHeadline = document.getElementById("questionHeadline");
const submit = document.getElementById("submit");
const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");
const btnC = document.getElementById("btnC");
const btnD = document.getElementById("btnD");
const result = document.getElementById("result");
const correctCounter = document.getElementById("correctCounter");

//CLEAR BUTTON-------------------------------------------
const clearButton = () =>{
    btnA.style = null;
    btnB.style = null;
    btnC.style = null;
    btnD.style = null;
};

//HIDE ELEMENT-------------------------------------------
const hideElement = (element) => {
    element.style.display = "none";
};
//SHOW ELEMENT-------------------------------------------
const showElement = (element) => {
    element.style.display = "initial"};

//COUNTER SPRÁVNÝCH ODPOVĚDÍ-----------------------------
let counter = 0;

//ČÍSLO OTÁZKY-------------------------------------------
let questionNumber = 0;

//SPRÁVNÁ ODPOVĚĎ NA OTÁZKU------------------------------
let correctValue = "";

//USER ODPOVĚĎ NA OTÁZKU---------------------------------
let answerValue = "";

//RESULT RESET-------------------------------------------
/*po vypsání "správně" nebo "špatně" se text vymaže*/
const resetResult = () =>{
    result.innerText = "";
};

//BUILD QUIZ---------------------------------------------
const buildQuiz = async() =>{
    /*načte info o otázce z json*/
    const file = await fetch("./res/data/questions.json");
    const data = await file.json();
    /*vypíše do konzole jakou odpověď uživatel zvolil*/
    console.log("Odpověď: "+answerValue);
    /*
     * aktualizovaný counter správných odpovědí
     * counter se aktualizuje při stisknutí tlačítka submit
     */
    correctCounter.innerText = "Správně zodpovězeno: " + counter;
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
};
    window.onload = async () =>{
        buildQuiz();
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
    else{
        showElement(result);
        result.style.color = "red";
        result.innerText = "Špatně";
        questionHeadline.innerText = "Konec hry";
        hideElement(btnA);
        hideElement(btnB);
        hideElement(btnC);
        hideElement(btnD);
        hideElement(submit);
    };
};