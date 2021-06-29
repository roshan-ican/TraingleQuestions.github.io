
(function(){
    function buildQuiz(){
    //variable to store the HTML
    const output = [];
    // for each question
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
        //variable to list possible answer
        const answers = [];
        for(letter in currentQuestion.answers){
            //...add an HTML radio
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </input>
                </label>`
            );
        }

        //add this question and its answers to the output
        output.push(
            `<div class="slide">
            <div class="question">${currentQuestion.question}</div>
            <div class="answers">${answers.join('')}</div>
            </div>`
        );
    }
);
    // finally combine our output list into one string
    quizContainer.innerHTML = output.join('');
    }


function showResults(){
    // we are gathering the questions together
    const answerContainers = quizContainer.querySelectorAll('.answers')
    //Keep track of the user's answers
    let numCorrect = 0;
    //for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {
        //find selected answers
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        //if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
            //add to the number of correct answers
            numCorrect++;
            //color the answer to green
            answerContainers[questionNumber].style.color = 'green';
        } 
        // if answer is wrong or blank
        else {
            // color the answers red
            answerContainers[questionNumber].style.color = 'red';
        } 
    });

    //show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0) {
        previousButton.style.display = 'none';
    }
    else {
        previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

//Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
        question: "In a triangle ABC, the length of side AB is 10 inches and length of side BC is 17 inches, Which of the following could be the length of side AC ?",
        answers: {
            a : "16 inches",
            b : "5 inches",
            c : "32 inches ",
        },
        correctAnswer: "a"
    },
    {
        question: "How many acute angles must an acute triangle have ?",
        answers : {
            a : "4",
            b: "3",
            c: "2",
        },
        correctAnswer: "c"
    },
        {
        question: "If two sides of a triangle are equal what type of triangle is that ?",
        answers : {
            a : "Equilateral",
            b: "Isosceles",
            c: "Scalene",
        },
        correctAnswer: "b"
    },
];

buildQuiz();

//pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;



// show the first slide
showSlide(currentSlide);
// Event listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

})();

