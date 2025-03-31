// correct answers with messages
const correctAnswers = ['c', 'b', 'b', 'a']

const correctMessages = [
  'Well done! The Web Content Accessibility Guidelines (WCAG) are a series of recommendations for making web content accessible to people with disabilities.',
  'Correct! Level AA tackles the biggest and most common barriers for disabled users. This is often the target for many websites.',
  'Exactly! ARIA landmarks are a way to classify and label sections of the HTML code that is conveyed visually through layout to be represented programmatically. ARIA landmark roles are used for example to make it easy for or assistive technology users to understand the meaning of the layout of a page.',
  'Great job! A keyboard trap occurs when a user is unable to navigate away from an element using only the keyboard, which can be frustrating for people who rely on keyboard navigation.'
]

// DOM selectors
startQuizButton = document.getElementById('start-button')
questions = document.querySelectorAll('.question')
submitButtons = document.querySelectorAll('.submit-btn')
messageContainer = document.getElementById('message-container')
resultsContainer = document.getElementById('results-container')

// initialize variables
let currentQuestionIndex = 0 // current question counter
let score = 0 // quiz score

// function to set the active question
const setActiveQuestion = (index) => {
  // show the active question - hide the others
  questions.forEach((question, i) => {
    if (i === index) {
      question.style.display = 'inline-flex'
      // set focus on first option
      question.querySelector('input[type="radio"]').focus()
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
}

// function to check selected answer
const checkAnswer = () => {
  // get current radio group of current question
  const radioGroup = questions[currentQuestionIndex].querySelectorAll('input[type="radio"]')
  // loop through radio group to find selected answer
  let answer
  radioGroup.forEach(option => {
    option.checked ? (answer = option.value) : null
  })
  // check if selected answer is correct
  if (answer) {
    const correctAnswer = correctAnswers[currentQuestionIndex]
    if (answer === correctAnswer) {
      // add 1 point to score
      score += 1
      // display feedback message
      displayFeedback(correctMessages[currentQuestionIndex], 'valid')
    } else {
      // display feedback message
      const wrongMessage = `That's not quite right.. The correct answer is ${correctAnswer}.`
      displayFeedback(wrongMessage, 'valid')
    }
  } else {
    // if no option is selected - show message to user to select an option
    displayFeedback('Please select your answer', 'invalid')
  }
}

// show feedback message
const displayFeedback = (message, messageType) => {
  // display message
  messageContainer.innerHTML = `
        <p>${message}</p>
        <button class="continue-btn">Continue</button>
      `
  // set focus to continue button
  const continueButton = messageContainer.querySelector('.continue-btn')
  continueButton.focus()
  // set event listener on the continue button based on the the message type
  switch (messageType) {
    case 'valid':
      continueButton.addEventListener('click', () => {
        // if last question - end quiz
        if (currentQuestionIndex === (questions.length - 1)) {
          endQuiz()
        } else {
          // else - go to next question
          const nextQuestionIndex = (currentQuestionIndex + 1)
          setActiveQuestion(nextQuestionIndex)
          currentQuestionIndex = nextQuestionIndex
        }
        // clear feedback message
        messageContainer.innerHTML = ''
      })
    case 'invalid':
      continueButton.addEventListener('click', () => {
        // set focus back to current question
        setActiveQuestion(currentQuestionIndex)
        // delete feedback message
        messageContainer.innerHTML = ''
      })
  }
}

// end quiz
const endQuiz = () => {
  // hide all questions
  // ------------------------THIS DOESN'T WORK!!! NEED TO FIX---------------
  questions.forEach((question) => {
    question.style.display = 'none'
  })
  //------------------------------------------------------------------------
  // show results
  resultsContainer.innerHTML = `
    <p>Score: ${score}/${questions.length}</p>
    <button class="continue-btn" type="button">Take quiz again</button>
  `
  // set focus to button
  const continueButton = resultsContainer.querySelector('.continue-btn')
  // continueButton.focus()
  // set event listener to take the quiz again
  continueButton.addEventListener('click', () => {
    // reset current question index
    currentQuestionIndex = 0
    // reset results
    score = 0
    // clear container
    resultsContainer.innerHTML = ''
    // start quiz
    startQuiz()
  })
}

// start quiz when start button is selected
startQuizButton.addEventListener('click', startQuiz)

// go to next question when submit button is selected
submitButtons.forEach(button => {
  button.addEventListener('click', () => checkAnswer())
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

