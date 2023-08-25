import Quiz from "./quiz.js"
import Question  from "./question.js"
// html elements 
 
export const categoryMenuInput=document.querySelector('#categoryMenu')
export const difficultyOptionsInput=document.querySelector('#difficultyOptions')
export const questionsNumberInput=document.querySelector('#questionsNumber')
export const startBtn=document.querySelector('#startQuiz')
export const quizOptionForm = document.getElementById("quizOptions");
export const questionsContainer = document.querySelector(".questions-container")



//variables
export let quiz
export let allQuestions



//events 

startBtn.addEventListener('click' ,async function(){
    quiz=new Quiz(questionsNumberInput.value,difficultyOptionsInput.value,categoryMenuInput.value)
allQuestions = await quiz.getQuestions()
console.log(allQuestions)
const question = new Question(0);
question.display()
})


// functions







