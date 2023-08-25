import {
     categoryMenuInput,
     difficultyOptionsInput,
    allQuestions,
    quiz,
    questionsNumberInput,
    quizOptionForm,
    questionsContainer
} from "./index.js"


export default class Question {

    constructor(index) {
        this.index = index
        this.questionContent = allQuestions[index].question
        this.correctAnswer = allQuestions[index].correct_answer
        this.incorrectAnswer = allQuestions[index].incorrect_answers
        this.category = allQuestions[index].category
        this.allAnswer = this.getAllChoice()
        this.answered = false
    }

    getAllChoice() {
        return this.incorrectAnswer.concat(this.correctAnswer).sort()
    }

    display() {
        quizOptionForm.classList.replace('d-flex', 'd-none')
        questionsContainer.classList.replace("d-none", "d-flex")
        const questionMarkUp = `
<div
  class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
>
  <div class="w-100 d-flex justify-content-between">
    <span class="btn btn-category">${this.category}</span>
    <span class="fs-6 btn btn-questions">${this.index + 1} of ${allQuestions.length
            } Questions</span>
  </div>
  <h2 class="text-capitalize h4 text-center">${this.questionContent}</h2>  
  <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
  ${this.allAnswer.map((choice) => `<li>${choice}</li>`).join("")}
  </ul>
  <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${quiz.score
            } </h2>        
</div>
`;

        questionsContainer.innerHTML = questionMarkUp;
        let allChoices = document.querySelectorAll('.question ul li')

        for (let i = 0; i < allChoices.length; i++) {
            allChoices[i].addEventListener('click', (e) => {
                this.checkAnswer(e)
            })
        }
    }


    checkAnswer(event) {
        console.log(event.target.innerHTML.toLowerCase())

        if (this.answered == false) {
            this.answered = true

            if (event.target.innerHTML.toLowerCase() == this.correctAnswer.toLowerCase()) {
                event.target.classList.add("correct",
                    "animate__animated",
                    "animate__flipInY")
                quiz.score += 1;
            }
            else {
                event.target.classList.add("wrong", "animate__animated", "animate__shakeX")

            }
            this.animateQuestion(event.target, 1000)

          
        }

    }

        nextQuestion() {
            this.index++;
            if (this.index > allQuestions.length - 1) {
              questionsContainer.innerHTML = quiz.endQuiz();
              const tryAgain = document.querySelector(".again");
              tryAgain.addEventListener("click", function () {
                questionsContainer
                  .querySelector(".question")
                  .classList.replace("d-flex", "d-none");
                categoryMenuInput.value = "";
                difficultyOptionsInput.value = "easy";
                questionsNumberInput.value = "";
                quizOptionForm.classList.replace("d-none", "d-flex");
              });
              return
            }
        
            const nextQuestion = new Question(this.index);
            nextQuestion.displayQuestion();
          }

          animateQuestion(element, duration) {
            setTimeout(() => {
              element
                .closest(".question")
                .classList.add("animate__animated", "animate__bounceOutLeft");
              setTimeout(() => {
                this.nextQuestion()
              }, duration)
            }, duration);
          }

}

    

 