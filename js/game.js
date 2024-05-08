import formatData from "./helper.js";
const level = localStorage.getItem("level") || "medium"
const Loader = document.getElementById("Loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text")
// console.log(answerList);
const scoreText = document.getElementById("score")
const nextButton = document.getElementById("next-button")
const QuestionNumber = document.getElementById("Question-number")
const finishButton = document.getElementById("finish-button")
const error = document.getElementById("error")

const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";

let formatedData = null;
let questionIndex = 0;
let correctAnswer = null
const correctBous = 10
let score = 0
let isAccept = true



const fetchData = async () => {
    try {
      const response = await fetch(URL);
  const json = await response.json();
  formatedData = formatData(json.results);
  console.log(formatedData);
  start();
     } catch (err) {
      Loader.style.display = "none"
      error.style.display = "block"
     }   
    
}



const start = () => {
  showQuestion();

  Loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  QuestionNumber.innerText = questionIndex + 1
  const { question, answers, correctAnswerIndex } = formatedData[questionIndex];
  correctAnswer = correctAnswerIndex
  // console.log(correctAnswer);
  questionText.innerText = question
  answerList.forEach((button,index) => {
    button.innerText = answers[index]
  })


};

const checkAnswer = (event,index) =>{
  if (!isAccept) return
  isAccept = false
  
     
   const isCorrect = index===correctAnswer ? true: false
   
   if (isCorrect) {
       event.target.classList.add("correct")
       score+= correctBous
       scoreText.innerText = score
   }
   else {
    event.target.classList.add("incorrect")
    answerList[correctAnswer].classList.add("correct")
  }
}

const nextHandler = () => {
  questionIndex++
  // if (questionIndex < formatedData.Length) {
    if (questionIndex < formatedData.length) {
      isAccept = true
      showQuestion()
      removeClass()
      
    }else{
      // console.log("doxnk");
      finishHandler()
    }
  // }else {
    
  }
// }

const removeClass = () => {
    answerList.forEach((button) => button.className= "answer-text")
}

const finishHandler = () => {
  localStorage.setItem("score",JSON.stringify(score))
  window.location.assign("/end.html")
}




window.addEventListener("load", fetchData);
finishButton.addEventListener("click",finishHandler)
nextButton.addEventListener("click", nextHandler )
answerList.forEach((button,index) => {
  button.addEventListener("click", (event) => checkAnswer(event,index))
})
