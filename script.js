var quizQuestions = [
    {
        question: "Which of the following is true about variable naming conventions in JavaScript?",
        answers: {
            a: 'JavaScript variable names must begin with a letter or the underscore character.',
            b: 'JavaScript variable names are case sensitive.',
            c: 'Both of the above.',
            d: 'None of the above.'
        },
        correctAnswer: 'Both of the above.'
    },
    {
        question: "Which of the following function of String object extracts a section of a string and returns a new string?",
        answers: {
            a: 'slice()',
            b: 'split()',
            c: 'replace()',
            d: 'search()'
        },
        correctAnswer: 'slice()'
    },
    {
        question: "Which of the following function of Array object applies a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value?",
        answers: {
            a: 'pop()',
            b: 'push()',
            c: 'reduce()',
            d: 'reduceRight()'
        },
        correctAnswer: 'reduceRight()'
    },
    {
        question: "How do you link javascript to your HTML?",
        answers: {
            a: '.java',
            b: '.js',
            c: '.javascript',
            d: '.xml'
        },
        correctAnswer: '.js',
    },
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        answers: {
            a: '< javascript >',
            b: '< scripted >',
            c: '< script >',
            d: '< js >'
        },
        correctAnswer: '< script >'
    }
];

var highScores = [];

var buttonEl = document.querySelector("#start")
var introEl = document.querySelector(".intro")
var questionsEl = document.querySelector(".quiz-questions")
var initialsEl = document.querySelector(".initials")
var scoresEl = document.querySelector(".highscores")
var timeEl = document.querySelector(".timer")
var timeRemaining = quizQuestions.length * 15
var setIntervalId = ""
var questionIndex = 0
var alertEl = document.querySelector(".alert")
var lastQuestion = quizQuestions.length - 1
var buttonTwo = document.querySelector("#btn2")
var submitBtn = document.querySelector("#submitBtn")
var labelEl = document.querySelector("#labelEl")
var resultsEl = document.querySelector(".results")
var finalScore = document.querySelector("#finalScore")
var hideH2 = document.querySelector("#hide")
var myScore = document.querySelector(".myScore")
var goBackBtn = document.querySelector("#btn2")
var clearBtn = document.querySelector("#btn3")

// timer begins
function countdown() {
    if (timeRemaining === 0) {
        clearInterval(setIntervalId)
    } else {
        timeEl.textContent = timeRemaining--
    }
}

// // once start is clicked, moves to a new page with the first question

function startQuiz() {
    console.log(questionIndex)
    questionIndex++
    questionsEl.innerHTML = ""
    if (questionIndex <= lastQuestion) {
        console.log("moving to next question")
        questionsEl.innerHTML = `
        <div class="question">${quizQuestions[questionIndex].question}</div>
            <ol>
                <li class="answers btn-primary">${quizQuestions[questionIndex].answers.a}</li>
                <li class="answers btn-primary">${quizQuestions[questionIndex].answers.b}</li>
                <li class="answers btn-primary">${quizQuestions[questionIndex].answers.c}</li>
                <li class="answers btn-primary">${quizQuestions[questionIndex].answers.d}</li>
            </ol>
        `
    } else {
        endGame()
    }
}

// once the quiz is over, the time left is captured
function endGame() {
    clearInterval(setIntervalId)
    console.log("game over")
    initialsEl.classList.remove("hide")
    scoresEl.classList.remove("hide")
    buttonTwo.classList.add("hide")
    myScore.classList.remove("hide")
    finalScore.textContent = timeRemaining
}




document.addEventListener("click", function (event) {
    event.preventDefault()
    event.stopPropagation()
    console.log("this works")
    if (event.target.matches("#submitBtn")) {
        var initials = document.querySelector("#initials").value
        var highScoreItem = `${timeRemaining} ${initials}`
        var highScores1 = (window.localStorage.getItem("high scores"))
        if (highScores1 === null) {
            highScores = []
        } else {
            highScores = JSON.parse(highScores1)
        }
        highScores.push(highScoreItem)
        localStorage.setItem("high scores", JSON.stringify(highScores))
        
        var listEl = document.getElementById("resultsID")
        for (var i = 0; i < highScores.length; i++) {
            var li1 = document.createElement("li")
            li1.textContent = highScores[i]
            listEl.appendChild(li1)
        }
    }
});

submitBtn.addEventListener("click", function (event) {
    buttonTwo.classList.remove("hide")
    initialsEl.classList.add("hide")
    alertEl.classList.add("hide")
    hideH2.classList.remove("hide")
    localStorage.getItem("high scores")
})

goBackBtn.addEventListener("click", function (event) {
    introEl.classList.remove("hide")
    scoresEl.classList.add("hide")
    myScore.classList.add("hide")
    document.getElementById("resultsID").textContent = ""
    if (timeRemaining === 0) {
        clearInterval(setIntervalId)
    } else {
        timeEl.textContent = timeRemaining--
    }
    countdown()
})

clearBtn.addEventListener("click", function(event) {
    localStorage.clear()
})


document.addEventListener("click", function (event) {
    if (event.target.matches(".answers")) {
        if (event.target.textContent === quizQuestions[questionIndex].correctAnswer) {
            // once you click an answer, if correct move forward with no penalty
            alertEl.textContent = ("Correct!")
            startQuiz()
        } else {
            alertEl.textContent = ("Incorrect!")
            // if incorrect 15 seconds are removed
            timeRemaining -= 15
            startQuiz()
        }
    }
});

// click on start quiz button
buttonEl.addEventListener("click", function (event) {
    questionsEl.classList.remove("hide")
    introEl.classList.add("hide")
    questionIndex = -1
    startQuiz()
    setIntervalId = setInterval(countdown, 1000)
})






// the time left becomes high score 
// must enter initials and click submit

// once clicked a new page appears with high score and buttons saying "go back" and "clear high scores"
