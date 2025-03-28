
// DOM selectors
startQuizButton = document.getElementById('start-button')
questions = document.querySelectorAll('.question')
submitButtons = document.querySelectorAll('.submit-btn')

// initialize current question counter
let currentQuestionIndex = 0

// function to set the active question
const setActiveQuestion = (index) => {
  // show the active question - hide the others
  questions.forEach((question, i) => {
    if (i === index) {
      question.style.display = 'block'
    } else {
      question.style.display = 'none'
    }
  });
}

// function to start Quiz
const startQuiz = () => {
  // show first question
  setActiveQuestion(currentQuestionIndex)
  // hide start button
  startQuizButton.style.display = 'none'
  // set  focus to the first question

  // -------------

}

// start quiz when start button is selected
startQuizButton.addEventListener('click', startQuiz)

// go to next question when submit button is selected
submitButtons.forEach(button => {
  button.addEventListener('click', () => {
    const nextQuestionIndex = (currentQuestionIndex + 1) % questions.length
    setActiveQuestion(nextQuestionIndex)
    currentQuestionIndex = nextQuestionIndex
  })
})






// forget the code below for now........
// // event listener to handle user input for each qestion
// document.addEventListener('keydown', (event) => {
//   const currentQuestion = questions[currentQuestionIndex]
//   const submitButton = currentQuestion.querySelector('.submit-button')

//   // let the user select option by pressing a,b, or c on keyboard
//   switch (event.key) {
//     case 'a':
//       event.preventDefault()
//       currentQuestion.querySelector('input[value="a"]').checked = true
//       submitButton.focus()
//       break
//     case 'b':
//       event.preventDefault()
//       currentQuestion.querySelector('input[value="b"]').checked = true
//       submitButton.focus()
//       break
//     case 'c':
//       event.preventDefault()
//       currentQuestion.querySelector('input[value="c"]').checked = true
//       submitButton.focus()
//       break
//   }

//   // if submit button is clicked / or keyboard press enter - go to next question
//   submitButton.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//       const nextQuestionIndex = (currentQuestionIndex + 1) % questions.length
//       currentQuestionIndex =
//       setActiveQuestion(nextQuestionIndex)
//     }

//   })
// })

