import Question from "./question.js";
import Quiz from "./quiz.js";


const App = (($) => {


    const quizEl = document.querySelector(".jabquiz");
    const quizQuestionEl = document.querySelector(".jabquiz__question");
    const trackerEl = document.querySelector(".jabquiz__tracker");
    const taglineEl = document.querySelector(".jabquiz__tagline");
    const choicesEl = document.querySelector(".jabquiz__choices")
    const progressInnerEl = document.querySelector(".progress__inner");
    const nextButtonEl = document.querySelector(".next");
    const restartButtonEl = document.querySelector(".restart");
    const questionBoxEl = $.querySelector(".jabquiz__question-box");
    console.log(questionBoxEl);
    const q1 = new Question(
        "Who was the first President?",
        ["Henry", "Kennedy", "George", "Abraham"],
        2
    )
    const q2 = new Question(
        "When was Javascript invented?",
        [1995, 1996, 1885, 1997],
        0
    )
    const q3 = new Question(
        "What does CSS stand for?",
        ["Count Sheriff Service", "Cascading Sexy Sheets", "Cascading Style Sheet", "Cats Shitting Strawberries"],
        2
    )
    const q4 = new Question(
        "The full form of HTML is ?",
        ["Hyper Text Markup Language", "Hold the Mic Larry", "Hard Time Makes Lard", "Hello Traveling Master Licker"],
        0
    )
    const q5 = new Question(
        "console.log(typeOf[]) would return what?",
        ["Object", "Array", "Number", "Boolean"],
        0
    )

    const listeners = _ => {
        nextButtonEl.addEventListener("click", function () {
            const selectedRadioElem = document.querySelector('input[name ="choice"]:checked')
            if (selectedRadioElem) {
                const key = Number(selectedRadioElem.getAttribute("data-order"));
                quiz.guess(key);
                renderAll();

            } else {
                alert("You must pick a choice!");
            }
        })
        restartButtonEl.addEventListener("click", function () {
            //reset the quiz
            quiz.reset();
            //render all
            renderAll();
            //restor next button
            nextButtonEl.style.opacity = 1;
            //restore tagline
            setValue(taglineEl, "Pick an option");
        })
    }

    const quiz = new Quiz([q1, q2, q3, q4, q5]);

    const setValue = (elem, value) => {
        elem.innerHTML = value;
    }
   

    const renderQuestion = _ => {
        const question = quiz.getCurrentQuestion().question;
        setValue(quizQuestionEl, question);
    }

    const renderChoicesElements = _ => {
        let markup = "";
        const currentChoices = quiz.getCurrentQuestion().choices;
        currentChoices.forEach((elem, index) => {

            markup += `
            <li class="jabquiz__choice">
            <input type="radio" name="choice" class="jabquiz__input" data-order="${index}" id="choice${index}">
                <label for="choice${index}" class="jabquiz__label">
                    <i></i>
                    <span>${elem}</span>
                </label>
            </li>
            `

            setValue(choicesEl, markup);
        });

    }

    const renderTracker = _ => {

        let index = quiz.currentIndex;
        let length = quiz.questions.length;
        let markup = `${index + 1} of ${length}`;

        setValue(trackerEl, markup)

    }

    const getPercentage = (num1, num2) => {
        return Math.round(num1 / num2 * 100);
    }

    const launch = (width, maxPercent) => {
        let loadingBar = setInterval(function () {
            if (width > maxPercent) {
                clearInterval(loadingBar);
            } else {
                width++;
                progressInnerEl.style.width = `${width}%`;
            }

        }, 3);
    }

    const renderProgress = _ => {
        // width
        let currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
        launch(0, currentWidth)


    }

    const renderEndScreen = _ => {
        switch(quiz.score){
            case 5: 
            setValue(quizQuestionEl, "GREAT JOB");
            break;
            case 4: 
            setValue(quizQuestionEl, "GOOD JOB");
            break;
            case 3: 
            setValue(quizQuestionEl, "NICE JOB");
            break;
            case 2: 
            setValue(quizQuestionEl, "YOU CAN DO BETTER");
            break;
            case 1: 
            setValue(quizQuestionEl, "THAT WAS SHITTY");
            break;
            case 0: 
            setValue(quizQuestionEl, "YOU SUCK ASS");
            break;
            default:
            setValue(quizQuestionEl, "SYSTEM ERROR")
        }
        setValue(taglineEl, "COMPLETED");
        setValue(trackerEl, `Your score ${getPercentage(quiz.score, quiz.questions.length)}%`)

        nextButtonEl.style.opacity = 0;
        renderProgress();
    }

    const renderAll = _ => {
        if (quiz.hasEnded()) {
            //render end screen
            renderEndScreen();
        } else {
            //render question
            renderQuestion();
            //render choices
            renderChoicesElements();
            //render tracker
            renderTracker();
            //render progress bar
            renderProgress();

        }

    }
    return {
        renderAll: renderAll,
        listeners: listeners
    }

})(document);

App.renderAll();
App.listeners();





/*
const q1 = new Question(
    "what is 2 + 2?",
    [2, 3, 4, 5],
    2
);
const q2 = new Question(
    "what is 3 + 2?",
    [2, 3, 4, 5],
    3
);
const q3 = new Question(
    "what is 1 + 2?",
    [2, 3, 4, 5],
    1
);
const q4 = new Question(
    "what is 3 + 1?",
    [2, 3, 4, 5],
    2
);
const q5 = new Question(
    "what is 1 + 1?",
    [2, 3, 4, 5],
    0
);

const qArray = [q1, q2, q3, q4, q5];

const myQuiz = new Quiz(qArray);

console.log(myQuiz.getCurrentQuestion());

myQuiz.nextIndex();

console.log(myQuiz.getCurrentQuestion());

*/




/*  *****revealing module pattern********

const App = (function(){
    let counter = 0;

    const doubleCounter = () => {
        counter *= 2;
    }

    const incrementCounter = () => {
        counter++;
    } 
    const getCounter = () => {
        return counter;
    }
    const setCounter = (newNum) => {
        counter = newNum;
    }
    return {
    get: getCounter,
    set: setCounter,
    increment: incrementCounter,
    double: doubleCounter
    }
})();

console.log(App.get())
App.set(5);
console.log(App.get())
App.increment();
console.log(App.get())
App.double();
console.log(App.get())
*/

