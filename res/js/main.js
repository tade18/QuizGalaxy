const questionHeadline = document.getElementById("questionHeadline");
const submit = document.getElementById("submit");
const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");
const btnC = document.getElementById("btnC");
const btnD = document.getElementById("btnD");
const result = document.getElementById("result");

let questionNumber = 0;

let correctValue = "";

let answerValue = "";

const buildQuiz = async() =>{
    const file = await fetch("./res/data/questions.json");
    const data = await file.json();
    console.log("Odpověď: "+answerValue);
    questionHeadline.innerText = data[questionNumber].question;
    btnA.innerText = data[questionNumber].answers.a;
    btnB.innerText = data[questionNumber].answers.b;
    btnC.innerText = data[questionNumber].answers.c;
    btnD.innerText = data[questionNumber].answers.d;
    correctValue = data[questionNumber].correctAnswer;
    return correctValue;
}

const getAnswer = () => {
    console.log("Odpověď: "+answerValue);
};

//HIDE ELEMENT-------------------------------------------
const hideElement = (element) => {
    element.style.display = "none";
}
//SHOW ELEMENT-------------------------------------------
const showElement = (element) => {
    element.style.display = "initial"
}
    window.onload = async () =>{
        buildQuiz();
};



btnA.onclick = () => {
    answerValue = btnA.value;
    getAnswer();
};

btnB.onclick = () => {
    answerValue = btnB.value;
    getAnswer();
};

btnC.onclick = () => {
    answerValue = btnC.value;
    getAnswer();
};

btnD.onclick = () => {
    answerValue = btnD.value;
    getAnswer();
};

submit.onclick = () => {
    if (answerValue == correctValue) {
        result.innerText = "Správná odpověď";
        hideElement(submit);
        setTimeout(() => {questionNumber++;showElement(submit);buildQuiz();hideElement(result)}, 1200)
    }
    else{result.innerText = "Špatně"};
};