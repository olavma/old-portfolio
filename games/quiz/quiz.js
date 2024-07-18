class Quiz{
    constructor(quest, a, b, c, d, corr){
        this.quest = quest;
        this.optA = a;
        this.optB = b;
        this.optC = c;
        this.optD = d;
        this.optCorr = corr;
    }
}

var quiz = {}

fetch('./quiz.json')
    .then((response) => response.json())
    .then((json) => {
        const rndIndex = Math.floor(Math.random() * json.length);
        if(json[rndIndex].IdQuest === rndIndex){
            let obj = json[rndIndex];
            quiz = new Quiz(obj.Question, obj.optionA, obj.optionB, obj.optionC, obj.optionD, obj.respuestaCorrecta)
            ModifyBtn(quiz);
        }
    })
    .catch((error) => console.error(error))

function ModifyBtn(quiz){
    var question = document.getElementById("question");
    question.textContent = quiz.quest;

    var option = document.getElementById("optionA");
    option.textContent += " " + quiz.optA;

    option = document.getElementById("optionB");
    option.textContent += " " + quiz.optB;

    option = document.getElementById("optionC");
    option.textContent += " " + quiz.optC;

    option = document.getElementById("optionD");
    option.textContent += " " + quiz.optD;
}

const btns = document.querySelectorAll('button');
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        DisableBtn();
        IsCorrect(btn.id);
    });
});

function DisableBtn(){
    btns.forEach(btn => {
        btn.disabled = true;
    });
}

function IsCorrect(idBtn) {
    var msg = document.getElementById("info");
    if(idBtn == quiz.optCorr){
        msg.textContent = "¡Has acertado!";
    } else{
        msg.textContent = "Incorrecto era la: " + quiz.optCorr[quiz.optCorr.length - 1];
    }


    btns.forEach(btn => {
        if(btn.id == quiz.optCorr){
            btn.style.backgroundColor = "green";
        } else{
            btn.style.backgroundColor = "red";
        }
    });
}